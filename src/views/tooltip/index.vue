<!--
 * @Author: 陈祖康
 * @Date: 2021-09-07 09:43:09
 * @LastEditors: 陈祖康
 * @LastEditTime: 2021-11-09 15:28:06
 * @Description: tooltip提示框
 * @Props: 
 * @Emit: 
-->
<template>
  <div class="index">
    <template v-for="item in list">
      <toolTip :key="item.name" :optionMaxWidth="200" :toolTipContent="item.name" :placement="'bottom'">
        <div class="list">
          {{item.name}}
        </div>
      </toolTip>
    </template>
    <template v-for="item in list">
      <div class="box" :key="item.name" :optionMaxWidth="200" v-tooltip="{toolTipContent:item.name, placement: 'top'}">
        <div class="list">
          {{item.name}}
        </div>
      </div>
    </template>
    <button @click="toDebounce">防抖</button>
    <button @click="todebounce">防抖二</button>
  </div>
</template>

<script>
import toolTip from '@/components/tool-tip'
export default {
  name: 'index',

  components: {
    toolTip
  },

  data () {
    return {
      list: [
        {name: '我走了，你别再难过'},
        {name: '尽管有太多的不舍'}
      ]
    }
  },

  props: {
  },

  mounted () {
  },

  methods: {
    toDebounce() {
      // 使用utils挂载到全局的防抖方法
      utils.debounce(()=> {
        console.log('zkzk')
      }, 1000)()
    },
    todebounce() {
      utils.debounce(()=> {
        console.log('防抖二')
      }, 1000)()
    }
  }
}
</script>

<style lang="scss" scoped>
.index {
  width: 100%;
  height: 100%;
  padding: 20px;
}
  .tool-tip-content-p {
    padding: 0;
    margin: 0;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .list {
    background-color: #fcfcfc;
    text-align: center;
    height: 36px;
    margin-top: 8px;
    line-height: 36px;
  }
</style>
