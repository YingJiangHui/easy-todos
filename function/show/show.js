const inquirer = require('inquirer')
const db = require("../../db");
require('colors')
const {add,priorityMap,priorityMapColor} = require('../add/add')
function askForCreate(list, index) {
  add()
  // inquirer.prompt({
  //   type: 'input',
  //   name: 'title',
  //   message: '输入创建的标题名',
  // }).then((answers) => {
  //   list.push({title: answers.title, done: false})
  //   db.write(list)
  // })
}

function markAsDone(list, index) {
  list[index].done = true
  db.write(list)
}

function markAsUndone(list, index) {
  list[index].done = false
  db.write(list)
}

async function updateTitle (list, index) {
  const answer = await inquirer.prompt([{
    type: "input",
    name: "title",
    message: "To do title ?",
  }, {
    type: "input",
    name: "description",
    message: "To do description ?",
  }])
  list[index] = {...list[index],...answer}
  await db.write(list)
}

async function remove(list, index) {
  list.splice(index, 1)
  await db.write(list)
}

const actionMap = {
  markAsDone,
  markAsUndone,
  updateTitle,
  remove
}

function askForAction(list, index) {
  const todo = list[index]
  const color = priorityMapColor[todo.priority]
  const title = `${todo.title[color]} ${priorityMap[todo.priority][color]} ${todo.done?"Done".yellow:"Undone".yellow}`
  const gapLine = "----------------------------------------------------------------------------------"[color]
  console.log(gapLine)
  console.log(`
  ${title} \n
  ${todo.description.brightWhite}`)
  console.log(gapLine)
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'action',
        message: 'Select action',
        choices: [
          {name: todo.done?'Mark incomplete':'Mark complete', value: todo.done?'markAsUndone':'markAsDone'},
          {name: 'Edit to do ?', value: 'updateTitle'},
          {name: 'Delete to do ?', value: 'remove'}
        ],
      },
    ]).then((answer2) => {
    const action = actionMap[answer2.action]
    action?.(list, index)
  })
}

const show = async () => {
  const list = await db.read()
  function print({item,index}){
    const info = `${index + 1}.${item.title}`
    const arrow = " ---------------------------> "
    return item.done?`${priorityMap[item.priority]} ${info  + arrow}[ ✔ ]`.gray:`${priorityMap[item.priority][priorityMapColor[item.priority]]} ${info + arrow}[ ✘ ]`
  }
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'index',
        message: '请选择你想要的操作',
        choices: [ ...list.map((item, index) => {
          console.log(item.priority)
          return {
            name: print({item,index}),
            value: index.toString()
          }
        }),{name: '✚   Add'.green, value: '-2'}],
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

module.exports = show