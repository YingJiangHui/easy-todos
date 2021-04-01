const inquirer = require("inquirer")
const colors = require("colors")
import {priorityColorMap,priorityTextMap,PriorityKey}  from "../constant/priorityColor"

const collectTodoInfo = async () => {
  const taskPriorityList = (Object.keys(priorityColorMap) as PriorityKey[]).map((key)=>({name:colors[priorityColorMap[key]](priorityTextMap[key]+" "+key),value:key}))
  return inquirer.prompt([{
    type: "input",
    name: "title",
    message: "To do title ?"
  }, {
    type: "input",
    name: "description",
    message: "To do description ?"
  }, {
    type: "list", name: "priority", message: "To do priority ?", choices: taskPriorityList
  }, {
    type: "confirm", name: "done", message: "To do done ?"
  }])
}


export default collectTodoInfo
