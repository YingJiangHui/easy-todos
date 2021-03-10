const inquirer = require('inquirer')
const db = require('./../../db')



function searchRemove(list, searchText) {
  const searchList = list.filter((item) => item.title.trim() === searchText.trim())
  const newList = list.filter((item) => item.title.trim() !== searchText.trim())
  return {
    newList,
    searchList,
  }
}
function excludeCheckedList(list, indexList) {
  return list.filter((item, index) => !indexList.includes(index.toString()))
}

const remove = async (searchText) => {
  const list = await db.read()
  if(list.length === 0){
    console.log("No things to do ~")
    return;
  }
  
  if (searchText) {
    const {searchList,newList} = searchRemove(list,searchText)
    if(searchList.length===0){
      console.log('Not find to do ~')
      return;
    }
    inquirer
      .prompt([
        {
          type: 'confirm',
          name: 'choices',
          message: (a) => {
            return "confirm delete to do --> " + searchList.map(item => item.title).join(' | ')
          },
        },
      ])
      .then((answer) => {
        answer.choices && db.write(newList)
      })
    return;
  }
  inquirer
    .prompt([
      {
        type: 'checkbox',
        name: 'select',
        message: 'remove todo/todos ？',
        choices: [...list.map((item, index) => {
          return {
            name: `${index+1}. ${item.title}`,
            value: index.toString()
          }
        })],
      },
    ]).then((answer) => {
    const newList = excludeCheckedList(list,answer.select)
    list.length !== newList && db.write(newList)
  })
}

module.exports = {
  removeList: excludeCheckedList,
  remove, searchRemove
}