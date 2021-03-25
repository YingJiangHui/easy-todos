#!/usr/bin/env node

import TaskController from './controller/Task';

const program = require('commander');
const v = require('../package').version
const taskController = new TaskController()

const {add,remove,clear,show} = taskController
program
.version(v)
.option('-d, --done','done')
.option('-u, --undone','undone')

program
.command('add')
.description('add a todo')
.action(async (...args:any[])=>{
  const task = args[1]?.join(' ')
  await add(task)
})

program
.command('remove')
.description('choose will remove todo')
.action(async(...args:any[])=>{
  // 匹配index text进行删除
  await remove(args[1]?args[1][0]:'')
})
program
.command('clear')
.description('clear all todo')
.action(async ()=>{
  await clear()
})

program
.command('show')
.description('show all todo')
.action(async ()=>{
  await show(program.opts())
})

program.parse(process.argv);