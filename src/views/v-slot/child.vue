<!--
 * @Author: 陈祖康
 * @Date: 2020-08-09 17:24:21
 * @LastEditors: 陈祖康
 * @LastEditTime: 2020-08-09 18:16:28
 * @Description: 
 * @Props: 
 * @Emit: 
-->
<template>
  <div class="child">
    <span>{{msg}}</span>
    <slot name="footer" :footer="footermsg" :foo="foo"></slot>
    我在这啊
    <slot name= "header" :header="headermsg"></slot>
    <div>
      <ul>
          <slot v-for="value in list" :value=value  name="main">
          </slot>
        </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Child',
  data() {
    return {
      msg3: '该来的都在路上',
      list: ["忘","了","吧"],
      headermsg: '我可以送你回家嘛?',
      footermsg: '可能外面要下雨了',
      foo: '该配合你演出的我演视而不见'
    }
  },
  props: {
    msg: {
      default: ''
    }
  }
}
</script>

<style>

</style>