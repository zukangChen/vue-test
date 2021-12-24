<!--
 * @Author: 陈祖康
 * @Date: 2020-09-19 16:25:56
 * @LastEditors: 陈祖康
 * @LastEditTime: 2020-09-19 17:44:23
 * @Description: 
 * @Props: 
 * @Emit: 
-->
<template>
  <div class="border2">
    <span>childB组件</span>
    <div>
      <span>我也是{{theme.color}}</span>
      <div>{{name}}</div>
    </div>
    <button @click="() => {this.theme.color = this.theme.color === 'blue' ? 'red' : 'blue'}">改变父组件的name</button>
    <!-- <h3 :style="{ color: inject.theme.color }">F 组件</h3> -->
  </div>
</template>

<script>
export default {
// inject: {
//           theme: {
//             //函数式组件取值不一样
//             default: () => ({})
//           }
//         }
inject: {

  theme: {
    form:'',
    default: () => {}
  },
  name: {
    default: ''
    }
  }
// inject:['name','theme']
}
</script>

<style>

</style>