<!--
 * @Author: 陈祖康
 * @Date: 2020-08-02 15:51:27
 * @LastEditors: 陈祖康
 * @LastEditTime: 2020-09-12 14:43:50
 * @Description: form表单
 * @Props: 
 * @Emit: 
--> 
<template>
  <div class="form">
    <div class="form-content">
      <el-form :model="ruleForm" ref="ruleForm" label-width="80px" class="demo-ruleForm">
        <el-form-item label="活动名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
      </el-form>
      <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
        <el-form-item label="名称">
          <el-input v-model="formLabelAlign.name"></el-input>
        </el-form-item>
        <el-form-item label="活动区域">
          <el-input v-model="formLabelAlign.region"></el-input>
        </el-form-item>
        <el-form-item label="活动形式">
          <el-input v-model="formLabelAlign.type"></el-input>
        </el-form-item>
      </el-form>
      <price-input v-model="price"></price-input>
      <button @click="update">改变</button>
      <p>Dad:{{sendData}}</p>
      <son v-model="sendData" :myProp="myProp" @getNowProp = "nowProp"></son>
      <span>father: {{myProp}}</span>
    </div>
  </div>
</template>

<script>
import {mapMutations, mapGetters} from 'vuex'
import priceInput from './price-input'
import son from './son'
export default {
  data() {
    return {
      myProp: {name:'smile', text:'to my heaart'},
      ruleForm: {
        name: 'smile'
      },
      labelPosition: 'right',
      formLabelAlign: {
        name: '',
        region: '',
        type: ''
      },
      price: 500,
      sendData: '龟儿子回来吃饭了'
    }
  },
  components: {
    priceInput,
    son,
  },
  created() {
    this.ruleForm.name = this.getTitle
  },
  computed:{
    ...mapGetters([
        'getTitle'
      ])
  },
  watch: {
    price() {
      console.log('fa', this.price)
    }
  },
  methods: {
    ...mapMutations({
      form: 'controlShow'
    }),
    update() {
      this.price = 600
    },
    reveive() {
      console.log('sss')
      this.$emit('talk', 'smile')
    },
    /**
     * 获取现在的myProp值
     */
    nowProp() {
      console.log('now', this.myProp)
    }
  }
}
</script>

<style lang="less" scoped>
.form {
  display: flex;
  justify-content: center;
  align-items: center;
}
.form-content {
  width: 80%;
  height: 80%;
  display: flex;
  flex-wrap:wrap;
  justify-content: center;
  align-items: center;
}
/deep/.el-input__inner {
  width: 400px;
}
</style>