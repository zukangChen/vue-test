<!--
 * @Author: 陈祖康
 * @Date: 2020-08-08 14:23:54
 * @LastEditors: 陈祖康
 * @LastEditTime: 2021-09-26 15:20:16
 * @Description: 表单验证
 * @Props: 
 * @Emit: 
-->
<template>
	<div class="validate">
    <button @click="form">新建</button>
		<el-form
			:model="ruleForm"
			status-icon
			:rules="rules"
			ref="ruleForm"
			label-width="100px"
			class="demo-ruleForm"
		>
			<el-form-item label="密码" prop="pass">
				<el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="确认密码" prop="checkPass">
				<el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="年龄" prop="age">
				<el-input v-model.number="ruleForm.age"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
				<el-button @click="resetForm('ruleForm')">重置</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
export default {
  name: 'validate',
  data() {
    let validatePass = (rule, value, callback) => {
      console.log('66',value)
      if(value === '') {
        callback(new Error('请输入密码！'))
      } else {
        this.$refs.ruleForm.validateField('通过')
      }
      callback()
    }
    let validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Please input the password again'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('Two inputs don\'t match!'));
        } else {
          callback();
        }
      }
      let checkAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('Please input the age'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('Please input digits'));
          } else {
            if (value < 18) {
              callback(new Error('Age must be greater than 18'));
            } else {
              callback();
            }
          }
        }, 1000);
      }
    return {
      ruleForm: {
        pass: '',
        checkPass: '',
        age: ''
      },
      rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          age: [
            { validator: checkAge, trigger: 'blur' }
          ]
        }
    }
  },
  methods: {
    //确定提交
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //重置
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      form() {
        console.log(this)
        this.$myMessage(true, '新建用户表单')
      }
    }
}
</script>

<style>
</style>