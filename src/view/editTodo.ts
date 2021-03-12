const inquirer = require("inquirer")

async function editTodo () {
  return inquirer.prompt([{
    type: "input",
    name: "title",
    message: "To do title ?",
  }, {
    type: "input",
    name: "description",
    message: "To do description ?",
  }])
}

export default editTodo