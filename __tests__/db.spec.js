const db = require('../src/model/database')
const fs = require('fs')
jest.mock('fs')

describe('db', () => {
  it('can read', async () => {
    const data = [{title:'吃饭',done:false}]
    await fs.setReadFileMock('/xxx',null,JSON.stringify(data))
    const list = await database.read('/xxx')
    expect(list).toStrictEqual(data)
  })
  it('can write', async () => {
    let fakeFile
    fs.setWriteFileMock('/yyy', (path, data, callback) => {
      fakeFile = data
      callback(null)
    })
    const list = [{title: '见欧阳娜娜', done: true}, {title: '见迪丽热巴', done: true}]
    await database.write(list, '/yyy')
    expect(fakeFile).toBe(JSON.stringify(list))
  })
})