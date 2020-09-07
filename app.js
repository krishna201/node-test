const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors')
const helper=require('./helper')
const index = require('./routes/index');
const app = express();

app.use(logger('dev'));
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser());
app.set('port', process.env.PORT || 4444);

app.use(async (req, res, next) =>{
  try {
    console.log(req.url)

    if(req.url==='/user/login'){
      return next()
    }
    const verifyData =await helper.jwtTokenVerify(req, res, next )
    if(verifyData){
      return next()
    } else {
      return res.json({ status: -1, msg: "Auth failed" });
    }
  
  } catch (err) {
    return res.json({ status: -1, msg: "Auth failed" });
  }
});
app.use('/', index);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});



app.listen(app.get('port'), async(err,res) => {
  console.log("server is running on 4444");
});

module.exports = app;
