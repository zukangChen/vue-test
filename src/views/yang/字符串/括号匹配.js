/*
 * @Author: 陈祖康
 * @Date: 2021-06-23 14:17:19
 * @LastEditors: 陈祖康
 * @LastEditTime: 2021-06-23 19:23:41
 * @Description: 括号匹配
 * @Props: 
 * @Emit: 
 */

/**
 * 
 * @param {判断字符串中的{}、[]、()三种括号是否匹配，需要考虑嵌套的情况。} braces 
 * @returns 
 * validBraces("(){}[]")     // true 
    validBraces("(}")         // false 
    validBraces("[(])")       // false 
    validBraces("([{}])")     // true 
 */
function validBraces(braces){
  let leftBraReg = /[\(\{\[]/, 
    // 栈
      stack = [],
      bracket, rightBracket
  braces = braces.split('')
  for(bracket of braces) {
    if(leftBraReg.test(bracket)) {
      stack.push(bracket)
    }
    else {
      switch (bracket) {
          case ')':
          rightBracket = stack.pop()
          if(rightBracket !=='(') {
              return false
          }
          break
        case ']':
          rightBracket = stack.pop()
          if(rightBracket !=='[') {
              return false
          }
          break
        case '}':
          rightBracket = stack.pop()
          if(rightBracket !=='{') {
              return false
          }
          break
      }
    }
  }
  return stack.length === 0 ? true : false
}
let result = validBraces("([{}])")
console.log(result)

// https://segmentfault.com/a/1190000007173074