const areaModel = require("../models/area.model");
const ObjectId = require('mongoose').Types.ObjectId;
const renameId = require("../helpers/util.helper").renameId;

exports.getAreas = async (req, res) => { 
  try{
    const limit = parseInt(req.query.limit, 10);
    const page = parseInt(req.query.page, 10);
    const data = await areaModel.find({deleted: false})
      .sort('-created')// 降順、最新順ソート
      .skip((page - 1) * limit)
      .limit(limit);
    if (!data.length) {throw [404, 'no areas', 10001]}
    const areas = data.map(area => renameId('areaId', area));
    res.json({message: 'success', data: {areas: areas}, error: null});
  } catch (e) {
    console.error(e);
    res.status(e[0]||500).json({message: ''+(e.message || e[1]||'unexpected error'), data: null, error: (e[2]||true)});
  }
} 

exports.getAreaById = async (req, res) => { 
  try{
    const id = req.params.id;
    const data = await areaModel.findOne({_id: ObjectId(id), deleted: false});
    if (!data) {throw [404, 'no area', 10002]}
    const area = renameId('areaId', data);
    res.json({message: 'success', data: {area: area}, error: null});
  } catch (e) {
    console.error(e);
    res.status(e[0]||500).json({message: ''+(e.message || e[1]||'unexpected error'), data: null, error: (e[2]||true)});
  }
} 

exports.postArea = async (req, res) => {
  try{
    const r1 = await areaModel.findOne({
      name: req.body.name,
      deleted: false,
    });
    if (r1) {throw [403, 'already exists', 10003]}
    const body = req.body;
    const now = new Date().getTime()
    body.created = now;
    body.updated = now;
    body.deleted = false;
    const area = await areaModel(body);
    const res2 = await area.save()
    if (!res2) {throw [500, 'fail to post area']}
    res.json({message: 'success', data: null, error: null});
  } catch(e) {
    res.status(e[0]||500).json({message: ''+(e.message || e[1]||'unexpected error'), data: null, error: (e[2]||true)});
  } 
}
