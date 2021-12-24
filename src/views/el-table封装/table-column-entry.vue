<!--
 * @Author: 陈祖康
 * @Date: 2020-08-16 16:07:00
 * @LastEditors: 陈祖康
 * @LastEditTime: 2020-08-16 18:07:19
 * @Description: table-column入口文件
 * @Props: 
 * @Emit: 
-->
<template>
  <div class="table-column">
    <component
      :is="item.type | findComponent(item.type)"
      :item = item
     >
  </component>
  </div>
</template>

<script>
import fieldMixin from './mixin-filed'
export default {
  name: "table-column",
  props: {
    item:{
      type: Object,
      default () {
        return {}
      }
    },
    formQuery: { // 表单参数
      type: Object,
      default () {
        return {}
      }
    }
  },
  mixins: [
    fieldMixin
  ],
}
</script>

<style>

</style>