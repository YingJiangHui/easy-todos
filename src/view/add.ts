const inquirer = require("inquirer")
const colors = require("colors")
const {priorityColorMap} = require("../constant/priorityColor")

const collectTodoInfo = async () => {
  return inquirer.prompt([{
    type: "input",
    name: "title",
    message: "To do title ?"
  }, {
    type: "input",
    name: "description",
    message: "To do description ?"
  }, {
    type: "list", name: "priority", message: "To do priority ?", choices: [
      {name: colors[priorityColorMap["low"]]("Low    ❗"), value: "low"},
      {name: colors[priorityColorMap["medium"]]("Medium ❗❗"), value: "medium"},
      {name: colors[priorityColorMap["high"]]("High   ❗❗❗ "), value: "high"}
    ]
  }, {
    type: "confirm", name: "done", message: "To do done ?"
  }])
}


export default collectTodoInfo
