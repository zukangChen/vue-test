<!--
 * @Author: 陈祖康
 * @Date: 2021-05-08 15:30:51
 * @LastEditors: 陈祖康
 * @LastEditTime: 2021-05-12 18:51:46
 * @Description: 走马灯
 * @Props: 
 * @Emit: 
-->
<template>
  <div class="goHorse">
    <h2>走马灯</h2>
    <span class="demonstration">Click 指示器触发</span>
    <el-carousel trigger="click" :autoplay="false" height="150px">
      <el-carousel-item v-for="item in 4" :key="item">
        <!-- <video class="media" src="https://v-cdn.zjol.com.cn/280443.mp4"></video> -->
        <video class="my-video" controls>
          <source src="https://v-cdn.zjol.com.cn/280443.mp4" type="video/webm">
          Sorry, your browser doesn't support embedded videos.
      </video>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.goHorse {
  // position: relative;
  .small {
    text-align: center;
  }
  .my-video {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: 0 auto;
    width: 300px;
  }
}
.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }
</style>