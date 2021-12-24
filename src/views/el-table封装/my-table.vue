<!--
 * @Author: 陈祖康
 * @Date: 2020-08-16 17:05:00
 * @LastEditors: 陈祖康
 * @LastEditTime: 2020-08-17 09:19:15
 * @Description: 表格
 * @Props: 
 * @Emit: 
-->
<template>
  <div class="my-table">
    <el-table :data="table.data" v-loading="table.loading" :stripe="table.stripe" border @select="selectValue" @select-all="selectAll">
      <template v-for="item in table.header">
        <tableColumn :item = item :key="item.lable"></tableColumn>
      </template>
    </el-table>
  </div>
</template>

<script>
import tableColumn from './table-column-entry'
import myTableMixin from './mixin-table'
export default {
  created() {
    console.log('data', this.table.data)
    console.log('header', this.table.header)
  },
  mixins:[myTableMixin],
  components: {
    tableColumn
  },
  props:{
    table: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  methods: {
  }
}
</script>

<style>

</style>