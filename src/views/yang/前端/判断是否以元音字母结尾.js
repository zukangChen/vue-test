/*
 * @Author: 陈祖康
 * @Date: 2021-07-24 18:58:46
 * @LastEditors: 陈祖康
 * @LastEditTime: 2021-07-24 18:59:52
 * @Description: 判断是否以元音字母结尾
 * @Props: 
 * @Emit: 
 */
/**
 * 描述
给定字符串 str，检查其是否以元音字母结尾
1、元音字母包括 a，e，i，o，u，以及对应的大写
2、包含返回 true，否则返回 false
示例1
输入：
'gorilla'
复制
输出：
true

 */
function endsWithVowel(str) {
    let arr = ['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U']
    return arr.includes(str.match(/[a-zA-Z]$/)[0]) ? true : false
}

function endsWithVowel2(str) {
    let arr = ['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U']
    return arr.indexOf(str[str.length -1]) > -1 ? true : false
}
console.log('smile', endsWithVowel('gorilla'))
console.log('smile', endsWithVowel2('gorilla'))
