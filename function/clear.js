const db = require('../src/db.ts')

const clear = () => {
  db.write([])
}

module.exports = clear