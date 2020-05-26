const mongoose = require('../config/db');
const Schema = mongoose.Schema;

const goalSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  goalNum: {
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

module.exports = mongoose.model('Goal', goalSchema);
