#!/usr/bin/env node
const db = require('./db.js')
const inquirer = require('inquirer')
const add = async (title) => {
  //读取文件
  const list = await db.read()
  //添加todo
  list.push({title, done: false})
  //写入文件
  await db.write(list)

}

const clear = () => {
  db.write([])
}

function askForCreate(list, index) {
  inquirer.prompt({
    type: 'input',
    name: 'title',
    message: '输入创建的标题名',
  }).then((answers) => {
    list.push({title: answers.title, done: false})
    db.write(list)
  })
}

function markAsDone(list, index) {
  list[index].done = true
  db.write(list)
}

function markAsUndone(list, index) {
  list[index].done = false
  db.write(list)
}

function updateTitle(list, index) {
  inquirer.prompt({
    type: 'input',
    name: 'title',
    message: '修改你的标题',
    default: list[index].title
  }).then((answers) => {
    list[index].title = answers.title
    db.write(list)
  })
}

function remove(list, index) {
  list.splice(index, 1)
  db.write(list)
}

const x = {
  markAsDone,
  markAsUndone,
  updateTitle,
  remove
}

function askForAction(list, index) {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'action',
        message: '请选择你想要的操作',
        choices: [
          {name: '退出', value: 'quit'},
          {name: '完成', value: 'markAsDone'},
          {name: '未完成', value: 'markAsUndone'},
          {name: '修改标题', value: 'updateTitle'},
          {name: '删除', value: 'remove'}
        ],
      },
    ]).then((answer2) => {
    const action = x[answer2.action]
    action && action(list,index)
  })
}

const showAll = async () => {
  const list = await db.read()
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'index',
        message: '请选择你想要的操作',
        choices: [{name: '退出', value: '-1'}, ...list.map((item, index) => {
          return {
            name: `${item.done ? '[x]' : '[_]'} ${index + 1} - ${item.title}`,
            value: index.toString()
          }
        }), {name: '创建', value: '-2'}],
      },
    ])
    .then((answer) => {
      const index = parseInt(answer.index)
      if (index >= 0) {
        askForAction(list, index)
      } else if (index === -2) {
        askForCreate(list, index)
      }
    })
}


module.exports = {add, clear, showAll}


