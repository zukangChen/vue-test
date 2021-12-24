<!--
 * @Author: 陈祖康
 * @Date: 2020-08-08 15:03:45
 * @LastEditors: 陈祖康
 * @LastEditTime: 2020-08-08 16:07:45
 * @Description: dialog弹窗
 * @Props: 
 * @Emit: 
-->
<template>
  <div class="dialog">
    <el-dialog
      title="提示"
      width="30%"
      :visible.sync="show"
      center>
      <span>{{title}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="controlDialog(false)">取 消</el-button>
        <el-button type="primary" @click="controlDialog(false)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
export default {
  name: 'my-dialog',
  data() {
    return {
      
    }
  },
  computed: {
    ...mapGetters({
        'title': 'getTitle',
        'show' : 'getDialogShow'
      }
    )
  },
  methods: {
    ...mapActions({
      controlDialog: 'controlDialog'
    })
  }

}
</script>

<style>

</style>