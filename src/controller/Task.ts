import db from '../db'
import {Todo} from '../custom';

class TaskController{
  async getTasks(){
    return db.read()
  }
  
  async getTask(index: number){
    const todoList = await this.getTasks()
    return todoList[index]
  }
  
  async setTask(todos:Todo[]){
    await db.write(todos)
  }
  
}

export default TaskController