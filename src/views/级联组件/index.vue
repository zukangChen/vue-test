<!--
 * @Author: 陈祖康
 * @Date: 2020-08-13 17:18:44
 * @LastEditors: 陈祖康
 * @LastEditTime: 2020-08-13 19:43:26
 * @Description: 
 * @Props: 
 * @Emit: 
-->
<template>
  <div class="cader">
    <cascader :defaultvalue = value></cascader>
  </div>
</template>

<script>
import cascader from './index2.vue'
  export default {
    data() {
      return {
        value: ['zhinan']
      };
    },
    methods: {
      chufa() {
        console.log('sss')
      }
    },
    components: {cascader}
  };
</script>