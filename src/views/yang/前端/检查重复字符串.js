/*
 * @Author: 陈祖康
 * @Date: 2021-07-24 18:39:13
 * @LastEditors: 陈祖康
 * @LastEditTime: 2021-07-25 11:40:15
 * @Description: 检查重复字符串
 * @Props: 
 * @Emit: 
 */
/**
 * 描述
给定字符串 str，检查其是否包含连续重复的字母（a-zA-Z），包含返回 true，否则返回 false
示例1
输入：
'rattler'
复制
输出：
true
 */
function containsRepeatingLetter(str) {
    let result = false
    str.split('').reduce((pre, cur) => {
        if (pre === cur && (/[a-zA-Z]/.test(cur))) result = true
        return cur
    })
    return result
}
console.log('c8',containsRepeatingLetter('bookkeeping'))

// 在正则表达式中，利用()进行分组，使用斜杠加数字表示引用，
// \1就是引用第一个分组，\2就是引用第二个分组。将[a-zA-Z]做为一个分组，
// 然后引用，就可以判断是否有连续重复的字母。
function containsRepeatingLetter2(str) {
  return /([a-zA-Z])\1/.test(str);
}
console.log('c9',containsRepeatingLetter2('bookkeeping'))
