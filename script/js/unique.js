/*
 * @Author: 陈祖康
 * @Date: 2021-06-21 15:02:52
 * @LastEditors: 陈祖康
 * @LastEditTime: 2021-06-21 16:11:03
 * @Description: 数组去重
 * @Props: 
 * @Emit: 
 */

// 使用Set去除数组重复项
let arr = [2,5,6,8,2,5,9]
function unique (arr) {
  return [...new Set(arr)]
}

console.log('1.', unique(arr))

// foreach + includes
function unique2 (arr) {
  let result = []
  arr.forEach(item => {
    !result.includes(item) && result.push(item)
  })
  return result
}
console.log('2.', unique2(arr))
// foreach + indexOf
function unique3 (arr) {
  let result = []
  arr.forEach(item => {
    result.indexOf(item) === -1 && result.push(item)
  })
  return result
}
console.log('3.', unique3(arr))

// filter + indexOf
function unique4 (arr) {
  return arr.filter((item, index) => {
    return arr.indexOf(item) === index
  })
}
console.log('4.', unique4(arr))

// reduce + includes
function unique5 (arr) {
  return arr.reduce((pre,current) => {
    if (!pre.includes(current)) {
      pre.push(current)
    }
    return pre
  },[])
}
console.log('5.', unique5(arr))

// map + includes
function unique6 (arr) {
  let result = []
  arr.map((item) => {
    !result.includes(item) && result.push(item)
  })
  return result
}
console.log('6.', unique6(arr))
