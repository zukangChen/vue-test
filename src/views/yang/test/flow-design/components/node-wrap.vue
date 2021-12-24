<!--
 * @Author: xuwang.bao
 * @LastEditors: 陈祖康
 * @Description: 节点的布局组件（主要是为了控制连接线）
 * @$emit:
 * @$slot:
 * @Date: 2019-04-08 16:20:27
 * @LastEditTime: 2021-07-20 15:51:13
 -->
<template>
  <div class="new-node-wrap">
    <!-- 分支节点 -->
    <!-- <template v-if="nodeData.type === 6 ">
      <BranchWrap
        :key="`branch-wrap-${nodeData.nodeId}`"
        :parentNode="parentNode"
        :nodeData="nodeData"
      />
    </template> -->
    <!-- 普通节点 -->
    <template>
      <ApproverNode
        :key="`approver-node-${nodeData.nodeId}`"
        :parentNode="parentNode"
        :nodeData="nodeData"
      />
    </template>

    <!-- 子节点 -->
    <template v-if="nodeData.childNode">
      <node-wrap
        :key="`node-wrap-new-${nodeData.nodeId}`"
        :parentNode="nodeData"
        :nodeData="nodeData.childNode"
      />
    </template>
  </div>
</template>

<script>
import utilMixin from '../mixin/util-mixin'
export default {
  name: 'node-wrap',
  components: {
    // NodeWrap 和 BranchWrap 中的 condi-node 存在循环应用，这里需要显示的异步引入
    // BranchWrap: () => import('./branch-wrap'),
    ApproverNode: () => import('./approver-node')
  },
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

  methods: {
    init () {}
  }
}
</script>

<style lang="scss">
.new-node-wrap {
  display: inline-flex;
  width: 100%;
  flex-direction: column;
  -webkit-box-pack: start;
  -ms-flex-pack: start;
  justify-content: flex-start;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -webkit-box-flex: 1;
  -ms-flex-positive: 1;
  // padding: 0 50px;
  position: relative;
  font-family: PingFangSC-Medium;
  .active{
    &::after{
      border-radius: 8px !important;
      border: 2px solid #FFA05B !important;
      //box-shadow: 0 4px 10px 0 #ff8e3d !important;
    }
  }
  .active-blue{
    &::after{
      border-radius: 8px !important;
      border: 2px solid #69BCFF !important;
      box-shadow: 0 4px 10px 0 rgba(137, 196, 255, 0.3) !important;
    }
  }
  .active-error{
    &::after{
      border-radius: 8px !important;
      border: 2px solid #FF968A !important;
      box-shadow: 0 4px 10px 0 rgba(253, 163, 163, 0.185)!important;
    }
  }
}
</style>
