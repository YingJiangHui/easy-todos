const program = require('commander');
const api = require('./index.ts')
const v = require('./package').version
program
  .version(v)
  .option('-d, --done','done')
  .option('-u, --undone','undone')

program
  .command('add')
  .description('add a todo')
  .action((...args:any[])=>{
    const task = args[1]?.join(' ')
    api.add(task)
  })

program
  .command('remove')
  .description('choose will remove todo')
  .action((...args:any[])=>{
    // 匹配index text进行删除
    api.remove(args[1]?args[1][0]:'')
  })
program
  .command('clear')
  .description('clear all todo')
  .action(()=>{
    api.clear()
  })

program
  .command('show')
  .description('show all todo')
  .action(()=>{
    api.show(program.opts())
  })
program.parse(process.argv);