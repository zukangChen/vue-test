<!--
 * @Author: 陈祖康
 * @Date: 2020-08-02 18:19:09
 * @LastEditors: 陈祖康
 * @LastEditTime: 2020-09-12 15:03:24
 * @Description: 
 * @Props: 
 * @Emit: 
--> 
<template>
  <div class="son">
    <p>Son:爸爸对我说{{sendData}}</p>
    <span>smile{{sendData}}</span>
    <button @click="rice">回复</button>
    <span>父组件传过来的值:{{myProp}}</span>
    <input type="text" v-model="myProp.name">
    <button @click="setProp">改变myProp</button>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  props:{
    sendData: {
      type: String
    },
    myProp: {
      type: Object
    }
  },
  model: {
      prop: 'sendData',
      event: 'rice'
  },
  methods: {
    rice() {
      this.$emit('rice', 'sucess')
      this.$emit('talk', 'smile')
    },
    /**
     * 改变myProp值
     */
    setProp() {
      // this.$emit('getNowProp', 'val')
      this.myProp.name = 'your smile'
    }
  },
  watch: {
    sendData(newval, val) {
      console.log('lalala', newval, val)
    }
  }
}
</script>

<style>

</style>