<!--
 * @Author: 陈祖康
 * @Date: 2020-09-12 14:53:34
 * @LastEditors: 陈祖康
 * @LastEditTime: 2020-09-12 14:59:05
 * @Description: 父子组件的prop传值
 * @Props: 
 * @Emit: 
-->
<!--  -->
<template>
    <div class=''>
      <el-link type="danger">传值为对象：</el-link>
      <div>
        父组件中显示fatherData的值：{{fatherData}}
        <son :fatherData="fatherData"></son>
      </div>
      <br><br><br>
      <el-link type="danger">传值为字符串，使用v-model传值：</el-link>
      <div>
        父组件中显示fatherData2的值：{{fatherData2}}
        <son v-model="fatherData2"></son>
      </div>
      <br><br>
      <el-link type="danger">传值为字符串：</el-link>
      <div>
        父组件中显示fatherData3的值：{{fatherData3}}
        <son :fatherData3="fatherData3"></son>
      </div>
    </div>
</template>

<script>
    import son from './son'
    export default {
        name: "myProp",
        components: {
          son
        },
        data() {
            // 这里存放数据
            return {
              fatherData:{
                name:"李四",
                age:"14"
              },
              fatherData2:'父组件的数据2',
              fatherData3: '父组件的数据3'
            }
        }
    }
</script>