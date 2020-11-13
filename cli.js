const program = require('commander');
const api = require('./index.js')
const v = require('./package').version
program
  .version(v)
  .option('-x, --xxx', 'xxxxxxx')

program
  .command('add')
  .description('add a task')
  .action((...args)=>{
    const task = args[1].join(' ')
    api.add(task)
  })

program
  .command('clear')
  .description('clear all tasks')
  .action((...args)=>{
    api.clear()
  })
program
  .command('showAll')
  .description('show all task')
  .action((...args)=>{
    api.showAll()
  })

program.parse(process.argv);