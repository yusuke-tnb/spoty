'use strict';
const mailer = require('nodemailer');

const userModel = require("../models/user.model");
const friendModel = require("../models/friendship.model");
const areaModel = require("../models/area.model");
const conf = require('../config/conf');


exports.sendPoke = (to, name, targetName) => {
  try {
    const subject = name+"さんからPokeされました"
    const message = `<h1>Spotyで${name}さんから${targetName}さんがPokeされました！</h1>

ログインして確認しましょう！
<a href="https://spotyapp.jp">https://spotyapp.jp</a>
`
  this.send(to, subject, message); 
  } catch (e) {
    console.error(e);
    _error('mail://'+e)
  }
}

exports.sendSpot = async (user, areaIds) => {
  try{
    const name = user.userProfile.displayName;
    const areas = await areaModel.find({_id: {$in: areaIds}}) 
    let areaName = ' | ';
    areas.length?areas.map(area => areaName += area.name+' | '):areaName = '';
    const friendship = await friendModel.findOne({userId: user._id});
    const friends = await userModel.find({'userProfile.idNumStr': {$in: friendship.friendStr}}); 

    const subject = name+"さんがSpotました"
    const message = `<h1>Spotyで${name}さんが`+areaName+'で'+`Spotしました！</h1>

ログインして確認しましょう！
<a href="https://spotyapp.jp">https://spotyapp.jp</a>
`
  for (let i=0; i<friends.length;i=(i+1)|0){
    let to = friends[i].email;
    console.log(to, subject, message)
    this.send(to, subject, message); 
  }
  } catch (e) {
    console.error(e);
    _error('mail://'+e)
  }
}

exports.sendInquiry = (user, subject, text) => {
  try{
    const name = user.userProfile.displayName;
    const spotyId = user._id;
    const email = user.email;
    const mailSubject = name+"さんからお問い合わせです。"
    const message = `以下のお問い合わせが来ています。<br>
名前:${name}<br>
SpotyId: ${spotyId}<br>
メールアドレス: ${email}<br>
問い合わせタイトル: ${subject}<br>
問い合わせ内容: ${text}<br>
`
  this.send(conf.mailUser, mailSubject, message); 
  } catch (e) {
    console.error(e);
    _error('mail://'+e)
  }
}

exports.send = (to, subject, text) => {
  try {
    const setting = {
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, 
      auth: {
        user: conf.mailUser,
        pass: conf.mailPass,
      }
    };

    const mailOptions = {
        from: conf.mailUser,
        to: to,
        subject: subject,
        html: text,
    };

    const smtp = mailer.createTransport(setting);

    smtp.sendMail(mailOptions, function(err, res) {
      if(err){ 
        console.error(err);
        throw [500, 'failed to mail'] 
      }
      smtp.close();
      return true;
    });
  } catch (e) {
    console.error(e);
    _error('mail://'+e)
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
