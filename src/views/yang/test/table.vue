<!--
 * @Author: 陈祖康
 * @Date: 2021-01-26 16:04:06
 * @LastEditors: 陈祖康
 * @LastEditTime: 2021-07-20 15:05:40
 * @Description: 
 * @Props: 
 * @Emit: 
-->

<template>
  <div class="myTable">
    <!-- 表格 -->
     <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper" @click="toLink(scope.row)">
            <el-tag size="medium">{{ scope.row.name }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
    </el-table>
    <!-- 弹窗 -->
    <el-dialog
      title="提示"
      v-if="dialogVisible"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  
  data() {
    return {
      dialogVisible: false,
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
  mounted() {
  },
  methods: {
    // 跳转
    toLink(row) {
      this.dialogVisible = true
      console.log(row)
    },
    // 关闭前提示
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(()=> {
          done()
        })
        .catch(()=> {})}
    }
}
</script>

<style>
</style>