#!/usr/bin/env node

import TaskController from './controller/Task';

const program = require('commander');
const v = require('../package').version
const taskController = new TaskController()

const {addTask,removeTask,clearTask,showTask} = taskController
program
.version(v)
  .option('-d, --done','Filter out done todos')
  .option('-u, --undone','Filter out undone todos')
program
.command('add')
.description('add a todo')
.action(async (...args:any[])=>{
  const task = args[1]?.join(' ')
  await addTask(task)
})

program
.command('remove')
.description('choose will remove todo(s)')
.action(async(...args:any[])=>{
  // 匹配index text进行删除
  await removeTask(args[1]?args[1][0]:'')
})
program
.command('clear')
.description('clear all todos')
.action(async ()=>{
  await clearTask()
})

program
.command('show')
  .option('-d, --done','Filter out done todos')
  .option('-u, --undone','Filter out undone todos')
.description('show all todos')
.action(async ()=>{
  await showTask(program.opts())
})

program.parse(process.argv);