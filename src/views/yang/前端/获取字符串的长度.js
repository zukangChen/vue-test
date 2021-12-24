/*
 * @Author: 陈祖康
 * @Date: 2021-07-19 16:37:01
 * @LastEditors: 陈祖康
 * @LastEditTime: 2021-07-23 16:21:32
 * @Description: 获取字符串的长度
 * @Props: 
 * @Emit: 
 */
/**
 * 描述
如果第二个参数 bUnicode255For1 === true，则所有字符长度为 1
否则如果字符 Unicode 编码 > 255 则长度为 2
 */

/**
 * 示例
 * 输入：
    'hello world, 牛客', false
    输出：
    17
 */
function strLength(s, bUnicode255For1) {
    let length = 0
    if (bUnicode255For1) {
        length = s.length
    } else {
        for (let i = 0; i < s.length; i++) {
            length += s.charCodeAt(i) > 255 ? 2 : 1
        }
    }
    return length
}
strLength('hello world, 牛客', false)
console.log(strLength('hello world, 牛客', false))