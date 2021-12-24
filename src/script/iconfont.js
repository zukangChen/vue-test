/*
 * @Author: 陈祖康
 * @Date: 2021-06-11 14:02:39
 * @LastEditors: 陈祖康
 * @LastEditTime: 2021-06-13 09:52:13
 * @Description: iconfont 脚本文件
 * @Props: 
 * @Emit: 
 */
const fs = require('fs')
const http = require('http')

function getData (path) {
  let opt = {
    hostname: 'at.alicdn.com',
    port: 80,
    method:'GET',
    path: path,
  }
  let req = http.request(opt, (res) => {
    let body = ''
    console.log('response:' + res)
    res.on('data', (data) => {
      body = body + data
      console.log('body', body);
    })
    res.on('end', () => { })
  })
  
  req.end()
}
const cssWebPath = '/t/font_1020343_ytvscnvb0f.css' // 线上web-pro-web地址
// const exportPath = './static/font-class-name.js' // 导出文件路径
// getFontData(cssPath, 'icon')
getData(cssWebPath)