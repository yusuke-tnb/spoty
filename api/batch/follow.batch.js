const request = require('request');

const userModel = require('../models/user.model');
const friendModel = require('../models/friendship.model');
const ObjectId = require('mongoose').Types.ObjectId;
const twi = require('../helpers/twitter.helper');

exports.renew = async () => {
  try {
    const users = await userModel.find({deleted: false});
    if (users) {
      console.log('no user'); 
      return;
    }
    for (let i = 0; i < users.length; i = (i + 1)|0) {
      console.log((i+1)+'/'+users.length);
      try {
        const follows = await twi.getIds(users[i].accessToken, users[i].secret, users[i].userProfile.screenName);
        if (!follows.length) {
          continue;
        }
        const followIdsStr = follows.map(user => user.userProfile.idNumStr);
        const friendship = {
          userId: users[i]._id,
          idNumStr: users[i].userProfile.idNumStr,
          followStr: followIdsStr,
          deleted: false
        };
        const r1 = await friendModel.find({followStr: {$in: [users[i].userProfile.idNumStr]}});
        if (!r1) {
          _error('no friendship/'+r1+'/'+friendship);
        }
        const friendsStr = r1.length?r1.map(user => user.idNumStr):[];
        const r2 = await friendModel.findOneAndUpdate(
          {userId: ObjectId(users[i]._id), deleted: false},
          {$set: { followStr: followIdsStr,  friendStr: friendsStr}},
        );
        if (!r2) {
          _error('failed to update friendship/'+r2+'/'+friendship);
          continue;
        }
        const { 
          twitter_friends_count: friendCount, 
          twitter_follower_count: followerCount
        } = await twi.getFollowNum(users[i].accessToken, users[i].secret, users[i].userProfile.idNumStr);
        console.log(friendCount, followerCount)
        const r3 = await userModel.findOneAndUpdate(
          {_id: users[i]._id, deleted: false},
          {
            $set: {
            'userProfile.twitterFriendsCount': friendCount,
            'userProfile.twitterFollowerCount': followerCount
            }
          }
        );
        if (!r3) {
          _error('failed to update follow,follower count/'+r3);
          continue;
        }
      } catch(e) {
        console.error('some error', e)
        //_error([e, users[i]])
      }
    }
  } catch(e) {
    console.error('error', e);
    _error(e);
  }
}

const _error = (msg) => {
  let options = {
    uri: 'https://hooks.slack.com/services/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',
    headers: { 'Content-Type':'application/json' },
    json: {text: 'error: '+msg},
  };
  request.post(options, (error, res, body) => {
    console.log('post error', error); 
  });
  return;
}
