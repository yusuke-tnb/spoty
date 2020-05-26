'use strict';
const request = require('request');
const Twitter = require('twitter');

const userModel = require('../models/user.model'); 
const spotModel = require('../models/spot.model');
const conf = require('../config/conf');


exports.showUser = (accessToken, secret, sourceScreenName, targetScreenName) => {
  return new Promise (async (resolve, reject) => {
    try {
      let client = new Twitter({
        consumer_key: conf.TWITTER_CONSUMER_KEY,
        consumer_secret: conf.TWITTER_CONSUMER_SECRET,
        access_token_key: accessToken,
        access_token_secret: secret,
      });
      const params = {
        source_screen_name: sourceScreenName, 
        target_screen_name: targetScreenName
      };
      client.get('friendships/show.json', params, (err, data, res) => {
        if (err) {
          reject([500, err[0]['message']?err[0]['message']:err])
        }
        resolve(data);
      });
    } catch (e) {
      reject(e);
    }
  });
}

exports.getFollowNum = (accessToken, secret, idNumStr) => {
  return new Promise(async (resolve, reject) => {
    try{
      let client = new Twitter({
        consumer_key: conf.TWITTER_CONSUMER_KEY,
        consumer_secret: conf.TWITTER_CONSUMER_SECRET,
        access_token_key: accessToken,
        access_token_secret: secret,
      });
      const param = {user_id: idNumStr}
      client.get('users/show.json', param, (err, data, res) => {
        if (err) {
          reject([500, err[0]['message']?err[0]['message']:err])
        }
        resolve({
          twitter_follower_count: parseInt(data.followers_count, 10), 
          twitter_friends_count: parseInt(data.friends_count,10)
        });
      }); 
    } catch(e) {
      reject(e);
    }  
  });
}

exports.getIds = (accessToken, secret, screenName) => {
  return new Promise (async (resolve, reject) => {
    try {
      let client = new Twitter({
        consumer_key: conf.TWITTER_CONSUMER_KEY,
        consumer_secret: conf.TWITTER_CONSUMER_SECRET,
        access_token_key: accessToken,
        access_token_secret: secret,
      });
      const params = {screen_name: screenName, stringify_ids: true, cursor: -1};
      let follows = await _getFollow(client, params, []); 
      const users = await userModel.find({
          'userProfile.idNumStr': { $in: follows },
          deleted: false
      }); 
      resolve(users);
    } catch (e) {
      console.error('getIds', e)
      reject(e);
    }
  });
}

const _getFollow = (client, params, follows) => {
  return new Promise((resolve, reject) => {
    try {
      client.get('friends/ids.json', params, async (err, data, res) => {
        if (err) {
          reject([500, err[0]['message']?err[0]['message']:err])
        }
        follows = follows.concat(data.ids);
        if (data.next_cursor >= 0) {
          params.cursor = data.next_cursor;
          resolve(await _getFollow(client, params, follows)); 
        } else {
          resolve(follows);
        }
      });
    } catch (e) {
      console.error('getFollows', e)
      reject(e);
    }
  });
}
