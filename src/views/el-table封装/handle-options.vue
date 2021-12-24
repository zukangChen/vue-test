<!--
 * @Author: 陈祖康
 * @Date: 2020-08-16 16:38:05
 * @LastEditors: 陈祖康
 * @LastEditTime: 2020-08-17 09:52:01
 * @Description: 
 * @Props: 
 * @Emit: 
-->
<template v-if="table.options.length">
  <el-table-column :label="item.label" :width="item.width" :fixed="item.fixed" :prop="item.prop">
    <template slot-scope="scope">
      <template v-for="btn in table.options">
        <el-button
          :key="btn.label"
          :type="btn.type"
          v-if="btn.isShow ? btn.isShow(scope.row) : true"
          @click="btn.event(scope.row)"
        >{{btn.label}}
        </el-button>
      </template>
    </template>
  </el-table-column>
</template>

<script>
export default {
  inject: ['table'],
  created() {
  },
  props: {
    item:{
      type: Object,
      default () {
        return {}
      }
    },
  },
  methods: {
    event(btn) {
      console.log('666', btn)
    }
  }
}
</script>

<style>

</style>