const mongoose = require('../config/db');
const Schema = mongoose.Schema;

const friendshipSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    index: true,
    ref: 'User',
  },
  idNumStr: {
    // user固有のID(number)
    type: String,
    required: true,
  },
  followStr: {
    // ids which is the user followed but unfollow backed user ids
    type: [String],
  },
  friendStr: {
    type: [String],
  },
  deleted: {
    type: Boolean,
    required: true,
  }
});

module.exports = mongoose.model('Friendship', friendshipSchema);
