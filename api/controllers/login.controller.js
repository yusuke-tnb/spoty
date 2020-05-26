const userModel = require("../models/user.model");
const jwt = require('../config/jwt');
const postUser = require('./user.controller').postUser;

exports.login = async (req, res) => {
  try {
    console.log('login')
    const body = req.body;
    const firebaseUid = body.firebaseUid;
    console.log(firebaseUid);
    if (typeof(firebaseUid) !== "string") {throw [403,'Invalid firebaseUid', 30001]}
    let query = {}
    body.icon? query['userProfile.icon'] = body.icon:null;
    body.banner? query['userProfile.banner'] = body.banner:null;
    body.displayName? query['userProfile.displayName'] = body.displayName:null;
    body.screenName? query['userProfile.screenName'] = body.screenName:null;
    let  data = await userModel.findOneAndUpdate(
        { firebaseUid: firebaseUid, deleted: false },
        { $set: {
            ...query
          }
        }
      );
    if (data) {
      const token = jwt.signJWT({userId: data._id});
      res.status(200).json({message: 'success', data: {token: token, userId: data._id}, error: null});
      return;
    } else {
      postUser(req, res); 
    }
  } catch (e) {
    console.log('login error', e)
    res.status(e[0]||500).json({message: ''+(e.message || e[1]||'unexpected error'), data: null, error: (e[2]||true)});
  }
}
