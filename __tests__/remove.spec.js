const {removeList,searchRemove} = require('../function/remove')
const list = [{title:'first'},{title:'second'},{title:'third'}]
const indexList= ['0','2','5']
describe('删除 todo 功能',()=>{
  it('得到删除后的列表',()=>{
    const newList = removeList(list,indexList)
    expect(newList).toEqual([{title:'second'}])
  })
  it('使用下表删除对应的todo',()=>{
    const {newList,searchList} = searchRemove(list,'first')
    expect(newList).toEqual([{title:'second'},{title:'third'}])
    expect(searchList).toEqual([{title:'first'}])
  })
  it('使用下表删除对应的todo（搜索无结果时）',()=>{
    const {newList,searchList} = searchRemove(list,'firs')
    expect(newList).toEqual(list)
    expect(searchList).toEqual([])
  })
})