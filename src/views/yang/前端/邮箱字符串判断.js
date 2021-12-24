/*
 * @Author: 陈祖康
 * @Date: 2021-07-22 13:44:59
 * @LastEditors: 陈祖康
 * @LastEditTime: 2021-07-22 16:41:24
 * @Description: 邮箱字符串判断
 * @Props: 
 * @Emit: 
 */
/**
 * 描述
  判断输入是否是正确的邮箱格式
  输入描述：
  邮箱字符串
  输出描述：
  true表示格式正确
 */
function isAvailableEmail(sEmail) {
    return (/^\w+(\.?)\w+@\w+.com/g).test(sEmail)
}
let test = isAvailableEmail('front end@nowcoder.com')
console.log('test', test)