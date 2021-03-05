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
  .command('remove')
  .description('choose will remove todo')
  .action((...args)=>{
    // 匹配index text进行删除
    api.remove(args[1]?args[1][0]:'')
  })
program
  .command('clear')
  .description('clear all tasks')
  .action((...args)=>{
    api.clear()
  })
program
  .command('show')
  .description('show all task')
  .action((...args)=>{
    api.show()
  })

program.parse(process.argv);