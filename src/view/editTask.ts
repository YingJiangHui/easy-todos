const inquirer = require("inquirer")

async function editTask () {
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

export default editTask