import inquirer from 'inquirer';
import {Todo} from '../custom';

async function confirmRemove (todoList:Todo[]){
  inquirer
  .prompt([
    {
      type: 'confirm',
      name: 'choices',
      message: () => {
        return "confirm delete to do --> " + todoList.map(item => item.title).join(' | ')
      },
    },
  ])
}

export default {confirmRemove}