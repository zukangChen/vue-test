/*
 * @Author: 陈祖康
 * @Date: 2021-06-21 10:30:25
 * @LastEditors: 陈祖康
 * @LastEditTime: 2021-09-13 19:28:08
 * @Description: 最长子字符串
 * @Props: 
 * @Emit: 
 */

const { resolve, reject } = require("core-js/fn/promise");

/**
 * 给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。
 * 示例 1:

输入: s = "abcabcbb"
输出: 3 
解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
 * @param {*} s 
 * @returns 
 */
let lengthOfLongestSubstring = function(s) {
    let n = s.length // 字符串长度
    // let left = 0 // 左指针
    let right = 0 // 右指针
    let strSet = new Set() // 存放字符串
    let strMax = 0
    for (let i=0;i<n;i++) {
        while (right < n && !strSet.has(s[right])){
            strSet.add(s[right])
            right = right+1
            console.log('strSet', strSet)
        }
        strMax = Math.max(strMax, right-i)
        strSet.delete(s[i])
    }
    return strMax
};
let result = lengthOfLongestSubstring("bbbbb")
console.log('result', result)


new Promise((resolve) => {
  setTimeout(() => {
    console.log('0')
    resolve(1)
  },1000)
}).then((res)=> {
  setTimeout(() => {
    console.log('1', res)
  },500)
}).then((res) => {
  setTimeout(()=> {
    console.log('2',res)
  })
}).then((res) => {
  console.log('3', res)
}) 
