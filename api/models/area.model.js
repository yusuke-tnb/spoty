const mongoose = require('../config/db');
const Schema = mongoose.Schema;


const areaSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  areaNum: {
    type: Number,
    required: true,
  },
  created: {
    // unixtime
    type: Number,
    required: true
  },
  updated: {
    // unixtime
    type: Number,
    required: true
  },
  deleted: {
    type: Boolean,
    required: true
  }
});

module.exports = mongoose.model('Area', areaSchema);
