const mongoose = require('../config/db');
const Schema = mongoose.Schema;


const userProfile = {
  idNumStr: {
    type: String,
    required: true
  },
  displayName: {
    // 表示名
    type: String,
    required: true
  },
  screenName: {
    // @username
    type: String,
    required: true
  },
  currentSpot: {
    spotId: {
      type: Schema.Types.ObjectId,
      ref: 'Spot',
    },
    areaIds: [{
      type: Schema.Types.ObjectId, 
      ref: 'Area',
    }],
    goalIds: [{
      type: Schema.Types.ObjectId, 
      ref: 'Goal',
    }],
    expire: {
      type: Number
    },
    meet: {
      type: Boolean,
      required: true,
      default: false,
    }, 
    follow: {
      type: Boolean,
      required: true,
      default: false,
    }, 
  },
  spotCount: {
    type: Number,
    required: true
  },
  pokeCount: {
    type: Number,
    required: true
  },
  icon: {
    // URL
    type: String,
    required: true,
  },
  banner: {
    //URL
    type: String,
  },
  twitterFriendsCount: {
    type: Number,
    required: true,
  },
  twitterFollowerCount: {
    type: Number,
    required: true,
  },
  lastPokedTime: {
    type: Number,
  },
  lastCheckPokeTime: {
    type: Number,
  }
}

const userSchema = new Schema({
  firebaseUid: {
    // firebaseからもらえるuid
    type: String,
    required: true,
    index: true
  },
  userProfile: userProfile,
  email: {
    type: String,
    required: true
  },
  notification: {
    type: Number,
    required: true
  },
  accessToken: {
    type: String,
    required: true
  },
  secret: {
    type: String,
    required: true
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
  },
});

module.exports = mongoose.model('User', userSchema);
