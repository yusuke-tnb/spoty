const userModel = require("../models/user.model");
const friendModel = require("../models/friendship.model");
const spotModel = require("../models/spot.model");
const ObjectId = require('mongoose').Types.ObjectId;
const jwt = require('../config/jwt');
const twi = require('../helpers/twitter.helper');
const mail = require('../helpers/mail.helper');
const renameId = require("../helpers/util.helper").renameId;


exports.getUser = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 10;
    const page = parseInt(req.query.page, 10) || 1;
    const date = new Date().getTime();
    const data = await userModel.find({ deleted: false }, 'userProfile');
    const users = data.map(user => {
      user.toObject();
      delete user.userProfile.currentSpot;
      return {userId: user._id, ...user.userProfile}
    });
    res.json({message: 'success', data: {users: users}, error: null});
  } catch (e) {
    console.error(e);
    res.status(e[0]||500).json({message: ''+(e.message || e[1]||'unexpected error'), data: null, error: (e[2]||true)});
  }  
}

exports.getUserById = async (req, res) => { 
  try{
    const targetId = req.params.id;
    const userId = req.decoded.userId;
    const data = await userModel.findOne({_id: ObjectId(targetId), deleted: false});
    if (!data) {throw [404, 'no user', 60001]}
    const user = {
      userId: data._id,
      idNumStr: data.userProfile.idNumStr, 
      displayName: data.userProfile.displayName,
      screenName: data.userProfile.screenName,
      icon: data.userProfile.icon,
      banner: data.userProfile.banner,
      spotCount: data.userProfile.spotCount,
      pokeCount: data.userProfile.pokeCount,
      lastPokedTime: data.userProfile.lastPokedTime,
      lastCheckPokeTime: data.userProfile.lastCheckPokeTime,
    }
    targetId === userId?user['email'] = data.email:null; 
    res.json({message: 'success', data: {user: user}, error: null});
  } catch (e) {
    console.error(e)
    res.status(e[0]||500).json({message: ''+(e.message || e[1]||'unexpected error'), data: null, error: (e[2]||true)});
  }
} 

exports.postUser = async (req, res) => { 
  try{
    const body = req.body;
    console.log('post user')
    if (!body.accessToken) {
      throw [400, 'accessToken is required'];
    }
    if (!body.secret) {
      throw [400, 'secret is required'];
    }
    if (!body.idNumStr) {
      throw [400, 'idNumStr is required'];
    }
    console.log(body.accessToken, body.secret, body.idNumStr)
    const {twitter_friends_count: followCount, twitter_follower_count: followerCount} = await twi.getFollowNum(body.accessToken, body.secret, body.idNumStr);
    console.log('success to get follow num')
    if (followCount > 75000) {throw [400, 'friend users number must be lower 75000', 60002]}
    const r1 = await userModel.findOne({
      firebaseUid: body.firebaseUid,
      deleted: false,
    });
    if (r1) {throw [403, 'already exists', 60003]}
    const date = new Date().getTime();
    let query = {
      firebaseUid: body.firebaseUid,
      userProfile: {
        idNumStr: body.idNumStr,
        displayName: body.displayName,
        screenName: body.screenName,
        currentSpot: {},
        icon: body.icon,
        banner: body.banner || '',
        spotCount: 0,
        pokeCount: 0,
        twitterFriendsCount: followCount,
        twitterFollowerCount: followerCount,
        lastPokedTime: 0,
        lastCheckPokeTime: 0,
      },
      email: body.email,
      notification: 0,
      accessToken: body.accessToken,
      secret: body.secret,
      created: date,
      updated: date,
      deleted: false,
    }
    console.log(query)
    const user = new userModel(query);
    const r2 = await user.save();
    console.log(r2)
    if (!r2) {throw [500, 'failed to post', 60004]}
    const token = jwt.signJWT({userId: user._id});
    const follows = await twi.getIds(body.accessToken, body.secret, body.screenName);
    const followIdsStr = follows.map(user => user.userProfile.idNumStr);

    const r3 = await friendModel.find({followStr: {$in: [body.idNumStr]}, idNumStr: {$in: followIdsStr}});
    const friendIdsStr = r3.length? r3.map(user => user.idNumStr):[];

    const friendship = {
      userId: ObjectId(user._id),
      idNumStr: body.idNumStr,
      followStr: followIdsStr,
      friendStr: friendIdsStr,
      deleted: false
    };
    const friends = new friendModel(friendship); 
    const r4 = await friends.save();
    if (!r4) {throw [500, 'failed to insert data', 60005]}
    const data = {
      userId: user._id,
      token: token,
    }
    res.json({message: 'success', data: data, error: null});
  } catch (e) {
    console.error(e);
    res.status(e[0]||500).json({message: ''+(e.message || e[1] ||'unexpected error'), data: null, error: (e[2]||true)});
  }
} 

exports.getFollows = async (req, res) => {
  try{
    const limit = parseInt(req.query.limit, 10) || 10;
    const page = parseInt(req.query.page, 10) || 1;
    const r1 = await userModel.findOne({
      _id: ObjectId(req.decoded.userId),
      deleted: false,
    });
    if (!r1) {throw [404, 'no user', 60006]}
    const follows = await twi.getIds(r1.accessToken, r1.secret, r1.userProfile.screenName);
    const followIdsStr = follows.map(user => user.userProfile.idNumStr);
    if(!follows.length) {throw [404, 'no follows', 60007]}
    const r3 = await friendModel.findOneAndUpdate(
      { _id: ObjectId(req.decoded.userId), deleted: false},
      { $set: { follow: followIds, followStr: followIdsStr }},
    );
    if (!r3) {throw [500, 'cannot set follow', 60008]}
    res.json({message: 'success', data: follows, error: null});
  } catch (e) {
    console.error(e);
    res.status(e[0]||500).json({message: ''+(e.message || e[1]||'unexpected error'), data: null, error: (e[2]||true)});
  }
};

exports.putEmail = async (req, res) => { 
  try{
    const userId = req.decoded.userId;
    const date = new Date().getTime();
    const user = await userModel.findOneAndUpdate(
      {_id: userId, deleted: false},
      {$set: {email: req.body.email}},
    );
    if (!user) {throw [404, 'invalid user data', 60009]}
    res.json({message: 'success', data: null, error: null});
  } catch (e) {
    console.error(e);
    res.status(e[0]||500).json({message: ''+(e.message || e[1]||'unexpected error'), data: null, error: (e[2]||true)});
  }
} 

exports.putNotification = async (req, res) => { 
  try{
    const userId = req.decoded.userId;
    const date = new Date().getTime();
    const user = await userModel.findOneAndUpdate(
      {_id: userId, deleted: false},
      {$set: {notification: req.body.notification}},
    );
    if (!user) {throw [404, 'invalid user data', 60010]}
    res.json({message: 'success', data: null, error: null});
  } catch (e) {
    console.error(e);
    res.status(e[0]||500).json({message: ''+(e.message || e[1]||'unexpected error'), data: null, error: (e[2]||true)});
  }
} 

exports.postInquiry = async (req, res) => {
  try {
    const userId = req.decoded.userId;
    const body = req.body
    const date = new Date().getTime();
    const user = await userModel.findOne({_id: userId, deleted: false});
    if (!user) {throw [404, 'invalid user data', 60010]}
    mail.sendInquiry(user, body.subject, body.text);
    res.json({message: 'success', data: null, error: null});
  } catch (e) {
    console.error(e);
    res.status(e[0]||500).json({message: ''+(e.message || e[1]||'unexpected error'), data: null, error: (e[2]||true)});
  }
}

exports.putCheckPokeTime = async (req, res) => {
  try {
    const userId = req.decoded.userId;
    const body = req.body
    const user = await userModel.findOneAndUpdate(
      {_id: userId, deleted: false},
      {$set: {'userProfile.lastCheckPokeTime': body.lastCheckPokeTime}}
    );
    if (!user) {throw [404, 'invalid user data', 60010]}
    res.json({message: 'success', data: null, error: null});
  } catch (e) {
    console.error(e);
    res.status(e[0]||500).json({message: ''+(e.message || e[1]||'unexpected error'), data: null, error: (e[2]||true)});
  }
}


