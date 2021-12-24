<!--
 * @Author: 陈祖康
 * @Date: 2020-08-03 19:58:05
 * @LastEditors: 陈祖康
 * @LastEditTime: 2020-08-03 19:59:45
 * @Description: 
 * @Props: 
 * @Emit: 
-->
<template>
  <div class="sea">
    <div
      class="frost-content">
      姓名：<input 
        v-model="name" 
        type="text" 
        placeholder="姓名">
      年龄：<input 
        v-model="age" 
        type="text" 
        placeholder="年龄">
      个人信息（单向）：<input 
        v-model="personSingle" 
        type="text" 
        placeholder="个人信息（单向）">
      个人信息（双向）：<input 
        v-model="personDouble" 
        type="text" 
        placeholder="个人信息（单向）">
    </div>
  </div>
</template>
<script>
export default {
  name: 'ComputedListen',
  data() {
    return {
      name: '小太阳',
      age: 18
    };
  },
  computed: {
    personSingle() {
      // 计算属性中的get方法，方法的返回值就是属性值
      return this.name + ' ' + this.age;
    },
    personDouble: {
      // 监听当前属性值的变化，当属性值发生变化时执行，更新相关属性数据
      // value就是当前属性的最新属性值
      get() {
        return this.name + ' ' + this.age;
      },
      set(value) {
        const person = value.split(' ');
        this.name = person[0];
        this.age = person[1];
      }
    }
  }
};
</script>