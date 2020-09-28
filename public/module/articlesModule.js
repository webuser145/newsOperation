const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 1. 定义集合里面的字段和字段的类型

let articlesSchema = new Schema({
  author:String,
  article_name:String,
  source:String,
  article:String,
  createTime:String
})

// 2. 定义Model
// 参数一:数据库集合的名字，会自动加上s，如数据库中没有则会自动创建
// 参数二: Schema, 用来封装查询的结果

let Articles = mongoose.model('article',articlesSchema);

//3. 暴露Model，避免重复定义，方便其他地方的使用

module.exports = Articles;
