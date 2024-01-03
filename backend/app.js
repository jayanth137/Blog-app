var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var postsRouter = require('./routes/post');

var app = express();
const cors = require('cors');

require('dotenv').config();

app.use(
  cors({
    origin: ['https://blog-app-client-phi.vercel.app/'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  })
);

//MONGOOSE
const mongoose = require('mongoose');

const databaseUri = process.env.ATLAS_URI;

// and then the connection function

mongoose
  .connect(databaseUri)
  .then(() => {
    console.log('MongoDB Connected');
  })
  .catch((err) => console.log(err));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public') + '/index.html'));

app.use('/', indexRouter);
app.use('/api/posts', postsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Add Access Control Allow Origin headers

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
