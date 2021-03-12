import {Todo} from '../custom';
const inquirer = require('inquirer')
const colors = require('colors')
const {priorityColorMap,priorityTextMap} = require('../constant/priorityColor')

function print(todo:Todo,index:number){
  const info = `${index+1}.${todo.title}`
  const line = " --------------------------- "
  return todo.done?colors.gray(`${priorityTextMap[todo.priority]} ${info  + line}[ ✔ ]`):`${priorityTextMap[todo.priority][priorityColorMap[todo.priority]]} ${info + line}[ ✘ ]`
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
          name: print(todo,index),
          value: index.toString()
        }
      }),{name: colors.green('✚   Add'), value: '-2'}],
    },
  ])
}
module.exports = showTodoList