<!--
 * @Author: 陈祖康
 * @Date: 2021-04-11 13:10:47
 * @LastEditors: 陈祖康
 * @LastEditTime: 2021-04-12 11:09:20
 * @Description: 子组件
 * @Props: 
 * @Emit: 
-->
<template>
  <div class="child">
    <button @click="sendFather">我是子组件</button>
  </div>
</template>

<script>
import vv from 'vue'
export default {
  methods: {
    sendFather() {
      const boom = new vv()
      console.log('vv', boom)
      console.log('this实例', this)
      console.log('ss', this.smile)
      this.event.emit('click2', ['smile', 'heart'])
    }
  }
}
</script>

<style>

</style>