import {Todo} from './custom';
import ErrnoException = NodeJS.ErrnoException;

const USER_HOME = process.env.HOME || process.env.USERPROFILE
const path = require('path')
const dbPath = path.join(USER_HOME, '.todo')
const fs = require('fs')
const write = (list:Todo[],path=dbPath) =>
  new Promise((resolve, reject) =>
    fs.writeFile(path, JSON.stringify(list), (error:ErrnoException) => error ? reject(error) : resolve(null))
  )


const read = (path=dbPath):Promise<Todo[]> => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, {flag: 'a+'}, (error:ErrnoException, data:Buffer) => {
      let list
      if (error)
        return reject(error)
      try {
        list = JSON.parse(data.toString())
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

export default db
