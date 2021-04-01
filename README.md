# Easy Todos
Use Easy-Todos management your task in local computer. Make current plans
## install
```bash
yarn global add easy-todos
```
## usage
```bash
ets --version

ets show                   // show all task
  ets show -u              // show all undone task
  ets show -d              // show all done task
ets remove [searchText]    // remove task / tasks
ets clear                  // clear all task
ets add                    // add task

-----------------------------------------------

// Params
searchText: null | task_name
task_name must is complete
```
