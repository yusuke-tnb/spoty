const userModel = require("../models/user.model");
const pokeModel = require("../models/poke.model");
const ObjectId = require('mongoose').Types.ObjectId;

const twi = require("../helpers/twitter.helper");
const mail = require("../helpers/mail.helper");
const renameId = require("../helpers/util.helper").renameId;


exports.getPoke = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 10;
    const page = parseInt(req.query.page, 10) || 1;
    const date = new Date().getTime();
    const userId = req.decoded.userId;
    let query = { 
      targetId: ObjectId(userId),
      expire: {
        $gte: date,
      }
    }
    const pokes = await pokeModel.find(query)
      .populate('spotId')
      .populate('userId')
      .skip((page - 1) * limit)
      .limit(limit);
    if (!pokes.length) {throw [404, 'no pokes', 40001]} 
    const datas = pokes.map(poke => {
      return ({
        pokeId: poke._id,
        userProfile: {
          userId: poke.userId._id,
          ...poke.userId.userProfile,
        },
        targetId: poke.targetId,
        spot: renameId('spotId', poke.spotId),
      })
    });
    res.json({message: 'success', data: {pokes: datas}, error: null});
  } catch (e) {
    console.error(e);
    res.status(e[0]||500).json({message: ''+(e.message || e[1]||'unexpected error'), data: null, error: (e[2]||true)});
  }  
}

exports.showUser = async (req, res) => {
  try {
    const sourceUser = req.query.sourceUser;
    const targetUser = req.query.targetUser;
    const userId = req.decoded.userId;
    const user = await userModel.findOne({
      _id: ObjectId(userId),
      deleted: false,
    });
    if (!user) {throw [404, 'no user in user table', 40003]}
    const showRes = await twi.showUser(user.accessToken, user.secret, sourceUser, targetUser);
    res.json({message: 'success', data: showRes, error: null});
  } catch (e) {
    console.error(e);
    res.status(e[0]||500).json({message: ''+(e.message || e[1]||'unexpected error'), data: null, error: (e[2]||true)});
  }
}

exports.postPoke = async (req, res) => {
  try{
    const userId = req.decoded.userId;
    const date = new Date().getTime();
    const targetId = req.body.targetId;
    if (userId === targetId) { throw [400, 'cannot send Poke to yourself', 40008]}
    const user = await userModel.findOne({
      _id: ObjectId(userId), 
      deleted: false,
    });
    if (!user) {throw [404, 'no user in user table', 40004]}
    if (user.userProfile.currentSpot.expire < date) {
      throw [400, 'the user has not spotted yet', 40005]
    }
    const target = await userModel.findOneAndUpdate(
      {_id: ObjectId(targetId), deleted: false},
      {$inc: { 'userProfile.pokeCount': 1 },
       $set: {'userProfile.lastPokedTime': date}}
    );
    if (!target) {throw [404, 'target is not found', 40006]}
    const query = {
      userId: ObjectId(userId),
      targetId: ObjectId(targetId),
      spotId: ObjectId(user.userProfile.currentSpot.spotId),
      expire: user.userProfile.currentSpot.expire,
    }
    let poke = new pokeModel(query) 
    const r1 = await poke.save();
    if (!r1) {throw [500, 'failed to post poke', 40007]}
    mail.sendPoke(target.email, user.userProfile.displayName, target.userProfile.displayName);
    poke = renameId('pokeId', poke);
    res.json({message: 'success', data: {poke: poke}, error: null});
  } catch (e) {
    console.error(e)
    res.status(e[0]||500).json({message: ''+(e.message || e[1]||'unexpected error'), data: null, error: (e[2]||true)});
  }
}
