const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

const indexRouter = require('./routes/index');
const apisRouter = require('./routes/apis');

const app = express();

// 连接数据库

// 设置要连接的数据库 '数据库协议://域名:端口号/数据库名'  默认端口号可以不写
const DB_URL = 'mongodb://localhost/code';
// 设置用户名和密码

const USER_NAME = {
  user:'code_he',
  pass:'123456hll',
  authSource:'admin'
}

// 进行连接

mongoose.connect(DB_URL,USER_NAME);

// 数据库连接成功后执行事件并执行回调函数

mongoose.connection.on('connected',() => {
  console.log('数据库连接成功');
})

// 数据库连接失败后执行

mongoose.connection.on('error', err => {
  console.log(`数据库连接失败,失败原因是${err}`);
})


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api', apisRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

app.listen(8888,() => {
  console.log('服务已启动,启动端口8888');
})
