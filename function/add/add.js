const db = require('./../../db.js')

const add = async (title) => {
  //读取文件
  const list = await db.read()
  //添加todo
  list.push({title, done: false})
  //写入文件
  await db.write(list)
  
}

module.exports = add