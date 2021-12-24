/*
 * @Author: 陈祖康
 * @Date: 2021-06-18 14:23:52
 * @LastEditors: 陈祖康
 * @LastEditTime: 2021-06-19 16:32:51
 * @Description: 手写一个bind方法
 * @Props: 
 * @Emit: 
 */
/**
 * 总结：1. 改变原函数的 this 指向，即绑定上下文，返回原函数的拷贝
 * 2. 当 绑定函数 被调用时，bind的额外参数将置于实参之前传递给被绑定的方法。
 * 3. 注意，一个 绑定函数 也能使用 new 操作符创建对象,这种行为就像把原函数当成构造器，thisArg 参数无效。也就是 new 操作符修改 this 指向的优先级更高。
 * @param {*} context 
 * @returns 
 */
// bind的实现
// 首先要明白bind函数会创建一个新的函数 当新函数被调用的时候 bind()的第一个参数将作为它运行时的this 
// 之后的一系列参数将在传递的实参前作为它的参数
// bind在调用时会返回一个和之前函数体一猫一样的函数 只是this的指向发生了改变 bind调用时传的参数会同样传给返回的函数
Function.prototype.myBind = function (context = window) {
  let that = this // 保存函数调用
  let args = [...arguments].slice(1) // 从第二个参数开始截取
  return function () {
    that.apply(context, args.concat([...arguments]))
  }
}

let obj = {
  value : 99
}

function bar (name , age) {
  console.log(name, age, this.value)
}

let getBar = bar.myBind(obj, 'czk')
getBar('smile') // czk smile 99
