<!--
 * @Author: 陈祖康
 * @Date: 2021-01-07 09:47:26
 * @LastEditors: 陈祖康
 * @LastEditTime: 2021-01-07 10:00:25
 * @Description: 
 * @Props: 
 * @Emit: 
-->
<template>
  <div class="edit-team">
    输入
    <el-input v-model="memberForm.name" placeholder="请输入姓名"></el-input>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  props: {
    /**
     * 父组件传给弹窗的初始data
     */
    modelValue: {
      type: Object
    }
  },
  model: {
    prop: 'modelValue',
    event: 'modelChange'
  },
  computed: {
    memberForm: {
      get () {
        console.log('itemMember', this.itemMember)
        return this.modelValue
      },
      set (val) {
        console.log('设置', val)
        this.$emit('modelValue', val)
      }
    }
  },
}
</script>

<style>

</style>