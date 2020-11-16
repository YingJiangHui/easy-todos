const USER_HOME = process.env.HOME || process.env.USERPROFILE
const path = require('path')
const dbPath = path.join(USER_HOME, '.todo')
const fs = require('fs')
const write = (list,path=dbPath) =>
  new Promise((resolve, reject) =>
    fs.writeFile(path, JSON.stringify(list), (error) => error ? reject(error) : resolve())
  )


const read = (path=dbPath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, {flag: 'a+'}, (error1, data) => {
      let list
      if (error1)
        return reject(error1)
      try {
        list = JSON.parse(data)
      } catch (error2) {
        list = []
      }
      resolve(list)
    })
  })

}
const db = {
  write,
  read
}

module.exports = db
