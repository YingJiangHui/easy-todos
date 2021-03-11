const db = require('../db.js')

const clear = () => {
  db.write([])
}

module.exports = clear