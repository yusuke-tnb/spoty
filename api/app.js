const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const expressValidation = require('express-validation');
const APIError = require('./helpers/APIError');

const follow = require('./batch/follow.batch');

const jwt = require("./config/jwt");
const conf = require("./config/conf");
const users = require("./routes/user.route");
const login = require("./routes/login.route");
const area = require("./routes/area.route");
const goal = require("./routes/goal.route");
const spot = require("./routes/spot.route");
const poke = require("./routes/poke.route");

//const master = require("./routes/master.route");

//const cors = require('cors');

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, "public", "favicon.ico")));
app.use(logger("[pid: "+process.pid+"] : :method :url :response-time ms "));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//app.use(cors())

app.use(function(req, res, next) { 
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", " x-access-token, Origin, X-Requested-With, Content-Type, Accept");
  if(req.method == "OPTIONS"){
    res.json({"error":null});
  }else{
    next();
  }
}); 
app.use(
  (req, res, next) =>{ 
    console.log("body, query", req.body, req.query);
    if("json" in req.query){
      try{
        let obj = JSON.parse(req.query.json);
        for(let key in obj){
          req.query[key] = obj[key];
        }
        delete req.query.json;
        next();
      }catch(e){
        res.status(400).json({"error": "bad json format"})
      }
    }else{
      next();
    }
  } 
);

// API for Health Check
app.use("/probe", (req, res) => {
  res.status(200).json({message: "success", data: null, error: null});
});

// jwt authorize
app.use(jwt.decodeJWT);

app.use("/v1/login", login);
app.use("/v1/user", users);
app.use("/v1/area", area); 
app.use("/v1/goal", goal);
app.use("/v1/spot", spot);
app.use("/v1/poke", poke);

//app.use("/v1/master", master);


app.use((err, req, res, next) => { 
  console.log('dfa', err)
  if (err instanceof expressValidation.ValidationError) {
    // validation error contains errors which is an array of error each containing message[]
    const unifiedErrorMessage = err.errors.map(error => error.messages.join('. ')).join(' and ');
    const error = new APIError(unifiedErrorMessage, err.status, true);
    return next(error);
  } else if (!(err instanceof APIError)) {
    const apiError = new APIError(err.message, err.status, err.isPublic);
    return next(apiError);
  }
  return next(err);
}); 

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error("Not Found");
  err.status = 404;
  console.log('a', err)
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.error(err);
  res.json({"error": true});
})


module.exports = app;
