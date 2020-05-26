const mongoose = require('../config/db');
const Schema = mongoose.Schema;

const spotSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    index: true,
    ref: 'User',
  },
  idNumStr: { 
    type: String,
    required: true,
  },
  areaIds: [{
    type: Schema.Types.ObjectId, 
    ref: 'Area'
  }],
  goalIds: [{
    type: Schema.Types.ObjectId, 
    ref: 'Goal'
  }],
  meet: {
    // 出会い目的flag
    type: Boolean,
    required: true,
    default: false,
  },
  follow: {
    // 自分がフォローしてる人向けspotFlag
    type: Boolean,
    required: true,
    default: false,
  },
  expire: {
    type: Number,
    required: true,
  },
  deleted: {
    type: Boolean,
    required: true,
  }
});

module.exports = mongoose.model('Spot', spotSchema);
