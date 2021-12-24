/*
 * @Author: 陈祖康
 * @Date: 2021-06-18 11:28:27
 * @LastEditors: 陈祖康
 * @LastEditTime: 2021-06-20 11:18:15
 * @Description: 手写call函数
 * @Props: 
 * @Emit: 
 */

/**
 * call 方法其实就是改变this作用域，若不穿则默认是全局作用域。
 * 1. 若我们第一个参数传了一个obj对象
 * 2. call方法会给obj对象添加一个方法指向该函数
 * 3. [...arguments].slice(1)从第二个参数截取得到剩下的参数args(因为第一个参数是传入的obj对象)
 * 4. let result = context.fn(...args) // 拿到执行结果
 * 5. 删除之前在obj对象添加的方法
 * 6. 返回执行结果result
 * 总结： 其实就是在传入的那个obj对象里添加一个function，然后在该对象内执行该方法并返回出执行结果
 * @param {*} context 
 * @returns 
 * 1. 将函数设为对象的属性
 * 2. 执行&删除这个函数
 * 3. 指定 this到函数并传入给定参数执行函数
 * 4. 如果不传入参数，默认指向为 window
 */

// call的实现
Function.prototype.callSpecial = function(context = window) {
  if(typeof this !== 'function') {
    throw new TypeError('error')
  }
  context.fn = this  //保存函数调用者
  let args = [...arguments].slice(1)
  let result = context.fn(...args) // 拿到执行结果
  delete context.fn // 用完删除
  return result
}
let foo = {
    value: 1
}
function bar (name, age) {
    console.log(name, age, this.value)
}
bar.callSpecial(foo, 'blcak', '19') // black 19 1
