/*
 * @Author: 陈祖康
 * @Date: 2021-08-23 13:50:02
 * @LastEditors: 陈祖康
 * @LastEditTime: 2021-09-14 15:21:14
 * @Description: 常见手写题
 * @Props: 
 * @Emit: 
 */

/**
 * 防抖 一段时间内，若连续点了多次，只会触发最后一次
 * @param fn 触发方法
 * @param dely 多少时间后触发
 */

function debounce(fn, dely) {
  let timer
  return function () {
    let self = this
    let args = { ...arguments }
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.call(self, ...args)
    }, dely)
  }
}

/**
 * 节流 一段时间内只会执行最开始的一次
 * @param fn 触发方法
 * @param dely 多少时间内触发一次
 */
function throttle(fn, dely) {
  let pre = Date.now()
  let first = true
  return function () {
    let args = [...arguments]
    let self = this
    let now = Date.now()
    if (first || now - pre > dely) {
      setTimeout(() => {
        fn.call(self, ...args)
        first = false
      }, dely)
    }
  }
}

/**
 * 深拷贝
 * @param obj 深拷贝的对象
 */
function deepClone(obj) {
  if (typeof obj !== 'object') return obj
  let res = Array.isArray(obj) ? [] : {}
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (obj[key] && typeof obj[key] === 'object') {
        // 若当前元素类型为对象时，递归调用
        res[key] = deepClone(obj[key]);
      }
      // 若当前元素类型为基本数据类型
      else {
        res[key] = obj[key];
      }
    }
  }
  return res
}
function deepClone2(obj) {
  if (typeof obj !== 'object' || obj === null) return obj
  let result = obj instanceof Array ? [] : {}
  for (let key in obj) {
    if (obj.hasOwnProperty(obj[key])) {
      result[key] = this.deepClone(obj[key])
    } else {
      return result
    }
  }
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
// 测试用例
let result = deepClone({
  x: 1,
  y: [5, 6, 7],
  z: {
    a: 0,
    b: 1
  }
})
console.log('result', result)
/**
 * 快速排序
 * @param arr 数组
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

/**
 * instanceOf 原理
 * @param 左边需要判断的对象
 * @param 右边判断的类型
 */
function writeInstanceOf(L, R) {
  let left = L.__proto__
  let right = R.prototype
  while (left !== null) {
    if (left === right) return true
    left = left.__proto__
  }
  return false
}

console.log('tt', writeInstanceOf([1], Object))

/**
 * 实现一个new函数
 * @param 传入的实例的构造函数
 */
function myNew(myfn) {
  let obj = {} // 新建一个空对象
  obj.__proto__ = myfn.prototype // 原型继承
  let res = myfn.apply(obj, [...arguments])
  if (typeof res === 'object' || typeof res === 'function') {
    return res
  } else {
    return obj
  }
}

/**
 * 大数相加
 * @param num1 第一个数
 * @param num2 第二个数
 */

function addBig(num1, num2) {
  let str1 = num1.toString()
  let str2 = num2.toString()
  let maxLen = Math.max(str1.length, str2.length) // 找到两者中长度较长的
  str1 = str1.padStart(maxLen, '0') // 补0
  str2 = str2.padStart(maxLen, '0')
  let sum = '' // 两数相加的数
  let bit = 0 // 相加后的同位数
  let ten = 0 // 相加后的十位数
  let res = '' // 相加后的结果
  for (let i = maxLen; i >= 0; i--) {
    sum = parseInt(str1[i]) + parseInt(str2[i]) + bit // 两数相加的和
    ten = Math.floor(bit / 10) // 算出十位的值
    bit = bit % 10 // 算出个位的值
    res = res + bit
  }
  return res
}

/**
 * 扁平化数组
 * @param arr 需要扁平化的数组
 */

function myFlat(arr) {
  arr.reduce((pre, cur) => {
    return pre.concat(Array.isArray(cur) ? myFlat(cur) : cur)
  }, [])
}

