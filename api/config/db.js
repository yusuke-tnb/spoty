const mongoose = require('mongoose');
const conf = require('./conf');

const mongoUri = conf.mongoHost;
let failCount = 0;

mongoose.Promise = global.Promise;

const _connect = () => {
  mongoose.connect(mongoUri, { useNewUrlParser: true })
    .then(console.log('connecting to mongoDB'))
    .then(console.log('connected'))
    .catch((e) => { 
      console.log('got a error'); 
      ++failCount;
      if (failCount < 10) {
        setTimeout(_connect, 3000);
      }else{
        console.error(e);
      }
    });
}

// connect to mongo db
console.log(`connecting to ${mongoUri}`);
_connect();

mongoose.connection.on('error', () => {
  setTimeout(_connect, 3000);
  console.log('retry to connect to database after 3 sec');
  // throw new Error(`unable to connect to database: ${mongoUri}`); 
});


module.exports = mongoose;
