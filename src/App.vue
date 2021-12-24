<!--
 * @Author: 陈祖康
 * @Date: 2020-03-30 16:43:48
 * @LastEditors: 陈祖康
 * @LastEditTime: 2021-09-07 10:54:42
 * @Description: 
 * @Props: 
 * @Emit: 
--> 
<template>
  <div id="app">
    <router-view/>
    <!-- <iframe src="http://localhost:8080/#/yang" height="200px" width="100%"></iframe> -->
    <myFormdialog v-if="getDialogShow"></myFormdialog>
    <globalTooltip></globalTooltip>
  </div>
</template>

<script>
import myFormdialog from '@/views/form/my-dialog.vue'
import globalTooltip from '@/components/global-tooltip'
import {mapGetters} from 'vuex'
export default {
  name: 'App',
  data() {
    return {
      dialogShow: ''
    }
  },
  created() {
    
  },
  computed:{
    ...mapGetters([
        'getDialogShow'
      ])
  },
  components: {
    myFormdialog,
    globalTooltip
  }
}
</script>

<style>
html,body{
  width: 100%;
  height: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%;
}
</style>
