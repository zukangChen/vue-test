const { setTimeout } = require("core-js")

/*
 * @Author: 陈祖康
 * @Date: 2021-07-20 09:09:47
 * @LastEditors: 陈祖康
 * @LastEditTime: 2021-07-20 09:21:54
 * @Description: promise测试
 * @Props: 
 * @Emit: 
 */
Promise.resolve(12).then((res) => {
  return new Promise((resolve)=> {
    setTimeout(() => {
      console.log('res1', res)
      return resolve(res*2)
    })
  })
}).then((res2)=> {
  console.log('res2', res2)
})