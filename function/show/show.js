const inquirer = require('inquirer')
const db = require("../../db");
const colors = require('colors')

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

const actionMap = {
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
        message: 'Select action',
        choices: [
          {name: 'Quit', value: 'quit'},
          {name: 'Done', value: 'markAsDone'},
          {name: 'Undo', value: 'markAsUndone'},
          {name: 'Edit', value: 'updateTitle'},
          {name: 'Del'.red, value: 'remove'}
        ],
      },
    ]).then((answer2) => {
    const action = actionMap[answer2.action]
    action && action(list, index)
  })
}

const show = async () => {
  const list = await db.read()
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'index',
        message: '请选择你想要的操作',
        choices: [{name: 'Quit'.blue, value: '-1'}, ...list.map((item, index) => {
          return {
            name: `${item.done?`${index + 1}.${item.title} ---------------------------> [ ✔ ]`.gray:`${index + 1}.${item.title} ---------------------------> [ ✘ ]`}`,
            value: index.toString()
          }
        }), {name: 'Add'.green, value: '-2'}],
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