/*
 * @Author: 陈祖康
 * @Date: 2021-07-23 14:05:33
 * @LastEditors: 陈祖康
 * @LastEditTime: 2021-07-25 10:13:00
 * @Description: 根据包名，在指定空间中创建对象
 * @Props: 
 * @Emit: 
 */
/**
 * 
 * 描述
  根据包名，在指定空间中创建对象
  输入描述：
  namespace({a: {test: 1, b: 2}}, 'a.b.c.d')
  输出描述：
  {a: {test: 1, b: {c: {d: {}}}}}
 */
let cur = 0
function namespace(oNamespace, sPackage) {
  let arr = sPackage.split('.')
  const len = arr.length
  if (cur === len-1) return
  if (oNamespace[arr[cur]] && Object.prototype.toString.call(oNamespace[arr[cur]]) === '[object Object]') {
    cur++
    namespace(oNamespace[arr[cur-1]], sPackage)
  } else {
    oNamespace[arr[cur]] = {}
    cur++
    namespace(oNamespace[arr[cur-1]], sPackage)
  }
  return oNamespace
}
// let smile = namespace({a: {test: 1, b: 2}}, 'a.b.c.d')
console.log('a', namespace({a: {test: 1, b: 2}}, 'a.b.c.d'))

function namespace2(oNamespace, sPackage) {
    let list = sPackage.split('.');
    if (list[0] === '') {
        return;
    }
    if (oNamespace[list[0]] instanceof Object) {
        namespace2(oNamespace[list[0]], list.slice(1).join('.'));
    } else {
        oNamespace[list[0]] = {};
        namespace2(oNamespace[list[0]], list.slice(1).join('.'));
    }
    return oNamespace
}
console.log('b', namespace2({a: {test: 1, b: 2}}, 'a.b.c.d'))

function sum(arr) {
  return arr.reduce((pre, cur) => {
    return cur + pre
  })
}
console.log('cc', sum([1,2,3]))

function remove(arr, item) {
    return arr.filter(sub => sub !== item)
}
console.log('cc', remove([1,2,2,2,3], 2))

function removeWithoutCopy(arr, item) {
  while (arr.findIndex(sub => sub === item) >=0) {
    arr.splice(arr.findIndex(sub => sub === item), 1)
  }
    return arr
}
console.log('c2', removeWithoutCopy([1,2,2,2,3], 2))

function truncate(arr) {
    return arr.filter((item, index) => {
        return index !== (arr.length -1)
    })
}
console.log('c3', truncate([1, 2, 3, 4]))

function insert(arr, item, index) {
  let newArr = [].concat(arr)
  newArr.splice(index,0,item)
  return newArr
}
console.log('c4', insert([1, 2, 3, 4], 'z', 2))

function duplicates(arr) {
    let newArr = []
    arr.forEach((item) => {
      if (!newArr.includes(item)) {
        newArr.push(item)
      }
    })
    newArr.forEach(sub => {
      let indx = arr.findIndex(item => item === sub)
      arr.splice(indx, 1)
    })
    return [...new Set(arr)]
}
console.log('c5', duplicates([1, 2, 4, 4, 3, 3, 1, 5, 3]))

function createModule(str1, str2) {
    return {
        greeting: str1,
        name: str2,
        sayIt: function() {
          return this.greeting + ', ' + this.name
        }
    }
}
let o = createModule('hello', 'matt')
console.log('c6', o.sayIt())

// function valueAtBit(num, bit) {
//     return parseInt(num, 10).toString(2).slice(bit-1,bit-1)
// }
console.log('c7',parseInt(65, 10))
console.log('c7',parseInt(2, 10).toString(2).slice(-1)[0])

function containsRepeatingLetter(str) {
    let result = false
    str.split('').reduce((pre, cur) => {
        console.log('pre', pre, cur)
        if (pre === cur && (/[a-zA-Z]/.test(cur))) result = true
        console.log('result', result)
        return cur
    })
    return result
}
console.log('c8',containsRepeatingLetter('bookkeeping'))

function captureThreeNumbers(str) {
    let arr = str.split('')
    let first = true
    let result = false
    arr.forEach((char, index) => {
        if (first && index+2 <= str.length-1 && (+arr[index+2]) + (+char) === 2 * (+arr[index+1])) {
          first = false
          result = arr[index] + arr[index+1] + arr[index+2]
        }
    })
    return result
}
console.log('c9',captureThreeNumbers('abc123'))