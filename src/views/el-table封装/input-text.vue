<!--
 * @Author: 陈祖康
 * @Date: 2020-08-16 16:19:31
 * @LastEditors: 陈祖康
 * @LastEditTime: 2020-08-17 08:58:45
 * @Description: 文本字段
 * @Props: 
 * @Emit: 
-->
<template>
  <el-table-column :prop="item.prop" :label="item.label" :width="item.width" :fixed="item.fixed" :type="item.type">
  </el-table-column>
</template>

<script>
export default {
  props: {
    item:{
      type: Object,
      default () {
        return {}
      }
    },
  },
  created() {

  },
  methods: {
    //点击选择框
    selectValue(val) {
      console.log('selectValue', val)
    }
  }
}
</script>

<style>

</style>