<!--
 * @Author: 陈祖康
 * @Date: 2021-08-05 15:55:18
 * @LastEditors: 陈祖康
 * @LastEditTime: 2021-08-18 15:35:55
 * @Description: 布局
 * @Props: 
 * @Emit: 
-->
<template>
  <div class="index">
    <div class="left">left</div>
    <div class="right">right</div>
    <div class="center">center</div>
    <!-- <div class="right">right</div> -->
    <!-- 用css实现一个自适应的是父盒子一半的长方形盒子
      方案一：使用vw vh布局
      如果是正方形的话，可以子盒子设置width: 20%;padding-top:20%;padding百分比是基于父盒子宽度算的
     -->
    <ul>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
      <li></li>
    </ul>
    <div class="A">
      A
      <div class="B">
        B
        <div class="C">
          C
        </div>
      </div>
    </div>
    <div class="audio">
      <audio autoplay>
        <source src="http://www.w3school.con.cn/i/song.ogg" type="audio/ogg">
        <source src="http://www.w3school.con.cn/i/song.mp3" type="audio/mpeg">
        您的浏览器不支持 audio 元素。
      </audio>
    </div>
    <div class="test" v-for="(item, index) in 6" :key="index">
      <span :class="[`${index}}`]"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',

  components: {
  },

  data () {
    return {
    }
  },

  props: {
  },

  mounted () {
  },

  methods: {
  }
}
</script>

<style lang="scss" scoped>
.index {
  width: 100%;
  height: 100%;
  position: relative;
  .audio {
    height: 50px;
  }
  .left {
    // float: left;
    width: 100px;
    background-color: #fcfcfc;
    position: absolute;
    left: 0;
    top: 0;
  }
  .center {
    margin-left: 100px;
    margin-right: 100px;
    background-color: pink;
  }
  .right {
    width: 100px;
    // float: right;
    background-color: red;
    position: absolute;
    top: 0;right: 0;
  }
  ul{
      margin-top: 20px;
      width: 100%;
      list-style: none;
    }
    li{
      width: 20vw;
      height: 20vh;
      // width: 20%;
      // height: 20%;
      float: left;
      // padding-top: 20%;
    }
    li:first-child{
      background: red;
    }
    li:nth-child(2){
      background: green;
    }
    li:nth-child(3){
      background: blue;
    }
    li:nth-child(4){
      background: yellow;
    }
    li:nth-child(5){
      background: pink;
    }
    .B {
      width: 300px;
      height: 200px;
      background-color: pink;
      overflow: hidden;
      .C {
        width: 150px;
        background-color: blue;
        position: fixed;
        margin-left: 50px;
      }
    }
    .B:hover{
      transform: (translate(-50%, -50%));
    }
    .A {
      margin-top: 260px;
      width: 600px;
      background-color: red;
    }
}
</style>
