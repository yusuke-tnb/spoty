const ObjectId = require('mongoose').Types.ObjectId;

const userModel = require("../models/user.model");
const spotModel = require("../models/spot.model");
const friendModel = require("../models/friendship.model");
const twi = require("../helpers/twitter.helper");
const mail = require("../helpers/mail.helper");


exports.getSpot = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 10;
    const page = parseInt(req.query.page, 10) || 1;
    const date = new Date().getTime();
    const userId = req.decoded.userId;

    // check user
    const user = await userModel.findOne({
      _id: ObjectId(userId),
      deleted: false
    });
    if (!user) {throw [404, 'no user', 50002]}

    // check spot
    const spot = user.userProfile.currentSpot;
    if (!spot || spot.expire < date) {throw [400, 'please post spot before get spot list', 50003]}

    // check friendship data exist or not
    const friendship = await friendModel.find({
      userId: ObjectId(userId),
      deleted: false,
    })
    if (!friendship) {throw [404, 'no friendship', 50004]}

    const idNumStr = friendship.idNumStr;
    const followStr = friendship.followStr; 
    let query = { 
      userId: {$ne: ObjectId(userId)},
      expire: {
        $gte: date,
      },
      deleted: false,
    }

    // add conditions by request
    // meet
    query['meet'] = spot.meet;
    // area
    (spot.areaIds && spot.areaIds.length)? query['areaIds'] = { $in: spot.areaIds.map(id => ObjectId(id))}:null;
    // goal
    (spot.goalIds && spot.goalIds.length)? query['goalIds'] = {$in: spot.goalIds.map(id => ObjectId(id))}:null;
    // follow
    spot.follow? query['idNumStr'] = { $in: followStr }: null;

    const spotUsers = await spotModel.find(query)
      .populate('userId')
      .skip((page - 1) * limit)
      .limit(limit);
    if (!spotUsers.length) {throw [404, 'no spots', 50005]} 
    const data = spotUsers.map(spot => {
      return ({
        userId: spot.userId._id,
        ...spot.userId.userProfile,
      });
    });
    res.json({message: 'success', data: {users: data}, error: null});
  } catch (e) {
    console.error(e);
    res.status(e[0]||500).json({message: ''+(e.message || e[1]||'unexpected error'), data: null, error: (e[2]||true)});
  }  
}

exports.postSpot = async (req, res) => {
  try{
    const limit = parseInt(req.query.limit, 10) || 10;
    const page = parseInt(req.query.page, 10) || 1;
    const userId = req.decoded.userId;
    const body = req.body;
    const findQuery = {
      _id: ObjectId(userId), 
      deleted: false,
    }
    const user = await userModel.findOne(findQuery);
    if (!user) {throw [404, 'no user', 50006]}
    const date = new Date().getTime();
    const expire = date + (3*60*60*1000);
    const areaIds = body.areaIds || [];
    const goalIds = body.goalIds || [];
    const meet = body.meet?true:false;
    const follow = body.follow?true:false;
    let query = {
      meet: meet,
      follow: follow,
      expire: expire,
    }
    areaIds.length? query['areaIds'] = areaIds.map(id => ObjectId(id)):null;
    goalIds.length? query['goalIds'] = goalIds.map(id => ObjectId(id)):null;
    const spotQuery = {
      userId: ObjectId(userId),
      idNumStr: user.userProfile.idNumStr,
      ...query,
      deleted: false,
    }
    const r1 = await spotModel.updateMany(
      {userId: user._id},
      {$set: {deleted: true}}
    );
    const spot = new spotModel(spotQuery);
    const r2 = await spot.save();
    if (!r2) {throw [500, 'failed to update db', 50007]}
    query.spotId = ObjectId(spot._id);
    let postQuery = { 
      $set: {
        'userProfile.currentSpot': query 
      },
      $inc: {
        'userProfile.spotCount': 1
      }
    }
    const r3 = await userModel.findOneAndUpdate(findQuery, postQuery);
    if (!r3) {throw [500, 'failed to update db', 50008]}
    res.json({message: 'success', data: null, error: null});
  } catch (e) {
    console.error(e)
    res.status(e[0]||500).json({message: ''+(e.message || e[1]||'unexpected error'), data: null, error: (e[2]||true)});
  }
}
