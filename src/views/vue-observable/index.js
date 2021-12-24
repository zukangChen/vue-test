/*
 * @Author: 陈祖康
 * @Date: 2020-07-30 20:04:57
 * @LastEditors: 陈祖康
 * @LastEditTime: 2020-07-30 20:04:57
 * @Description: test创建一个vue实例
 * @Props: 
 * @Emit: 
 */ 
import Vue from 'vue'
let vm = new Vue()
const state = vm.observable({ count: 0 })

const Demo = {
  render(h) {
    return h('button', {
      on: { click: () => { state.count++ }}
    }, `count is: ${state.count}`)
  }
}
export default Demo