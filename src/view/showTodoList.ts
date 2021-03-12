const inquirer = require('inquirer')
const colors = require('colors')
const {priorityMap,priorityMapColor} = require('./add')

function print(todo:Todo){
  const info = `${todo.id}.${todo.title}`
  const line = " --------------------------- "
  return todo.done?colors.gray(`${priorityMap[todo.priority]} ${info  + line}[ ✔ ]`):`${priorityMap[todo.priority][priorityMapColor[todo.priority]]} ${info + line}[ ✘ ]`
}

const showTodoList = async (todoList:Todo[]) => {
  return inquirer
  .prompt([
    {
      type: 'list',
      name: 'index',
      message: 'Select action',
      choices: [ ...todoList.map((todo, index) => {
        return {
          name: print(todo),
          value: index.toString()
        }
      }),{name: colors.green('✚   Add'), value: '-2'}],
    },
  ])
}

export default showTodoList