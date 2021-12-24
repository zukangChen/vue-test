/*
 * @Author: 陈祖康
 * @Date: 2021-07-14 09:30:39
 * @LastEditors: 陈祖康
 * @LastEditTime: 2021-07-22 10:14:54
 * @Description: 获取 url 参数
 * @Props: 
 * @Emit: 
 */

/**
 * 描述
   获取 url 中的参数
1. 指定参数名称，返回该参数的值 或者 空字符串
2. 不指定参数名称，返回全部的参数对象 或者 {}
3. 如果存在多个同名参数，则返回数组
4. 不支持URLSearchParams方法
示例1
输入：
http://www.nowcoder.com?key=1&key=2&key=3&test=4#hehe key
输出：
[1, 2, 3]
 */
let sUrl = 'http://www.nowcoder.com?key=1&key=2&key=3&test=4#hehe'
function getUrlParam(sUrl, sKey) {
    if (!sKey) {
      let arr = sUrl.match(/[\\?|&]+\w{3}/g) 
      console.log(arr)
    }
}


// 方法一: 有限状态机
let arr = []
let str = ''
function match (string) {
  let state = start // 初始状态
  for(let c of string) {
    state = state(c)
  }
  return state === 'end' // 当为'end'时候结束
}

// 开始状态
function start(c) {
  if(c === '?') {  // 如果找到字符'?'则进入foundA状态
    return foundA;   
  }else {
    return start;
  }
}
function foundA (c) {
  if (c === '&' || c === '#') {
    arr.push(str)
    str= ''
    return foundA;
  } else {
    str+= c
    return foundA
  }
}
getUrlParam(sUrl)
let smile = match (sUrl)
console.log(smile, arr)

// 方法二: 数组方法
function urlParam(sUrl, sKey) {
  if (!sUrl) return []
  let startIndex = sUrl.indexOf('?')
  let lastIndex = sUrl.indexOf('#')
  let arr = sUrl.slice(startIndex+1, lastIndex).split('&')
  let result = []
  if (!sKey) {
    result = arr.map(item => {
      return item.split('=')[1]
    })
    console.log('方法二', result)
    return result
  } else {
    arr.forEach(item => {
      if (item.split('=')[0] === sKey) {
        result.push(item.split('=')[1])
      }
    })
    console.log('方法二oo', result)
    if (result.length < 2) {
      if (result.length <0) return ''
      console.log('zifuc', result[0])
      return result[0]
    }
    return result
  }
}

// 方法三： 别人的数组方法
function getUrlParamOther(sUrl, sKey) {
let paramArr = sUrl.split('?')[1].split('#')[0].split('&'); // 取出每个参数的键值对放入数组
const obj = {};
paramArr.forEach(element => {
const [key, value] = element.split('=');  // 取出数组中每一项的键与值
if(obj[key] === void 0){   // 表示第一次遍历这个元素，直接添加到对象上面
obj[key]=value
} else{
obj[key]=[].concat(obj[key],value); // 表示不是第一次遍历说明这个键已有，通过数组存起来。
}});
return sKey===void 0? obj:obj[sKey]||''   // 如果该方法为一个参数，则返回对象。
//如果为两个参数，sKey存在，则返回值或数组，否则返回空字符。
}

urlParam(sUrl)
urlParam(sUrl, 'key')
getUrlParamOther(sUrl, 'key')
let test = 'http://www.nowcoder.com?key=1&key=2&key=3&key=4&test=4#hehe'
let a = urlParam(test, 'key')
console.log('sha', a.join('') === '1234')