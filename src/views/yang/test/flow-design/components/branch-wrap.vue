<!--
 * @Author: xuwang.bao
 * @LastEditors: 陈祖康
 * @Description: 条件节点的包裹组件
 * @$emit:
 * @$slot:
 * @Date: 2019-04-08 16:21:45
 * @LastEditTime: 2021-07-20 15:49:53
 -->
<template>
  <div class="new-branch-wrap">
    <div class="branch-box-wrap">
      <transition-group
        appear
        tag="div"
        :style="borderStyle"
        ref="branchBox"
        class="branch-box">
        <el-button
          key="btn"
          v-show="![3, 4].includes(nodeData.conditionNodes[0].conditionType)"
          @click="addCondition"
          class="add-branch list-complete-item"
        >
        {{ $t('authoritySettting.addingConditions') }}
        </el-button>
        <!-- 循环条件 -->
        <template v-for="(cond,index) in nodeData.conditionNodes">
          <div :key="cond.nodeId" class="col-box list-complete-item">
            <!-- 遮蔽左侧 -->
            <template>
              <div class="top-left-cover-line cover-line"></div>
              <div class="bottom-left-cover-line cover-line"></div>
            </template>
            <!-- 遮蔽右侧 -->
            <template>
              <div class="top-right-cover-line cover-line"></div>
              <div class="bottom-right-cover-line cover-line"></div>
            </template>
            <!-- 条件分支 -->
            <ConditionNode
              :key="`condition-node-${cond.nodeId}`"
              @beforeSort="beforeSort"
              @afterSort="afterSort"
              @deleteBranch="deleteBranch"
              @cloneConditionNode="cloneConditionNode"
              :parentNode="nodeData"
              :index="index"
              :nodeData="cond"
            />
          </div>
        </template>
      </transition-group>

      <!-- 新建节点 -->
      <div class="add-node-btn-box">
        <div class="add-node-btn">
          <AddNodeButton :readonly="!!readonly" :isWrapBtn="true" :nodeData="nodeData"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import utilMixin from './../mixin/util-mixin'
import ConditionNode from './condition-node'
import { guid } from '@/utils/uuid'
import { workflowNodeSave } from '@/api/workflow-design'
export default {
  name: 'branch-wrap',
  components: {
    ConditionNode
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

  data () {
    return {
      showBorder: true
    }
  },

  computed: {
    borderStyle () {
      return this.showBorder ? {} : { 'border-color': 'transparent' }
    }
  },

  methods: {
    init () {},
    // 添加一个普通条件分支
    addCondition () {
      this.beforeSort()
      let newNodeId = guid()
      const prevId = this.nodeData.nodeId
      const priority = this.nodeData.conditionNodes.length + 1
      const { workflowId, triggerType } = this.flowIndex.workFlowInfo
      let postData = {
        workflowId,
        workflowNode: {
          type: 5,
          name: `条件分支${priority}`,
          appId: 0,
          formId: 0,
          menuId: 0,
          saasMark: 0,
          businessType: 0,
          triggerType,
          nodeId: newNodeId,
          prevId,
          priority,
          wrapperId: prevId,
          coreConfiguration: {
            conditionNode: {
              conditionType: 1,
              condition: [],
              type: 1
            }
          }
        }
      }
      workflowNodeSave(postData).then((res) => {
        const { workflowNodeTree } = res.result
        this.flowIndex.$emit('branchUpdate', workflowNodeTree)
      }).finally(() => {
        this.afterSort()
      })
    },
    // 复制条件节点
    cloneConditionNode (index, cloneData) {
      // 复制的数据递归处理nodeId、prevId以及isHistory
      function dealCloneData (node, prevId) {
        node.nodeId = guid()
        node.prevId = prevId || node.prevId
        node.isHistory = void 0
        if (node.childNode) {
          dealCloneData(node.childNode, node.nodeId)
        } else if (node.conditionNodes) {
          node.conditionNodes.forEach(item => {
            dealCloneData(item, node.nodeId)
          })
        }
      }
      dealCloneData(cloneData)
      this.nodeData.conditionNodes.splice(index + 1, 0, Object.assign(cloneData, {
        priority: cloneData.priority + 1
      }))
      // 名称也要复制
      /* {
        'name': this.$t('authoritySettting.condition') + (this.nodeData.conditionNodes.length + 1)
      } */
    },
    deleteBranch () {
      // this.$set(this.parentNode, 'childNode', children)
    },
    beforeSort () {
      this.showBorder = false
    },
    afterSort () {
      this.showBorder = true
    }
  }
}
</script>

<style lang="scss">
/* 过度动画 */
.list-complete-enter, .list-complete-leave-to
/* .list-complete-leave-active for below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(-60px);
}
.list-complete-leave-active {
  position: absolute;
}
.list-complete-move{
  position: absolute;
  &>.cover-line{
    display: block!important;
  }
}
/* 布局 */
.new-branch-wrap {
  display: inline-flex;
  width: 100%;
  &>.branch-box-wrap{
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    min-height: 270px;
    width: 100%;
    -ms-flex-negative: 0;
    flex-shrink: 0;
    &>.branch-box{
      transition: all 1s;
      display: flex;
      overflow: visible;
      min-height: 180px;
      height: auto;
      border-bottom: 2px solid #ccc;
      border-top: 2px solid #ccc;
      position: relative;
      // margin-top: 15px;
      &>.add-branch{
        border: none;
        outline: none;
        user-select: none;
        justify-content: center;
        font-size: 12px;
        padding: 0 10px;
        height: 30px;
        line-height: 30px;
        border-radius: 15px;
        color: #3296fa;
        background: #fff;
        box-shadow: 0 2px 4px 0 rgba(0,0,0,.1);
        position: absolute;
        top: -16px;
        left: 50%;
        transform: translateX(-50%);
        transform-origin: center center;
        cursor: pointer;
        z-index: 10;
        display: inline-flex;
        align-items: center;
        -webkit-transition: all .3s cubic-bezier(.645,.045,.355,1);
        transition: all .3s cubic-bezier(.645,.045,.355,1);
      }
      &>.list-complete-item{
        &:nth-child(2){
          &>.top-left-cover-line{
            display: block;
          }
          &>.bottom-left-cover-line{
            display: block;
          }
        }
        &:last-child{
          &>.top-right-cover-line{
            display: block;
          }
          &>.bottom-right-cover-line{
            display: block;
          }
        }
      }
      &>.col-box{
        transition: all .4s;
        background: #f5f5f7;
        display: inline-flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        flex-direction: column;
        -webkit-box-align: center;
        align-items: center;
        position: relative;
        &::before{
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 0;
          margin: auto;
          width: 2px;
          height: 100%;
          background-color: #cacaca;
        }
        &>.top-left-cover-line{
          display: none;
          left: -1px;
          position: absolute;
          height: 3px;
          width: 50%;
          background-color: #f5f5f7;
          top: -2px;
        }
        &>.top-right-cover-line{
          display: none;
          position: absolute;
          height: 3px;
          width: 50%;
          background-color: #f5f5f7;
          top: -2px;
          right: -1px;
        }
        &>.bottom-left-cover-line{
          display: none;
          position: absolute;
          height: 3px;
          width: 50%;
          background-color: #f5f5f7;
          bottom: -2px;
          left: -1px;
        }
        &>.bottom-right-cover-line{
          display: none;
          right: -1px;
          position: absolute;
          height: 3px;
          width: 50%;
          background-color: #f5f5f7;
          bottom: -2px;
        }
      }
    }

    &>.add-node-btn-box{
      width: 240px;
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
        width: 240px;
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
}
</style>
