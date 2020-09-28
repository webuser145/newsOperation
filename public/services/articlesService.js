const Articles = require('../module/articlesModule');

module.exports = {
  save: art => new Articles(art).save(),  // 保存数据
  find: () => Articles.find(),    // 查询数据
  delById:id => Articles.findByIdAndRemove(id),  // 删除数据
  findById:id => Articles.findById(id),  // 通过id查询相应数据
  updateById:(id,update) => Articles.findByIdAndUpdate(id,update)  // 通过id修改数据
}