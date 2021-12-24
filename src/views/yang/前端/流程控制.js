/*
 * @Author: 陈祖康
 * @Date: 2021-07-24 10:26:07
 * @LastEditors: 陈祖康
 * @LastEditTime: 2021-07-24 10:39:11
 * @Description: 流程控制
 * @Props: 
 * @Emit: 
 */
/**
 * 描述
  实现 fizzBuzz 函数，参数 num 与返回值的关系如下：
  1、如果 num 能同时被 3 和 5 整除，返回字符串 fizzbuzz
  2、如果 num 能被 3 整除，返回字符串 fizz
  3、如果 num 能被 5 整除，返回字符串 buzz
  4、如果参数为空或者不是 Number 类型，返回 false
  5、其余情况，返回参数 num
  示例1
  输入：
  15
  复制
  输出：
  fizzbuzz
 */
function fizzBuzz(num) {
  if ((!num && num!==0) || typeof num  !== 'number') return false
  if (num % 3 === 0) {
    if (num % 5 === 0) return 'fizzbuzz'
    return 'fizz'
  }
  if (num % 5 === 0) {
    if (num % 3 === 0) return 'fizzbuzz'
    return 'buzz'
  }
  return num
}
console.log('kk', fizzBuzz(0))

function fizzBuzz2(num) {
    switch(true){
        case num === null || typeof(num) !== "number":
          return false
          break
        case num%3===0&&num%5===0 :
          return "fizzbuzz"
          break
        case num%3===0 :
          return "fizz"
          break
        case num%5===0 :
          return "buzz"
          break
        default:
          return num
    } 
}
console.log('kk', fizzBuzz2(15))