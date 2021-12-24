/*
 * @Author: 陈祖康
 * @Date: 2021-07-10 15:40:18
 * @LastEditors: 陈祖康
 * @LastEditTime: 2021-09-16 15:04:45
 * @Description: 观察者模式(订阅发布者模式)
 * @Props: 
 * @Emit: 
 */

let myEvent = {
  handlers: {},
  // 注册事件
  register: function (type, fn) {
    if (!this.handlers.hasOwnProperty(type)) {
      this.handlers[type] = []
    }
    this.handlers[type].push(fn)
  },
  // 发布事件
  dispatchEvent: function (type, arg) {
    if (this.handlers.hasOwnProperty(type)) {
      this.handlers[type].forEach((handler) => {
        handler(arg)
      })
    }
  },
  remove: function (type, fn) {
    // 没有该key的注册事件直接返回
    if (!this.handlers.hasOwnProperty(type)) return
    if (!fn) {
      // 没有传方法fn则表示清除所有key数组的方法
      this.handlers[type] = []
    } else {
      // 否则清除key数组对应的方法
      this.handlers[type].forEach((item, index) => {
        if (item === fn) {
          console.log(5)
          console.log('删除某一个')
          this.handlers[type].splice(index, 1)
        }
        console.log(6)
      })
    }
  }
}

// let event1 = new myEvent()
let fn1 = function (obj) {
  console.log('fn1', obj)
}
let fn2 = function (obj) {
  console.log('fn2', obj)
}
myEvent.register('smile', (obj) => {
  console.log('订阅了smile', obj)
})
myEvent.register('smile', (obj) => {
  console.log('订阅了smile2', obj)
})
myEvent.register('heart', fn1)
myEvent.register('heart', fn2)
myEvent.dispatchEvent('heart', '11')
myEvent.remove('heart', fn1)
myEvent.dispatchEvent('heart', '22')
// myEvent.dispatchEvent('smile', 'event1')
// myEvent.remove('smile', (obj) => {
//   console.log('订阅了smile', obj)
// })
// myEvent.dispatchEvent('smile', 'event1')