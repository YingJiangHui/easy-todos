export type Priority = 'low'|'medium'|'high'

export type Todo = {
  id:number,title: string,description: string,done: boolean,priority: Priority,
}

