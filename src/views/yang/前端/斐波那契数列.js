/*
 * @Author: 陈祖康
 * @Date: 2021-07-19 16:10:20
 * @LastEditors: 陈祖康
 * @LastEditTime: 2021-07-19 16:14:52
 * @Description: 斐波那契数列
 * @Props: 
 * @Emit: 
 */
/**
 * 描述
用 JavaScript 实现斐波那契数列函数,返回第n个斐波那契数。 f(1) = 1, f(2) = 1 等 f(n) = f(n-1) + f(n-2)
 */

function fibonacci(n) {
    if (n === 1 || n === 2) return 1
    let result
    result = fibonacci(n-1) + fibonacci(n-2)
    return result
}
let test = fibonacci(1)
console.log('test', test)