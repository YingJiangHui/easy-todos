const db = require("./../../db.js")
const inquirer = require("inquirer")
const colors = require("colors")
const priorityMapColor = {
  "low": "blue",
  "Medium": "yellow",
  "high": "red"
}
const priorityMap = {
  "low": "❗  ",
  "Medium": "❗❗ ",
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
      {name: "low    ❗".blue, value: "low"},
      {name: "Medium ❗❗".yellow, value: "Medium"},
      {name: "high   ❗❗❗ ".red, value: "high"}
    ]
  }, {
    type: "confirm", name: "done", message: "To do done ?"
  }])
}

const add = async (title) => {
  const todoInfo = title ? {title, done: false} : await collectTodoInfo()
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