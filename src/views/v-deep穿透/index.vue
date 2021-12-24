<!--
 * @Author: 陈祖康
 * @Date: 2020-07-19 14:42:47
 * @LastEditors: 陈祖康
 * @LastEditTime: 2021-05-04 12:07:00
 * @Description: 
 * @Props: 
 * @Emit: 
--> 
<template>
  <div class="v-deep">
    <!-- <el-row>
      <el-button>默认按钮</el-button>
      <el-button type="primary">主要按钮</el-button>
      <el-button type="success">成功按钮</el-button>
      <el-button type="info">信息按钮</el-button>
      <el-button type="warning">警告按钮</el-button>
      <el-button class="change" type="danger">危险按钮</el-button>
      <i class="iconfont icon-shouye"></i>
    </el-row>
    <div class="test">
      <div class="left">left</div>
      <div class="right">right</div>
    </div> -->
    <div class="left">
      <div class="name">
        薛之谦
      </div>
    </div>
    <div class="right"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  created () {
    // console.log('b', this.utils.isArray(""))
    console.log('vue', this.event.emit())
    console.log('npm包测试',this.smile.isArray([]))
  }
}
</script>

<style lang="scss" scoped>
.left {
  width: 100px;
  height: 100px;
  background-color: pink;
  display: inline-block;
  /* overflow: hidden; */
  .name {
    color: red;
  }
}
.right {
  /* display: inline-block; */
  float: left;
  width: 200px;
  height: 200px;
  background-color: red;
  /* position: absolute; */
  margin-left: 10px;
  left: 90px;
}
.v-deep {
  width: 100%;
  height: 100%;
}
::v-deep .change {
  color: black;
}
.el-button+.el-button {
  background-color: blue;
}
.test {
  position: relative;
  width: 100%;
  /* height: 600px; */
  background-color: #cfcfcf;
  text-align: center;
}
.a {
  .left {
    width: 200px;
    height: 100px;
    background-color: orange;
    display: inline-block;
    /* text-align: center; */
  }
  .right {
    background-color: orchid;
    /* width: 100px; */
    height: 50px;
    /* display: flex; */
    /* position: absolute; */
    /* width: 100%; */
    /* overflow: hidden; */
    display: inline-block;
    vertical-align: bottom;
  }
}
</style>