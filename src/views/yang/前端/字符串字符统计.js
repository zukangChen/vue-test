/*
 * @Author: 陈祖康
 * @Date: 2021-07-23 10:47:02
 * @LastEditors: 陈祖康
 * @LastEditTime: 2021-07-23 14:06:15
 * @Description: 字符串字符统计
 * @Props: 
 * @Emit: 
 */

/**
 * 描述
  统计字符串中每个字符的出现频率，返回一个 Object，key 为统计字符，value 为出现频率
  1. 不限制 key 的顺序
  2. 输入的字符串参数不会为空
  3. 忽略空白字符
  示例1
  输入：
  'hello world'
  复制
  输出：
  {h: 1, e: 1, l: 3, o: 2, w: 1, r: 1, d: 1}
 */
function count(str) {
  let obj = {}
  for (let char of str.replace(/\s/g, '')) {
    obj[char] = !obj[char] ? 1 : obj[char]+1
  }
  console.log('char', obj)
  return obj
}
let str = 'just for test!!!'
count(str)

function count2(str) {
  let obj = {}
  str.replace(/\s/g, '').split('').forEach(item => {
    obj[item] = obj[item] ? ++obj[item] : 1
  })
  return obj
}
count2(str)