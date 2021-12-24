/*
 * @Author: 陈祖康
 * @Date: 2021-07-15 21:16:57
 * @LastEditors: 陈祖康
 * @LastEditTime: 2021-07-15 23:21:43
 * @Description: 修改this指向
 * @Props: 
 * @Emit: 
 */

/**
 * 描述
封装函数 f，使 f 的 this 指向指定的对象
 */

function bindThis(f, oTarget) {
    let parentArg = [...arguments].slice(2)
    return function () {
      let result = f.apply(oTarget, [...parentArg, ...arguments])
      return result
    }
}
let test = function (a,b) {
  return this.test + a + b
}
let r = bindThis(test, {test: 2})(2,3)
console.log('r', r)

Array.prototype.uniq = function () {
  let arr = []
      this.forEach(item => {
        if (arr.indexOf(item) === -1) {
          arr.push(item)
        }
      })
  return arr
    // return [...new Set(this)]
    // return [...new Set(...arguments)]
}

// let a = Array.prototype.uniq([false, true, undefined, null, NaN, 0, 1, {}, {}, 'a', 'a', NaN])
// console.log('a', a)
let b = [true, false, null, undefined, NaN, 0, 1, {}, {}, 'a', 'a', NaN].uniq()
console.log('b', b)
