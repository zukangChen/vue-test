/*
 * @Author: 陈祖康
 * @Date: 2021-07-24 17:16:45
 * @LastEditors: 陈祖康
 * @LastEditTime: 2021-07-24 17:40:59
 * @Description:  乘法
 * @Props: 
 * @Emit: 
 */

/**
 * 描述
  求 a 和 b 相乘的值，a 和 b 可能是小数，需要注意结果的精度问题
  示例1
  输入：
  3, 0.0001
  复制
  输出：
  0.0003
 */
function multiply(a, b) {
    return (a * Math.pow(10, myFix(a))) * (b * Math.pow(10, myFix(b))) / Math.pow(10, myFix(a)) / Math.pow(10, myFix(b))
}
function myFix(num) {
  return num.toString().split('.')[1] ? num.toString().split('.')[1].length : 0
}

console.log('smile', multiply(3, 0.1))

// 另一种方法
// 乘法的精度，应为两个数的小数部分长度相加，而不是取两者中较大的为精度

function multiply2(a, b) {
    let strA = ''+a;
    let strB = ''+b;
    let lenA = (strA.indexOf('.')===-1)?0:(strA.length-strA.indexOf('.')-1);
    let lenB = (strB.indexOf('.')===-1)?0:(strB.length-strB.indexOf('.')-1);
    let len = lenA+lenB
    let result = (a*b).toFixed(len);
    return result;
}
console.log('smile', multiply2(3, 0.1))