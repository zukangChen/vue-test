/*
 * @Author: 陈祖康
 * @Date: 2021-06-20 11:24:19
 * @LastEditors: 陈祖康
 * @LastEditTime: 2021-07-03 15:53:13
 * @Description: 箭头函数与普通函数的区别
 * @Props: 
 * @Emit: 
 */
// 1. 箭头函数自己本身是没有this的，它的this是指向父级作用域的执行上下文（this）
// 2. 箭头函数类似于匿名函数，它不能当作构造函数去new一个实例，因为它本身没有this，根本无法给这个实例添加相应的属性和方法
// 3. 箭头函数无法使用call apply bind去改变它的this指向，它的this指向一直绑定与父级的作用域
// 4. 箭头函数没有argument类数组
// 5. 箭头函数也没有prototype原型属性

let obj = {
	name:'zs',
	fn:function(age, sex){
    console.log(this, age, sex)
  }
}
let obj2 = {
  name: 'smile'
}
// 手写call
Function.prototype.myCall = function (context = window) {
  context.fn = this
  let args = [...arguments].slice(1)
  let result = context.fn(...args)
  delete context.fn
  return result
}
obj.fn()
obj.fn.myCall(obj2, 18 , '男')

// 手写apply
Function.prototype.myApply = function (context = window) {
  context.fn = this
  let args = [...arguments][1]
  let result = context.fn(...args)
  delete context.fn
  return result
}
obj.fn.myApply(obj2, [23, '男'])

// bind方法是返回一个函数
Function.prototype.myBind = function (context=window) {
  let that = this
  let parentArgs = [...arguments].slice(1)
  return function() {
    let args = parentArgs.concat([...arguments])
    let result = that.myApply(context, args)
    return result
  }
}
obj.fn.myBind(obj2, 26 )('男')

// 手写new
function myNew (fn, ...args) {
  let obj = {}
  obj.__proto__ = fn.prototype
  let res = fn.call(obj, ...args)
  if (typeof(res) === 'object' || typeof(res) === 'function') {
    return res
  } else {
    return obj
  }
}
function Person (name) {
	this.name = name || '我是名字'
}
Person.prototype.sayName = function () {
	console.log('sayName >>>', this.name)
}

let p1 = myNew(Person, '老李')
p1.sayName() // sayName >>> 老李
// console.log('p1',p1)

// 组合继承
function parent (name) {
  this.name = name
}
parent.prototype.sayName = function() {
  console.log('p', this.name)
}
function son (name, age) {
  parent.call(this, name)
  this.age = age
}
son.prototype = new parent()
let s1 = new son('儿子', 18)
console.log('son', s1)
s1.sayName()

// 寄生组合继承
function created (fn) {
  let a = function(){}
  a.prototype = fn.prototype
  return new a()
}
function person (name) {
  this.name = name
}
person.prototype.getName = function () {
  console.log('person', this.name)
}
function smile (name, age) {
  person.call(this, name)
  this.age = age
}
smile.prototype = created(person)
smile.prototype.constructor = smile
let h1 = new smile()
console.log(h1)