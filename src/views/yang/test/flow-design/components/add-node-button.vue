<!--
 * @Author: xuwang.bao
 * @LastEditors: 陈祖康
 * @Description: 添加按钮
 * @$emit:
 * @$slot:
 * @Date: 2019-04-09 12:29:25
 * @LastEditTime: 2021-07-20 16:37:43
 -->
<template>
  <div class="add-node-button add-node-btn">
    <el-button
      icon="el-icon-plus"
      class="add-node-button__icon"
      @click="hanlderAction">
    </el-button>
  </div>
</template>

<script>
export default {
  name: 'add-node-button',

  inject: {
    flowIndex: {default: {}}
  },

  props: {
    nodeData: {
      // 节点数据对象
      type: Object,
      default: () => ({}),
      required: true
    }
  },

  data () {
    return {
    }
  },
  computed: {
    isShowAddBtn () {
      return !([14, 15].includes(this.nodeData.type) &&
        this.nodeData.childNode &&
        this.nodeData.childNode.conditionNodes &&
        [3, 4].includes(this.nodeData.childNode.conditionNodes[0].conditionType)) &&
        this.$route.query.id
    }
  },
  methods: {
    init () {},
    // 接受action的触发
    hanlderAction () {
      // this.flowIndex.$refs.action.drawer = true
      // this.flowIndex.$refs.action.nodeData = this.nodeData
      if (this.nodeData.childNode && Object.keys(this.nodeData.childNode).length) {
        let node = JSON.parse(JSON.stringify(this.nodeData.childNode))
        this.$set(this.nodeData, 'childNode', {
          name: '抄送节点',
          type: 3,
          childNode: node
        })
      } else {
          this.$set(this.nodeData, 'childNode', {
          name: '审批节点',
          type: 3
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.add-node-button {
  user-select: none;
  width: 240px;
  padding: 20px 0 32px;
  display: flex;
  position: relative;
  top: 9px;
  z-index: 3;
  -webkit-box-pack: center;
  justify-content: center;
  flex-shrink: 0;
  -webkit-box-flex: 1;
  flex-grow: 1;
  &>.btn{
    height: 32px;
    position: relative;
    z-index: 3;
  }
  &__icon{
    color: #FF8E3D;
    width: 28px;
    height: 28px;
    border-radius: 4px;
    border-width: 0 ;
    background-color: #ffffff;
    box-shadow: 0 0 7px 2px rgba(0, 0, 0, 0.1);
    font-size: 14px;
    padding:0 ;
    text-align: center;
    line-height: 28px;
  }
}
</style>
