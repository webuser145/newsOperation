const express = require('express');
const router = express.Router();
const articlesService = require('../public/services/articlesService');


/* POST users listing. */
// 发送post请求是保存数据
router.post('/articles', (req, res, next) => {
  let {author,article_name,source,article} = req.body; // 对象的解构赋值
  // console.log(author,article_name,source,article)
  let art = {
    author,
    article_name,
    source,
    article,
    createTime:new Date().toLocaleDateString() + '-' + new Date().toLocaleTimeString()
  }
  if(art.source === ''){
    art.source = '原创内容';
  }
  // 向数据库保存数据
  articlesService.save(art)
  .then(data => {  // 成功
    res.json({msg:'文章发布成功'});
  }).catch(error => { // 失败
    res.json({msg:'文章发布失败'});
  })
});


// 发送get请求是查询数据

router.get('/articles',(req,res,next) => {
    // 从数据库查询所有数据
    articlesService.find()
    .then(data => {  // 查找成功
      //文件名后的ejs可以省略
      // 使用ejs模板技术
      res.render('articlesFind',{find_data:data});
    }).catch(error => { // 查找失败
      res.send(error);
    })
})

// 发送delete请求删除数据

router.delete('/articles/:id',(req,res,next) => {  // /articles/:id 谨记这里
  // 从数据库查询所有数据
  articlesService.delById(req.params.id)
  .then(data => {  // 删除成功
    res.json({msg:'文章删除成功'});
  }).catch(error => { // 删除失败
    res.json({msg:'文章删除失败'});
  })
})

// 发送get请求通过id查询数据

router.get('/articles/:id',(req,res,next) => {  // /articles/:id 谨记这里
  // 从数据库通过id查询数据
  articlesService.findById(req.params.id)
  .then(data => {  // 查询成功
    res.json(data);
  }).catch(error => { // 查询失败
    throw error;  // 抛出错误
  })
})

// 发送put请求通过id修改数据

router.put('/articles/:id',(req,res,next) => {  // /articles/:id 谨记这里
  let {author,article_name,source,article} = req.body; // 对象的解构赋值
  // console.log(author,article_name,source,article)
  let art = {
    author,
    article_name,
    source,
    article,
    createTime:new Date().toLocaleDateString() + '-' + new Date().toLocaleTimeString()
  }
  if(art.source === ''){
    art.source = '原创内容';
  }
  
  // 从数据库通过id修改数据
  articlesService.updateById(req.params.id,art)
  .then(data => {  // 修改成功
    res.json({msg:'文章修改成功'});
  }).catch(error => { // 修改失败
    res.json({msg:'文章修改失败'}); 
  })
})

module.exports = router;

