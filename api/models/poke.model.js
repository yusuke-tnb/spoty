const mongoose = require('../config/db');
const Schema = mongoose.Schema;

const pokeSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    index: true,
    ref: 'User',
  },
  targetId: {
    type: Schema.Types.ObjectId,
    required: true,
    index:true,
    ref: 'User',
  },
  spotId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Spot',
  },
  expire: {
    type: Number,
  },
});

module.exports = mongoose.model('Poke', pokeSchema);
