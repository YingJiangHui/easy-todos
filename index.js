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

const x = {
  markAsDone,
  markAsUndone,
  updateTitle,
  remove(list, index) {
    list.splice(index, 1)
    db.write(list)
  }
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
    action && action(list, index)
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

function removeOnce(list,key) {
  const searchList = list.filter((item, index) => Number(index) === Number(key) || item.title.trim() === key.trim())
  if(searchList.length===0){
    console.log('找不到哎')
    return;
  }
  const newList = list.filter((item, index) => Number(index) !== Number(key) && item.title.trim() !== key.trim())
  inquirer
    .prompt([
      {
        type: 'confirm',
        name: 'choices',
        message: (a) => {
          return "确认是否删除 todo --> " + searchList.map(item => item.title).join(' | ')
        },
      },
    ])
    .then((answer) => {
      answer.choices && db.write(newList)
    })
}
function removeList(list) {
  inquirer
    .prompt([
      {
        type: 'checkbox',
        name: 'select',
        message: 'remove todo/todos ？',
        choices: [...list.map((item, index) => {
          return {
            name: `${index+1}. ${item.title}`,
            value: index.toString()
          }
        })],
      },
    ]).then((answer) => {
    const newList = list.filter((item, index) => !answer.select.includes(index.toString()))
    list.length !== newList && db.write(newList)
  })
}

const remove = async (key) => {
  const list = await db.read()
  if(list.length === 0){
    console.log("not todo")
    return;
  }
  
  if (!key) {
    removeList(list)
    return;
  }
  
  removeOnce(list,key)
}

module.exports = {add, remove, clear, showAll}


