/*
 * @Author: 陈祖康
 * @Date: 2021-06-19 16:50:54
 * @LastEditors: 陈祖康
 * @LastEditTime: 2021-06-19 17:00:33
 * @Description: 手写一个new方法
 * @Props: 
 * @Emit: 
 */

// 模拟 new 
function myNew (constructor, ...args) {
	// 步骤1：创建新的对象
	let targe = {}
	// 步骤2：将该对象的 __proto__ 与构造函数的 prototype 进行挂钩。
	targe.__proto__ = constructor.prototype

	// 步骤3：将该对象作为构造函数的上下文，执行构造函数，并拿到构造函数的返回值。
	const Res = constructor.apply(targe, args)
	// 构造函数若返回对象，则 return 返回的对象
	if (Res instanceof Object) return Res

	// 否则 return 该对象
	return targe
}


function Person (name) {
	this.name = name || '我是名字'
}
Person.prototype.sayName = function () {
	console.log('sayName >>>', this.name)
}

let p1 = myNew(Person, '老李')
p1.sayName() // sayName >>> 老李