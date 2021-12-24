/*
 * @Author: 陈祖康
 * @Date: 2021-07-25 18:07:36
 * @LastEditors: 陈祖康
 * @LastEditTime: 2021-07-28 09:34:03
 * @Description: 10. 正则表达式匹配
 * @Props: 
 * @Emit: 
 */
/**
 * 给你一个字符串 s 和一个字符规律 p，请你来实现一个支持 '.' 和 '*'的正则表达式匹配。

'.' 匹配任意单个字符
'*' 匹配零个或多个前面的那一个元素
所谓匹配，是要涵盖 整个 字符串 s的，而不是部分字符串。

 
示例 1：

输入：s = "aa" p = "a"
输出：false
解释："a" 无法匹配 "aa" 整个字符串。
示例 2:

输入：s = "aa" p = "a*"
输出：true
解释：因为 '*' 代表可以匹配零个或多个前面的那一个元素, 在这里前面的元素就是 'a'。因此，字符串 "aa" 可被视为 'a' 重复了一次。
示例 3：

输入：s = "ab" p = ".*"
输出：true
解释：".*" 表示可匹配零个或多个（'*'）任意字符（'.'）。
示例 4：

输入：s = "aab" p = "c*a*b"
输出：true
解释：因为 '*' 表示零个或多个，这里 'c' 为 0 个, 'a' 被重复一次。因此可以匹配字符串 "aab"。
示例 5：

输入：s = "mississippi" p = "mis*is*p*."
输出：false
 

提示：

0 <= s.length <= 20
0 <= p.length <= 30
s 可能为空，且只包含从 a-z 的小写字母。
p 可能为空，且只包含从 a-z 的小写字母，以及字符 . 和 *。
保证每次出现字符 * 时，前面都匹配到有效的字符

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/regular-expression-matching
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
let s = "aa" 
let p= "a"
let isMatch = function(s, p) {
  let re =new RegExp( '^' + p + '$' ,"gim")
  return (re).test(s)
};
console.log('smile', isMatch(s,p))

function foo () {
  return new Promise((resolve) => {
    console.log('1')
    resolve('czk')
  })
}
foo().then((res) => {
  console.log('2', res)
  return new Promise(() => {
    console.log('3')
    // resolve('lalala')
  })
}).then((res) => {
  console.log('res',res)
})

let temp1 = 'temp1', temp2 ="temp2", temp3="temp3"
function *bar() {
  temp1 = yield 2
  temp2 = yield 3
  temp3 = yield 4
}
let it = bar()
// it.next()
console.log('it', it.next())
console.log('temp1', temp1)
console.log('temp2', temp2)
console.log('temp3', temp3)
it.next()
console.log('temp1', temp1)
console.log('temp2', temp2)
console.log('temp3', temp3)