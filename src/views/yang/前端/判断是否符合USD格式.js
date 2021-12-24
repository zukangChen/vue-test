/*
 * @Author: 陈祖康
 * @Date: 2021-07-25 10:48:29
 * @LastEditors: 陈祖康
 * @LastEditTime: 2021-07-25 11:33:16
 * @Description: 判断是否符合 USD 格式
 * @Props: 
 * @Emit: 
 */
/**
 * 描述
  给定字符串 str，检查其是否符合美元书写格式
  1、以 $ 开始
  2、整数部分，从个位起，满 3 个数字用 , 分隔
  3、如果为小数，则小数部分长度为 2
  4、正确的格式如：$1,023,032.03 或者 $2.03，错误的格式如：$3,432,12.12 或者 $34,344.3
  示例1
  输入：
  '$20,933,209.93'
  复制
  输出：
  true
 */
function isUSD(str) {
    let arr = str.split('.')
    if (arr[1]) {
        if (arr[1].length === 2) {
            if (arr[0].split('').shift() !== '$') {
                return false
            }else {
                let arr2 = arr[0].split('')
                arr2.shift()
                return test(arr2.reverse())
            }
        } else {
            return false
        }
    }else {
        if (arr[0].split('').shift() !== '$') {
                return false
            }else {
                let arr2 = arr[0].split('')
                arr2.shift()
                return test(arr2.reverse())
            }
    }
}
function test (arr) {
    let result = true
    console.log('arr', arr)
    for (let i=0, cur = 1 ; i <=(arr.length-2); i++, cur++) {
        if ((cur) % 3 === 0 && (arr[i+1] !== ',' || (arr[i+1] === ',' && i+1 === arr.length-1))) {
          console.log('i',i)
            result = false
        } else if(cur % 3 === 0){
          console.log('i2',i)
          i = i+1
        }
    }
    return result
}
console.log('smile', isUSD('$20,933,209.93'))

function isUSD2(str) {
  return /^(\$)\d{1,3}(,\d{3})*(\.\d{2})?$/.test(str)
}
console.log('smile', isUSD2('$20,933,209.93'))