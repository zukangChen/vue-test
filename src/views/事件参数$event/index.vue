<!--
 * @Author: 陈祖康
 * @Date: 2020-07-25 17:31:41
 * @LastEditors: 陈祖康
 * @LastEditTime: 2020-07-25 18:01:41
 * @Description: 
 * @Props: 
 * @Emit: 
--> 
<template>
  <div>
    <input type="text" @input="inputHandler('hello', $event)" />
    <my-item v-for="(item, index) in list" :key="index" @custom-event="customEvent(index, $event)"></my-item>
  </div>
</template>

<script>
import myItem from './item.vue'
export default {
  data() {
    return {
      list: [1,2]
    }
  },
    methods: {
        inputHandler(msg, e) {
            console.log(e.target.value)
        }, 
        customEvent(index, e) {
            console.log(e) // 'some value'
        }
    },
    components: {
      myItem
    }
}
</script>

<style>

</style>