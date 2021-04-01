import {Todo} from '../custom';
import {priorityColorMap,priorityTextMap} from '../constant/priorityColor'

const inquirer = require('inquirer')
const colors = require('colors')

function print(todo:Todo,index:number){
  const info = `${index+1}.${todo.title}`
  const line = " --------------------------- "
  return todo.done?colors.gray(`${priorityTextMap[todo.priority]} ${info  + line}[ ✔ ]`):`${colors[priorityColorMap[todo.priority]](priorityTextMap[todo.priority])} ${info + line}[ ✘ ]`
}

const showTask = async (todoList:Todo[]) => {
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
      }),{name: colors.green('✚   Todo'), value: '-2'}],
    },
  ])
}
export default showTask