<!--
 * @Author: 陈祖康
 * @Date: 2020-08-02 17:20:16
 * @LastEditors: 陈祖康
 * @LastEditTime: 2020-08-02 19:06:44
 * @Description: v-modal的自定义组件
 * @Props: 
 * @Emit: 
--> 
<template>
  <div class="content">
    <p>{{value}}</p>
    <input :value="value" @input="updateVal($event.target.value)" type="text">
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  props: ["value"],
  model: {
    prop: 'value',
    event: 'modelChange'
  },
  methods: {
    updateVal(val) {
      this.$emit('modelChange', val);
      console.log('smile', this.value, val)
    },
  }
}
</script>

<style>

</style>