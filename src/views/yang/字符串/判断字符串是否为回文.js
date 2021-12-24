/*
 * @Author: 陈祖康
 * @Date: 2021-06-23 13:49:50
 * @LastEditors: 陈祖康
 * @LastEditTime: 2021-06-23 13:51:49
 * @Description: 判断字符串是否为回文字符串
 * @Props: 
 * @Emit: 
 */
/**
 * 单词“dad”、“racecar”就是回文
   数字 1001 也是回文
 */

function isPalindrome(word) {
  let s = [];
  for (let i = 0; i < word.length; i++) {
    s.push(word[i]); // 入栈
  }
  let rword = "";
  while (s.length > 0) {
    rword += s.pop(); // 出栈
  }
  if (word === rword) {
    return true;
  }
  else {
    return false;
  }
}
let result = isPalindrome('1001')
console.log(result)