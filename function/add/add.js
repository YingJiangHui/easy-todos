const db = require("./../../db.js")
const inquirer = require("inquirer")
const colors = require("colors")
const priorityMapColor = {
  "low": "cyan",
  "medium": "blue",
  "high": "magenta"
}
const priorityMap = {
  "low": "❗  ",
  "medium": "❗❗ ",
  "high": "❗❗❗"
}

const collectTodoInfo = async () => {
  return inquirer.prompt([{
    type: "input",
    name: "title",
    message: "To do title ?"
  }, {
    type: "input",
    name: "description",
    message: "To do description ?"
  }, {
    type: "list", name: "priority", message: "To do priority ?", choices: [
      {name: "Low    ❗"[priorityMapColor["low"]], value: "low"},
      {name: "Medium ❗❗"[priorityMapColor["medium"]], value: "medium"},
      {name: "High   ❗❗❗ "[priorityMapColor["high"]], value: "high"}
    ]
  }, {
    type: "confirm", name: "done", message: "To do done ?"
  }])
}

const add = async (title) => {
  const todoInfo = title ? {title, done: false,description: '',priority: 'medium'} : await collectTodoInfo()
  if (!todoInfo)
    return
  //读取文件
  const list = await db.read()
  // //添加todo
  list.push(todoInfo)
  // //写入文件
  await db.write(list)
}

module.exports = {
  priorityMap,
  add,
  priorityMapColor
}