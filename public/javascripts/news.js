let formValidator = content => {
  let len = content.length;
  let reg = /=$/i;  // 匹配以=号结尾的即为空
  let count = 0;  // 允许计数
  let arr_val = [];  // 存储数据
  for(let i = 0; i < len; i++){
    // console.log(content[i]);
    if(reg.test(content[i])){
      count++;
      arr_val.push(content[i]);
    }
  }

  let str_val = arr_val.join('=');  // 分割获取内容
  // console.log(str_val);

  if(count > 1 || str_val != 'source=' && str_val != ''){
    alert('作者,文章名和正文内容不能为空');
    return false;
  }else{
    return true;
  }
}