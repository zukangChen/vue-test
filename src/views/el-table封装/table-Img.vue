<!--
 * @Author: 陈祖康
 * @Date: 2020-08-17 10:26:37
 * @LastEditors: 陈祖康
 * @LastEditTime: 2020-08-17 11:21:59
 * @Description: 表格图片
 * @Props: 
 * @Emit: 
-->
<template v-if="item.isImg">
  <el-table-column :prop="item.prop" :label="item.label" :width="item.width">
    <template slot-scope="scope">
      <el-popover placement="left" trigger="click">
        <el-image
          style="width: 100px;height: 100px;"
          :src="scope.row[item.prop]"
          fit="contain"
          slot="reference"
        ></el-image>
        <div>
          <el-image
            style="width: 300px; height: auto;"
            :src="scope.row[item.prop]"
            fit="contain"
          ></el-image>
        </div>
      </el-popover>
    </template>
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
}
</script>

<style>

</style>