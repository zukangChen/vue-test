<!--
 * @Author: 陈祖康
 * @Date: 2020-09-12 14:54:12
 * @LastEditors: 陈祖康
 * @LastEditTime: 2020-09-12 14:54:40
 * @Description: 子组件代码
 * @Props: 
 * @Emit: 
-->
<!--  -->
<template>
    <div class=''>
      <div v-if="fatherData">
        子组件中显示fatherData的值：{{fatherData}}
        <el-button type="danger" @click="changeFather">
          点击修改父组件fartherData的值-姓名改为“王五”
        </el-button>
      </div>

      <div v-if="value!==''">
        <input v-model="value">
      </div>

      <div v-if="fatherData3!==''">
        子组件中显示fatherData3的值：{{fatherData3}}
        <el-button type="danger" @click="changeFather3">
          点击修改父组件fartherData3的值,改为“哈哈哈哈哈”
        </el-button>
      </div>

    </div>
</template>

<script>
    export default {
      props:{
        fatherData:{
          type:Object
        },
        value: {
          type: String,
          default: ''
        },
        fatherData3: {
          type: String,
          default: ''
        }
      },
        name: "l0705components",
        data() {
            // 这里存放数据
            return {
            }
        },
        // 方法集合
        methods: {
          changeFather(){
            this.fatherData.name = '王五'
          },
          changeFather3() {
            this.fatherData3 = '哈哈哈哈哈'
          }
        }
    }
</script>