/*
 * @Author: 陈祖康
 * @Date: 2021-06-18 13:52:03
 * @LastEditors: 陈祖康
 * @LastEditTime: 2021-06-19 16:09:48
 * @Description: 手写apply方法
 * @Props: 
 * @Emit: 
 */

// apply实现
Function.prototype.myApply = function (context = window) {
  if(typeof this !== 'function') {
    throw new TypeError('error')
  }
  context.fn = this // 保存函数调用
  let result = context.fn(...arguments[1])
  delete context.fn
  return result
}

let obj = {
  value: 100
}

function bar (name, age) {
  console.log(name, age, this.value)
}

bar.myApply(obj, ['czk', 23])
