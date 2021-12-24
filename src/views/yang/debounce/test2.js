
/*
 * @Author: 陈祖康
 * @Date: 2021-08-06 12:28:10
 * @LastEditors: 陈祖康
 * @LastEditTime: 2021-08-06 14:03:46
 * @Description: 
 * @Props: 
 * @Emit: 
 */
let name = '小明'
console.log('name', name)
let obj = {
  name: '小康'
}
function fn (age) {
  console.log(this.name)
  console.log(age)
}
Function.prototype.myCall = function(context = window) {
  context.fn = this
  let args = [...arguments].slice(1)
  let result = context.fn(...args)
  delete context.fn
  return result
}
console.log('myCall', fn.myCall(obj, 12))

Function.prototype.myApply = function (context = window) {
  context.fn = this
  let args = [...arguments].slice(1)
  let result = context.fn(...args)
  delete context.fn
  return result 
}
fn.myApply(obj, [16])

Function.prototype.myBind = function (context = window) {
  let that = this
  let parentArg = [...arguments].slice(1)
  return function () {
    let args = parentArg.concat([...arguments].slice())
    that.myApply(context, args)
  }
}
fn.myBind(obj, 18)(24)

function debounce (fn, dely) {
  let timer
  let that = this
  return function () {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.call(that)
    }, dely)
  }
}
debounce(fn, 500)

function throtter (fn, dely) {
  let that = this
  let first = true
  let pre = 0
  return function () {
    let now = new Date()
    if (first || now - pre > dely) {
      first = false
      pre = now
      fn.call(that)
    }
  }
}