/*
 * @Author: 陈祖康
 * @Date: 2021-09-13 16:29:26
 * @LastEditors: 陈祖康
 * @LastEditTime: 2021-09-22 09:43:16
 * @Description: 
 * @Props: 
 * @Emit: 
 */
function quickSort(arr) {
  if (arr.length < 2) return arr
  let mid = Math.floor(arr.length / 2)
  let midVal = arr[mid]
  let left = []
  let right = []
  arr.splice(mid, 1)
  arr.forEach((item) => {
    if (item < midVal) {
      left.push(item)
    } else {
      right.push(item)
    }
  })
  return [].concat(quickSort(left), midVal, quickSort(right))
}
let arr = [2, 21, 3, 1, 5, 22]
let res = quickSort(arr)
console.log('res', res)

function deepClone2(obj) {
  if (typeof obj !== 'object' || obj === null) return obj
  let result = obj instanceof Array ? [] : {}
  for (let key in obj) {
    let a = obj.hasOwnProperty(obj[key])
    console.log(a)
    if (obj.hasOwnProperty(obj[key])) {
      result[key] = this.deepClone(obj[key])
    } else {
      result[key] = obj[key]
    }
  }
  return result
}
let result2 = deepClone2({
  x: 1,
  y: [5, 6, 7],
  z: {
    a: 0,
    b: 1
  }
})
console.log('result2', result2)
console.log('end')

let obj = {
  name: 'zs',
  fn: function (age, sex) {
    console.log(this, age, sex)
  }
}
let obj2 = {
  name: 'smile'
}
// 手写call
Function.prototype.myCall = function (context = window) {
  context.fn = this
  // console.log(arguments)
  let args = [...arguments].slice(1)
  let result = context.fn(...args)
  delete context.fn
  return result
}
obj.fn()
obj.fn.myCall(obj2, 18, '男')

// 手写apply
Function.prototype.myApply = function (context = window) {
  context.fn = this
  let args = [...arguments][1]
  let result = context.fn(...args)
  delete context.fn
  return result
}
obj.fn.myApply(obj2, [23, '男'])
function att() { }
console.log(att)
