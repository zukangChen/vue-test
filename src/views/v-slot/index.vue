<!--
 * @Author: 陈祖康
 * @Date: 2020-08-09 17:22:44
 * @LastEditors: 陈祖康
 * @LastEditTime: 2020-08-09 18:07:31
 * @Description: v-slot插槽
 * @Props: 
 * @Emit: 
-->
<template>
  <div class="slot">
    <h2>愿你和你喜欢的一切在一起</h2>
    <child :msg= headermsg>
      <template v-slot:header = "headermsg">
        {{headermsg}}
      </template>
      <template v-slot:footer = "footermsg">
        {{footermsg}}
      </template>
      <template v-slot:main = "message">
        <li>{{message.value}}</li>
      </template>
    </child>
  </div>
</template>

<script>
import child from './child.vue'
export default {
  data() {
    return {
      headermsg: '演员'
    }
  },
  components: {
    child
  }
}
</script>

<style>

</style>