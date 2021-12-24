<!--
 * @Author: 陈祖康
 * @Date: 2021-04-11 12:53:58
 * @LastEditors: 陈祖康
 * @LastEditTime: 2021-04-12 11:03:46
 * @Description: 发布订阅者模式
 * @Props: 
 * @Emit: 
-->
<template>
  <div class="publish">
    发布订阅者
    <child></child>
  </div>
</template>

<script>
import child from '@/views/publish-subscribers/child'
export default {
  data() {
    return {

    }
  },
  components: {
    child
  },
  mounted() {
    console.log(this)
    this.event.on('click2', (data)=> {
      console.log('22')
      console.log('mm', data)
    })
    this.obj = {
      event: {
        smile: [
          function a () {
            console.log('a', this)
          }
        ]
      }
    }
    this.obj.event.smile.forEach(fn => {
      console.log('实例', this)
      fn.apply(this)
    })
  }
}
</script>

<style>

</style>