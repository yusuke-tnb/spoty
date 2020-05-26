const jwt = require('jsonwebtoken');
const fs = require('fs');

const conf = require('./conf');


exports.decodeJWT = (req, res, next) => {//{{{
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  if( !token ){
    next();
    return;
  }
  jwt.verify( token, fs.readFileSync( conf.jwtPubkey ), { algorithms: ['RS256'] }, function( err, decoded ){
    if( err ){
      return res.status(403).json( { "error": "Invalid token" } );
    }
    req.decoded = decoded;
    next();
  });
};//}}}

exports.checkJWT = (req, res, next) => {//{{{
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  if( !token ){
    return res.status(403).send( { error: 'No token provided.' } );
  }
  jwt.verify( token, fs.readFileSync( conf.jwtPubkey ), { algorithms: ['RS256'] }, function( err, decoded ){
    if( err ){
      return res.status(403).json( { "error": "Invalid token" } );
    }
    req.decoded = decoded;
    next();
  });
};//}}}

exports.signJWT = obj => jwt.sign( obj, fs.readFileSync( conf.jwtPrikey ), {expiresIn: '24h', algorithm: 'RS256'});

exports.pubkey = () => fs.readFileSync( conf.jwtPrikey );
