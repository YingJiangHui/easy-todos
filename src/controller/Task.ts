import database from '../model/database';
import {Todo} from '../custom';
import showTask from '../view/showTask';
import askForActionToTask from '../view/askForActionToTask';
import editTask from '../view/editTask';
import collectTodoInfo from '../view/addTask';
import {confirmRemoveTodo,chooseRemoveTodos} from '../view/removeTask';

type Options = {
  done: boolean,undone: boolean
}

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
  
  searchRemove(list: Todo[],searchText: string) {
    const searchList = list.filter((item) => item.title.trim() === searchText.trim());
    const newList = list.filter((item) => item.title.trim() !== searchText.trim());
    return {
      newList,searchList
    };
  }
  
  actionTask(list: Todo[]) {
    async function markAsDone(index: number) {
      list[index].done = true;
      await TaskController.setTask(list);
    }
    
    async function markAsUndone(index: number) {
      list[index].done = false;
      await TaskController.setTask(list);
    }
    
    async function edit(index: number) {
      const answer = await editTask();
      list[index] = {...list[index],...answer};
      await TaskController.setTask(list);
    }
    
    async function remove(index: number) {
      list.splice(index,1);
      await TaskController.setTask(list);
    }
    
    return {
      markAsDone,markAsUndone,edit,remove
    };
  }
  
  

  choiceAction = async(todoList: Todo[],index: number) => {
    const answer = await askForActionToTask(todoList[index]);
    const actionMap = this.actionTask(todoList);
    const action = actionMap[answer.action];
    action?.(index);
  };
  
  clearTask = async() => {
    await TaskController.setTask([]);
  };
  
  showTask = async(opts: Options) => {
    const data: Todo[] = await database.read();
    //通过选项过滤展示的Todo
    const todoList = (opts.done && opts.undone) || (!opts.done && !opts.undone) ? data : opts.done ? data.filter(item => item.done) : data.filter(item => !item.done);
    const answer = await showTask(todoList);
    const index = parseInt(answer.index);
    if (index >= 0) {
      await this.choiceAction(todoList,index);
    } else if (index === -2) {
      await this.addTask();
    }
  };
  
  addTask = async(title?: string) => {
    const todoInfo = title ? {title,done: false,description: '',priority: 'medium'} : await collectTodoInfo();
    if (!todoInfo) return;
    const list = await database.read();
    list.push(todoInfo);
    await TaskController.setTask(list);
  };
  
  removeTask = async(searchText: string) => {
    const todoList = await TaskController.getTasks();
    if (todoList.length === 0) {
      console.log('No things to do ~');
      return;
    }
    if (searchText) {
      const {searchList,newList} = this.searchRemove(todoList,searchText);
      if (searchList.length === 0) {
        console.log('Not find to do ~');
        return;
      }
      const answer = await confirmRemoveTodo(searchList);
      answer.choices && await database.write(newList);
      return;
    }
    const answer = await chooseRemoveTodos(todoList);
    
    await TaskController.setTask(todoList.filter((_,index) => !answer.select.includes(index.toString())));
  };
}

export default TaskController;