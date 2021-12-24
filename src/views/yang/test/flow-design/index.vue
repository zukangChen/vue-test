<!--
 * @Author: 陈祖康
 * @Date: 2021-07-20 15:22:39
 * @LastEditors: 陈祖康
 * @LastEditTime: 2021-07-20 16:27:21
 * @Description: 仿流程设置
 * @Props: 
 * @Emit: 
-->
<template>
  <div class="index">
    <el-scrollbar
      style="height:100%"
      ref="flowDesignScrollbar"
    >
    <div
      style="width:100%;"
      class="box-scale">
      <!-- 开始节点 -->
      <NodeWrap
        :parentNode="null"
        :nodeData="propNodeData"
        :selectItem="selectItem"
      />
      <div class="end-node">
        <div class="end-node-circle"></div>
        <div class="end-node-text">结束流程</div>
      </div>
    </div>
  </el-scrollbar>
  </div>
</template>

<script>
import NodeWrap from './components/node-wrap.vue'

export default {
  name: 'index',

  components: {
    NodeWrap
  },

  data () {
    return {
      propNodeData: {
        name: '开始节点',
        type: 1,
        nodeId: 1,
        childNode: {
          name: '审批节点',
          type: 3,
          nodeId: 2
        }
      },
      selectItem: {}
    }
  },
  provide: function () {
    return {
      flowIndex: this
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
  font-size: 14px;
}
</style>
