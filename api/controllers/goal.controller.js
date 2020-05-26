const goalModel = require("../models/goal.model");
const ObjectId = require('mongoose').Types.ObjectId;
const renameId = require("../helpers/util.helper").renameId;


exports.getGoals = async (req, res) => { 
  try{
    const limit = parseInt(req.query.limit, 10);
    const page = parseInt(req.query.page, 10);
    const data = await goalModel.find({deleted: false})
      .sort('-created')// 降順、最新順ソート
      .skip((page - 1) * limit)
      .limit(limit);
    if (!data.length) {throw [404, 'no goals', 20001]}
    const goals = data.map(obj => renameId('goalId', obj));
    res.json({message: 'success', data: {goals: goals}, error: null});
  } catch (e) {
    console.error(e);
    res.status(e[0]||500).json({message: ''+(e.message || e[1]||'unexpected error'), data: null, error: (e[2]||true)});
  }
} 

exports.getGoalById = async (req, res) => { 
  try{
    const id = req.params.id;
    const data = await goalModel.findOne({_id: ObjectId(id), deleted: false});
    if (!data) {throw [404, 'no goal', 20002]}
    const goal = renameId('goalId', data);
    res.json({message: 'success', data: {goal: data}, error: null});
  } catch (e) {
    console.error(e);
    res.status(e[0]||500).json({message: ''+(e.message || e[1]||'unexpected error'), data: null, error: (e[2]||true)});
  }
} 

exports.postGoal = async (req, res) => {
  try{
    const r1 = await goalModel.findOne({
      name: req.body.name,
      deleted: false,
    });
    if (r1) {throw [403, 'already exists', 20003]}
    const body = req.body;
    const now = new Date().getTime()
    body.created = now;
    body.updated = now;
    body.deleted = false;
    const goal = await goalModel(body);
    const res2 = await goal.save()
    if (!res2) {throw [500, 'fail to post goal', 20004]}
    res.json({message: 'success', data: null, error: null});
  } catch(e) {
    res.status(e[0]||500).json({message: ''+(e.message || e[1]||'unexpected error'), data: null, error: (e[2]||true)});
  } 
}
