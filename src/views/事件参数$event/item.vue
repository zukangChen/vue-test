<!--
 * @Author: 陈祖康
 * @Date: 2020-07-25 17:37:38
 * @LastEditors: 陈祖康
 * @LastEditTime: 2020-07-25 18:04:07
 * @Description: myitem
 * @Props: 
 * @Emit: 
--> 
<template>
  <div>my-item</div>
</template>

<script>
export default {
    methods: {
        customEvent() {
            this.$emit('custom-event', 'some value')
        }
    },
    created() {
      this.customEvent()
    }
}

</script>

<style>

</style>