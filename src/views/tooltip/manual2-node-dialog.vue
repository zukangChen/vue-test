<!--
 * @Author: 陈祖康
 * @Date: 2021-05-18 15:27:49
 * @LastEditors: 陈祖康
 * @LastEditTime: 2021-09-27 16:54:57
 * @Description: 人工节点弹窗(应产品要求重写)
 * @Props:
 * @Emit:
-->
<template>
  <el-dialog class="manual-node-dialog" :title="dialogTitle" width="800px"  :visible.sync="isActive" :before-close="cancel" :close-on-click-modal="false">
    <p>{{ $t('nouns.field') }}（{{fieldLength}}/3） {{ $t('nouns.custom') }} ({{ zLen }}/3)</p>
    <div class="tag-div">
      <el-tag
        v-for="(tag, index) in selectWidgetList"
        :key="index+tag.attr"
        closable
        :type="tag.content ? 'info':''"
        size="medium"
        :disable-transitions="false"
        @close="handleClose(tag)">
        {{tag ? (tag.attr ? tag.attrName : tag.content) : ''}}
      </el-tag>
      <el-input
        class="input-new-tag"
        v-if="inputVisible"
        v-model="inputValue"
        ref="saveTagInput"
        :maxlength="dialogTitle === '消息内容' ? 20 : 5"
        :max="5"
        size="mini"
        @keyup.enter.native="handleInputConfirm"
        @blur="handleInputConfirm"
      >
      </el-input>
      <template v-else>
        <el-button v-if="zLen < 3" class="button-new-tag" size="mini" @click="showInput">+ {{ $t('nouns.custom') }}</el-button>
      </template>
    </div>
    <div class="select-list">
      <!-- 表单列表 -->
      <template v-if="widgetList.length">
        <div class="list-item" v-for="(item, index) in widgetList" :key="index+item">
          <span class="select-list__title" @click="item.open = !item.open">
          {{item.nodeName}} <span v-if="!item.system">({{item.formName}})</span><i class="el-icon-caret-bottom isOpenIcon" :class="{'arrowTransForm': !item.open, 'arrowTransFormReturn': item.open}"></i>
          </span>
          <el-collapse-transition>
            <div v-show="item.open">
              <el-checkbox-group v-model="selectWidgetListText[item.workflowNodeId]" :max="max(item.workflowNodeId)">
                <el-checkbox
                  style="margin-bottom: 5px;"
                  @change="changebox(child, index, item.system)"
                  @click.native="checkboxClick(child.attr)"
                  v-for="child in item.explainList"
                  :key="child.attr"
                  :label="child.attr">
                  {{child.attrName}}
                </el-checkbox>
              </el-checkbox-group>
            </div>
          </el-collapse-transition>
        </div>
      </template>
      <template v-else>
        <p class="none-titp">{{ $t('workflow.triggerFormNoField') }}</p>
      </template>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel">{{ $t('operation.cancel') }} </el-button>
      <el-button type="primary" @click="submit">{{ $t('operation.confirm') }} </el-button>
    </span>
  </el-dialog>
</template>

<script>
import xbb from '@xbb/xbb-utils'
import { getTitleField } from '@/api/workflow-design'
export default {
  name: 'manualNodeDialog',
  props: {
    // 弹窗开关
    isActive: {
      type: Boolean,
      default: false
    },
    // 内容
    formContent: {
      type: Array,
      default: () => ([])
    },
    params: {
      // 参数对象
      type: Object,
      default: () => ({})
    },
    dialogTitle: {
      type: String,
      default: ''
    }
  },
  computed: {
    fieldLength () {
      return this.selectWidgetList.filter(item => item.attr).length || 0
    },
    zLen () {
      return this.selectWidgetList.filter(item => item.content).length || 0
    },
    max (workflowNodeId) {
      return (workflowNodeId) => {
        let max = 3 - this.selectWidgetList.filter(item => {
          return item.content ? !item.content : item.workflowNodeId !== workflowNodeId
        }).length
        return max > 0 ? max : -1
      }
    }
  },
  data () {
    return {
      widgetList: [], // 表单列表
      selectWidgetListText: {}, // 选中表单的字段回显Text
      selectWidgetList: [], // 选中字段列表
      inputVisible: false,
      inputValue: ''
    }
  },
  created () {
    this.init()
  },
  methods: {
    // 初始化
    init () {
      let {nodeId, prevId, workflowId, workflowNodeId, type} = this.params
      getTitleField({
        nodeId,
        prevId,
        workflowId,
        workflowNodeId,
        nodeType: type
      }).then((res) => {
        // 表单数组
        this.widgetList = res.result.nodeFieldList || []
        this.widgetList.forEach((form) => {
          this.$set(this.selectWidgetListText, form.workflowNodeId, [])
        })
        // 用于回显tag
        if (this.formContent.length) {
          this.selectWidgetList = xbb.deepClone(this.formContent)
          this.formContent.forEach((item) => {
          // system为1：系统表单 0 : 触发表单
            if (item.attr) this.selectWidgetListText[item.workflowNodeId].push(item.attr) // attr为空就是自定义标签
          })
        }
      })
    },
    // 确认
    submit () {
      this.$emit('update:formContent', this.selectWidgetList)
      this.$emit('dialogConfirmCancel')
    },
    cancel () {
      this.$emit('dialogConfirmCancel')
    },
    // 删除标签
    handleClose (tag) {
      tag.check = false
      // 标签删除
      if (tag.attr === '') {
        // 自定义标签
        let index = this.selectWidgetList.findIndex((item) => item.content === tag.content)
        index >= 0 && this.selectWidgetList.splice(index, 1)
      } else {
        // 触发表单和系统表单标签
        let index = this.selectWidgetList.findIndex((item) => (item.attr === tag.attr && item.workflowNodeId === tag.workflowNodeId))
        index >= 0 && this.selectWidgetList.splice(index, 1)
        // 表单字段删除
        let delIndex = this.selectWidgetListText[tag.workflowNodeId].findIndex(item => item === tag.attr)
        delIndex >= 0 && this.selectWidgetListText[tag.workflowNodeId].splice(delIndex, 1)
      }
    },
    // 打开自定义标签输入框
    showInput () {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    // 自定义标签输入
    handleInputConfirm () {
      let inputValue = this.inputValue.trim()
      let zLen = this.selectWidgetList.filter(item => item.content).length
      if (inputValue && zLen < 3) {
        this.selectWidgetList.push({
          'attr': '', // 生成标签时，前端生成的唯一键
          'content': inputValue, // 常量
          'subAttr': '' // 子表单内部attr
        })
      }
      this.inputVisible = false
      this.inputValue = ''
    },
    // 复选框发生变化时
    changebox (tag, index, system) {
      let {workflowNodeId, formId, saasMark, businessType} = this.widgetList[index]
      let tagForm = {
        attr: tag.attr,
        fieldType: tag.fieldType,
        attrName: tag.attrName,
        workflowNodeId: workflowNodeId,
        formId: formId,
        saasMark: saasMark,
        businessType: businessType,
        triggerNodeFlag: system, // 字段是否是触发节点字段的标识，0:不是；1:是
        system: system, // 是否为系统字段，0：不是；1：是
        property: system === 1 ? tag.attr : '' // 系统字段的属性 当system为1时：此字段才有值；（提交人；commitUser  触发表单：triggerForm）
      }
      // 如果被选中的数组中有则删除，没有则push
      let delIndex = this.selectWidgetList.findIndex((item) => (item.attr === tagForm.attr && item.workflowNodeId === tagForm.workflowNodeId))
      delIndex >= 0 ? this.selectWidgetList.splice(delIndex, 1) : this.selectWidgetList.push(tagForm)
    },
    // 点击复选框，判断已选字段是否大于3，大于给个弹框提示
    checkboxClick (tag) {
      let fieldTitles = this.selectWidgetList.filter(item => item.attr)
      if (fieldTitles.length >= 3) {
        let attrs = fieldTitles.map(item => item.attr)
        if (!attrs.includes(tag.attr)) {
          this.$message({
            message: this.$t('formDesign.dataNumberHint'),
            type: 'warning'
          })
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.manual-node-dialog{
  .no-fields{
    height: 100%;
    font-size: 20px;
    justify-content: center;
    display: flex;
    align-items: center;
    &>span{
      font-size: 20px;
    }
  }
  .el-checkbox {
    margin-left: 10px;
  }
  .el-checkbox+.el-checkbox {
    margin-left: 10px;
    margin-right: 10px;
  }

  .tag-div {
    height:90px;
    margin: 10px auto;
    border: 1px solid #c8c9cc;
    padding: 10px 10px;
    &>.el-tag{
      margin-right: 5px;
    }
  }
  .input-new-tag{
    width: 90px;
  }
  .button-new-tag{
    width: 90px;
  }
  .select-list {
    height:200px;margin: 10px auto;border: 1px solid #c8c9cc;
    padding: 9px 0 11px 12px;
    overflow: auto;
    .list-item {
      margin-bottom: 9px;
      .select-list__title {
        cursor: pointer;
        .isOpenIcon {
          color: #999999;
          font-size: 16px;
        }
        .arrowTransForm {
          transition: 0.2s;
          transform-origin: center;
          transform: rotateZ(180deg);
        }
        .arrowTransFormReturn {
          transition: 0.2s;
          transform-origin: center;
          transform: rotateZ(0deg);
        }
      }
    }
    /deep/ .el-select .el-input input {
      padding-left: 0;
      border: 0
    }
    /deep/ .el-checkbox {
      margin: 11px 20px 0 0;
    }
  }
  .none-titp {
    margin-top: 20px;
    padding-left: 10px;
  }
}
</style>
