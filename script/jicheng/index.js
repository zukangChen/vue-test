/*
 * @Author: 陈祖康
 * @Date: 2021-06-13 09:53:27
 * @LastEditors: 陈祖康
 * @LastEditTime: 2021-06-13 18:32:49
 * @Description: js的设计模式
 * @Props: 
 * @Emit: 
 */
// 1. 类继承
// 声明父类
function Father1 () {
  this.superValue = true
}
// 给父类的原型加一个共有方法
Father1.prototype.getSuperValue = function() {
  return this.superValue
}
// 声明子类
function Son1 () {
  this.subValue = true
}
// 把父类实例化的对象赋值给子类的prototype属性，从而继承父类属性
Son1.prototype = new Father1()
// 给子类的原型加一个共有方法
Son1.prototype.getSubValue = function() {
  return this.subValue
}

// 实例化子类
let son1 = new Son1()
console.log(son1.superValue) // true
console.log(son1.subValue) // true
console.log(son1.getSuperValue()) // true
console.log(son1.getSubValue()) // true

// 另外我们还可以使用instanceof来判断某个对象是不是是某个类的实例，或者说某个对象是否继承了某个类
console.log(son1 instanceof Son1) // true
console.log(son1 instanceof Father1) // true
console.log(Son1 instanceof Father1) // false 因为Son1的原型继承了Father1的实例
console.log(Son1 instanceof Father1) // true

// 缺点
/**
 * 1. 由于子类是通过其原型prototype对父类实例化，继承父类的。所以说父类中的共有属性是引用类型，就会在子类中被所有子类共用，因此只要一个实例更改了属性，所有子类的属性值都会被更改，不可控
 * 2. 无法对父类穿参，因而在实例化父类的时候也无法对父类构造函数进行属性初始化
 *  */

console.log('------构造函数式继承--------')

// 函数式继承
// 声明父类
function Father2 (id) {
  this.superValue = 'father2'
  this.id = id
}
Father2.prototype.getSuperValue = function() {
  return this.superValue
}
function Son2 (id) {
  Father2.call(this, id)
  this.subValue = 'son2'
}

let son2 = new Son2(23)
let son2Copy = new Son2(24)
son2Copy.subValue = 26
console.log(son2.superValue) // 'father2'
console.log(son2.subValue) // 'son2'
console.log(son2Copy.subValue) // 26
// console.log(son2.getSuperValue()) // getSuperValue is not a function
// Father2.call(this, id) 子类继承了父类的共有属性，由于这种类型没有涉及到原型，所以父类的原型方法自然不会被子类继承

/**
 * 优点
 * 1. 每个实例都有一份自己的拷贝，所以修改一个实例的值不会影响另外一份实例
 */

console.log('------组合式继承--------')

// 组合式继承（结合前两种模式的优点，弥补其缺陷）

// 声明父类
function Father3(id) {
  this.superValue = 'father3'
  this.id = id
  this.books = ['数学', '语文']
}
Father3.prototype.getSuperValue = function() {
  return this.superValue
}
// 声明子类
function Son3(id) {
  Father3.call(this, id) // 继承父类公共属性
  this.subValue = 'son3' // 子类新增公有属性
}
// 类式继承 子类原型继承父类
Son3.prototype = new Father3()

let son3 = new Son3(23)
let son3Copy = new Son3(33)
son3Copy.books.push('英语')
console.log(son3.books) // [ '数学', '语文' ]
console.log(son3Copy.books) // [ '数学', '语文', '英语' ]
console.log(son3.superValue) // 'father3'
console.log(son3.subValue) // 'son3'
console.log(son3Copy.subValue) // 'son3Copy'
console.log(son3.getSuperValue()) // 'father3'
// son3.__proto__.books.push('理综') // 这样可以修改父类原型的引用

/**
 * 优点
 * 1. 子类实例修改引用类型的属性，不会影响其他实例
 * 2. 子类实例化过程可以传递参数到父类的构造函数
 * 缺点
 * 1. 使用构造函数继承时执行了一遍父类构造函数，而在实现子类原型的类式继承又调用了一遍
 */

console.log('------原型式继承--------')
// 原型式继承 （解决组合式继承多次调用父类构造函数的缺点）

function inheritObject(o) {
  // 声明一个过渡函数对象
  function F () {}
  // 过渡函数对象的原型继承父对象
  F.prototype = o
  return new F() // 返回过渡对象的一个实例，该实例的原型继承了父对象
}
let book = {
  name: 'js book',
  books: [ '数学', '语文' ]
}
let newBook = inheritObject(book)
newBook.name = 'ajax book'
newBook.books.push('英语')

let otherBook = inheritObject(book)
otherBook.name = 'xml book'
otherBook.books.push('理综')

console.log(newBook.name) // 'ajax book'
console.log(newBook.books) // [ '数学', '语文', '英语' , '理综']
console.log(otherBook.name) // 'xml book'
console.log(otherBook.books) // [ '数学', '语文', '英语' , '理综']
console.log(book.name) // 'js book'
console.log(book.books) // [ '数学', '语文', '英语' , '理综']

/**
 * 缺点
 * 跟类式继承一样，父类对象book中的值类型的属性被复制，引用类型的属性被共用，所以引用类型被修改了，其他实例拿到的也是被修改的
 */

console.log('------寄生式继承--------')

// 寄生式继承 其实就是对原型继承的第二次封装
// 声明基对象
let jiBook = {
  name: 'js book',
  books: [ '数学', '语文' ]
}
function createBook (obj) {
  // 通过原型继承方式创建新对象
  let o = new inheritObject(obj)
  // 拓展新对象
  o.getName = function () {
    console.log('name')
  }
  // 返回拓展后的新对象
  return o
}
let smile = createBook(jiBook)
console.log(smile.getName()) // name
console.log(smile.name) // 'js book'
console.log(smile.books) // [ '数学', '语文' ]

/**
 * 其实就是对原型继承的第二次封装,并且对继承的对象进行了拓展，这样新创建的对象不仅有父类的属性和方法还有新添加的属性和方法
 */

console.log('------寄生组合式继承--------')

// 寄生组合式继承

/**
 * 寄生式继承 继承原型
 * 传递参数 subClass 子类
 * 传递参数 superClass 父类
 */
