<!--
 * @Author: xuwang.bao
 * @LastEditors: 陈祖康
 * @Description: 审批人节点
 * @$emit:
 * @$slot:
 * @Date: 2019-04-08 16:09:27
 * @LastEditTime: 2021-07-20 16:36:14
 -->
<template>
  <div class="approver-node">
    <!-- 节点 -->
    <div class="node">
      <span>{{nodeData.name}}</span>
    </div>
    <!-- 连线 + 添加 -->
    <div class="add-node-btn-box">
      <AddNodeButton
        :nodeData="nodeData"
      />
    </div>
  </div>
</template>

<script>
import utilMixin from './../mixin/util-mixin'
export default {
  name: 'approver-node',
  mixins: [
    utilMixin
  ],

  props: {
    nodeData: {
      /**
       * 节点数据对象
       */
      type: Object,
      default: () => ({}),
      required: true
    }
  },

  data () {
    return {
    }
  },

  mounted () {
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.approver-node {
  position: relative;
  z-index: 10;
  // font-size: 0;
  border-radius: 8px;
  .node {
    background-color: #f6f6f6;
    width: 305px;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .add-node-btn-box{
      width: 305px;
      display: inline-flex;
      -ms-flex-negative: 0;
      flex-shrink: 0;
      -webkit-box-flex: 1;
      -ms-flex-positive: 1;
      position: relative;
      &::before{
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: -1;
        margin: auto;
        width: 2px;
        height: 100%;
        background-color: #cacaca;
      }
      &>.add-node-btn{
        user-select: none;
        width: 220px;
        padding: 20px 0 32px;
        display: flex;
        -webkit-box-pack: center;
        justify-content: center;
        flex-shrink: 0;
        -webkit-box-flex: 1;
        flex-grow: 1;
      }
  }
}
</style>
