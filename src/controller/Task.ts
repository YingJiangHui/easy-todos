import database from '../model/database';
import {Todo} from '../custom';
import showTodoList from '../view/showTodoList';
import askForAction from '../view/askForAction';
import editTodo from '../view/editTodo';
import collectTodoInfo from '../view/add';
import {confirmRemoveTodo,chooseRemoveTodos} from '../view/remove';

type Options = {
  done: boolean,undone: boolean
}

function searchRemove(list: Todo[],searchText: string) {
  const searchList = list.filter((item) => item.title.trim() === searchText.trim());
  const newList = list.filter((item) => item.title.trim() !== searchText.trim());
  return {
    newList,searchList
  };
}

async function markAsDone(list: Todo[],index: number) {
  list[index].done = true;
  await TaskController.setTask(list);
}

async function markAsUndone(list: Todo[],index: number) {
  list[index].done = false;
  await TaskController.setTask(list);
}

async function edit(list: Todo[],index: number) {
  const answer = await editTodo();
  list[index] = {...list[index],...answer};
  await TaskController.setTask(list);
}

async function remove(list: Todo[],index: number) {
  list.splice(index,1);
  await TaskController.setTask(list);
}

const actionMap = {
  markAsDone,markAsUndone,edit,remove
};

class TaskController {
  static async getTasks() {
    return database.read();
  }
  
  static async getTask(index: number) {
    const todoList = await TaskController.getTasks();
    return todoList[index];
  }
  
  static async setTask(todos: Todo[]) {
    await database.write(todos);
  }
  
  clear=async ()=> {
    await database.write([]);
  }
  
  show=async (opts: Options) =>{
    const data: Todo[] = await database.read();
    //通过选项过滤展示的Todo
    const todoList = (opts.done && opts.undone) || (!opts.done && !opts.undone) ? data : opts.done ? data.filter(item => item.done) : data.filter(item => !item.done);
    const answer = await showTodoList(todoList);
    const index = parseInt(answer.index);
    if (index >= 0) {
      await this.choiceAction(todoList,index);
    } else if (index === -2) {
      await this.add();
    }
  }
  
  choiceAction=async(todoList: Todo[],index: number)=> {
    const answer = await askForAction(todoList[index]);
    const action = actionMap[answer.action];
    action?.(todoList,index);
  }
  
  add = async(title?: string)=> {
    const todoInfo = title ? {title,done: false,description: '',priority: 'medium'} : await collectTodoInfo();
    if (!todoInfo) return;
    //读取文件
    const list = await database.read();
    // //添加todo
    list.push(todoInfo);
    // //写入文件
    await TaskController.setTask(list);
  }
  
  remove = async(searchText:string)=> {
    const todoList = await TaskController.getTasks();
    if (todoList.length === 0) {
      console.log('No things to do ~');
      return;
    }
    if (searchText) {
      const {searchList,newList} = searchRemove(todoList,searchText);
      if (searchList.length === 0) {
        console.log('Not find to do ~');
        return;
      }
      const answer = await confirmRemoveTodo(searchList);
      answer.choices && database.write(newList);
      return;
    }
    const answer = await chooseRemoveTodos(todoList);
    
    await TaskController.setTask(
      todoList.filter((_, index) => !answer.select.includes(index.toString()))
    )
  }
}

export default TaskController;