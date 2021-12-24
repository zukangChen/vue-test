/*
 * @Author: 陈祖康
 * @Date: 2021-07-22 09:38:00
 * @LastEditors: 陈祖康
 * @LastEditTime: 2021-07-22 11:06:18
 * @Description: 将字符串转换为驼峰格式
 * @Props: 
 * @Emit: 
 */
/**
 * 描述
  css 中经常有类似 background-image 这种通过 - 连接的字符，通过 javascript 设置样式的时候需要将这种样式转换成 backgroundImage 驼峰格式，请完成此转换功能
  1. 以 - 为分隔符，将第二个起的非空单词首字母转为大写
  2. -webkit-border-image 转换后的结果为 webkitBorderImage
  示例1
  输入：
  'font-size'
  复制
  输出：
  fontSize
 */

function cssStyle2DomStyle(sName) {
  let arr = []
  let toUpper = false
  sName.split('').forEach((str, index) => {
    if (str === '-' && index === 0) return
    if (str === '-') {
      toUpper = true
      return
    }
    if (toUpper) {
      arr.push(str.toUpperCase())
      toUpper = false
    } else {
      arr.push(str)
    }
  })
  console.log(arr.join(''))
}
let sName = 'font-size'
cssStyle2DomStyle(sName)


function cssStyle2DomStyle2(sName) {
  let str = ''
  for(let i =0; i < sName.length; i++) {
    if (sName[i] === '-' && i === 0) {
      continue
    }else if (sName[i] === '-') {
      str += sName[i+1].toUpperCase()
      i++
    }else {
      str += sName[i]
    }
  }
  console.log('str2', str)
  return str
}
cssStyle2DomStyle2(sName)
function cssStyle2DomStyle3(sName) {
  return sName.replace(/^-/, '').replace(/-([a-z])/g, (_, $) => {
    console.log('$1',$)
    return $.toUpperCase()
  });
  // return sName.replace(/^-/, '').replace(/-([a-z])/g, (_, $) => $.toUpperCase());
}
console.log('str3', cssStyle2DomStyle3(sName))
cssStyle2DomStyle3(sName)
