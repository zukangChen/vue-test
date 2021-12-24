<!--
 * @Author: 陈祖康
 * @Date: 2020-07-30 16:14:32
 * @LastEditors: 陈祖康
 * @LastEditTime: 2020-08-01 20:14:16
 * @Description: 1. observable让一个对象可响应。Vue 内部会用它来处理 data 函数返回的对象。
                    返回的对象可以直接用于渲染函数和计算属性内，并且会在发生变更时触发相应的更新。
                    也可以作为最小化的跨组件状态存储器，用于简单的场景：
                2. render()渲染函数，这里写的是一个简单的函数式组件
 * @Props: 
 * @Emit: 
--> 
<template>
  <div class="obserable" ref="obser">
    smile
    <my-component :message="msg"></my-component>
    <my-div :message="msg">
    </my-div>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  data () {
    return {
      see: '点我看看呀',
      msg: 'come on'
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      let that = this
      const state = Vue.observable({ count: 0 })
        const Demo = {
          
          render(h) {
            return h('button', {
              on: { click: () => { state.count++ }}
            }, `count is: ${state.count}`)
          }
        }
        const myDiv = {
          props:['message'],
          render(h) {
            return h (
              'div',//一个html标签名// {String | Object | Function}
                    // 一个 HTML 标签名、组件选项对象，或者
                    // resolve 了上述任何一种的一个 async 函数。必填项。
              { //一些标签的属性
                props: {
                  myProp: 'bar'
                },
                attrs: {
                  id: 'foo'
                },
                style: {
                  color: 'red',
                  fontSize: '14px'
                },
                on: {
                  click: () => {console.log('aaa',this.message)}
                }
                // domProps: {
                //       innerHTML: 'son'
                //   },
              },  
              [ //标签的字节点// {String | Array}子级虚拟节点 (VNodes)，由 `createElement()` 
                //构建而成，也可以使用字符串来生成“文本虚拟节点”。可选。
                `见证奇迹${that.msg}`,
                <span>sss </span>,
                h(
                  'div',
                  {
                    on: { click: () => {
                    that.msg = '看看就看看'
                    console.log('why')
                   },
                   domProps: {
                      innerHTML: 'son'
                    },
                  }
                  },`chen is: ${state.count}`
                )
              ]
            )
          }
        }
      Vue.component('my-component', Demo)
      Vue.component('my-div', myDiv)
    }
  }
}
</script>

<style>

</style>