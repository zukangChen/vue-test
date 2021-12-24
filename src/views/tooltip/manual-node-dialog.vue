<!--
 * @Author: 陈祖康
 * @Date: 2021-05-18 15:27:49
 * @LastEditors: 陈祖康
 * @LastEditTime: 2021-09-27 09:17:20
 * @Description: 人工节点弹窗 (当时掉头发写的组件，后来产品要改，得重新写了)
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
      <!-- 触发表单 -->
      <div class="el-dropdown-trigger" v-if="triggerForms.length">
        <el-dropdown trigger="click" @command="handleCommand" placement="bottom-start">
          <span>
            {{ $t('logView.triggerForm') }}({{triggerFormTitle}})<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item :command="index" v-for="(form, index) in triggerForms" :key="form.attr">{{form.nodeName}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <template v-if="TriggerList.length">
          <el-checkbox-group v-model="selectTriggerListText[triggerForms[triggerFormIndex].workflowNodeId]" :max="max >0 ? max : -1">
            <el-checkbox
              style="margin-bottom: 5px;"
              @click.native="checkboxClick(item)"
              @change="changebox(item, 'triggerNodeFlag')"
              v-for="item in TriggerList"
              :key="item.attr"
              :label="item.attr">
              {{item.attrName}}
            </el-checkbox>
          </el-checkbox-group>
        </template>
        <template v-else>
          <p class="none-titp">{{ $t('workflow.triggerFormNoField') }}</p>
        </template>
      </div>
      <!-- 系统字段 -->
      <div class="el-dropdown-system" v-if="commonFileds.length">
        <el-dropdown trigger="click" @command="changeSystemField" placement="bottom-start">
          <span>
            {{ $t('logView.systemForm') }}({{commonFileds[this.commonFiledsIndex].nodeName}})<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item :command="index" v-for="(common, index) in commonFileds" :key="common.attr">{{common.nodeName}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-checkbox-group v-model="selectCommonListText[commonFileds[commonFiledsIndex].workflowNodeId]" :max="max2>0 ? max : -1">
          <el-checkbox
            style="margin-bottom: 5px;"
            @click.native="checkboxClick(item)"
            @change="changebox(item, 'system')"
            v-for="item in commonList"
            :key="item.attr"
            :label="item.attr">
            {{item.attrName}}
          </el-checkbox>
        </el-checkbox-group>
      </div>
      <template v-if="triggerForms.length <= 0">
        <div class="no-fields">
          <span>{{ $t('formDesign.noFieldsToTitle') }}</span>
        </div>
      </template>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel">{{ $t('operation.cancel') }} </el-button>
      <el-button type="primary" @click="submit">{{ $t('operation.confirm') }} </el-button>
    </span>
  </el-dialog>
</template>

<script>
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
    max () {
      return 3 - this.selectWidgetList.filter(item => {
        return item.content ? !item.content : (item.workflowNodeId !== this.triggerForms[this.triggerFormIndex].workflowNodeId || item.system)
      }).length
    },
    max2 () {
      return 3 - this.selectWidgetList.filter(item => {
        return item.content ? !item.content : (item.workflowNodeId !== this.commonFileds[this.commonFiledsIndex].workflowNodeId || item.triggerNodeFlag)
      }).length
    },
    // 被选系统列表
    commonList () {
      return this.commonFileds.length && this.commonFileds[this.commonFiledsIndex].explainList
    },
    // 被选触发表单列表
    TriggerList () {
      return this.triggerForms.length && this.triggerForms[this.triggerFormIndex].explainList
    },
    // 选中触发表单的title
    triggerFormTitle () {
      return this.triggerForms.length && this.triggerForms[this.triggerFormIndex].nodeName
    },
    // 选中触发表单的字段
    selectTriggerList () {
      // [].concat(...this.triggerForms.map(item => item.fields))将触发所有表单的fields数组字段整合成一个数组对象
      return [].concat(...this.triggerForms.map(item => item.explainList)).filter(item => this.selectTriggerListText.includes(item.attr))
    },
    // 选中的系统字段
    selectCommonList () {
      return [].concat(...this.commonFileds.map(item => item.explainList)).filter(item => this.selectCommonListText.includes(item.attr))
    }
  },
  data () {
    return {
      selectWidgetList: [], // 选中字段列表
      selectTriggerListText: {}, // 选中触发表单的字段回显Text
      selectCommonListText: [], // 选中系统的字段回显Text
      customFields: [], // 自定义字段
      triggerFormIndex: 0, // 触发表单value
      commonFiledsIndex: 0, // 系统字段Value
      triggerForms: [], // 触发表单字段列表
      commonFileds: [], // 系统表单字段列表
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
      // 触发表单数组
        this.triggerForms = res.result.nodeFieldList || []
        this.triggerForms.forEach((form) => {
          this.$set(this.selectTriggerListText, form.workflowNodeId, [])
        })
        // 系统表数组
        this.commonFileds = res.result.systemFieldList || [] // 系统表
        this.commonFileds.forEach((form) => {
          this.$set(this.selectCommonListText, form.workflowNodeId, [])
        })
        // 用于回显tag
        if (this.formContent.length) {
          this.selectWidgetList = this.formContent
          this.formContent.forEach((item) => {
          // system为1：系统表单 0 : 触发表单
            if (item.attr) {
              // attr为空就是自定义标签
              item.system ? this.selectCommonListText[item.workflowNodeId].push(item.attr) : this.selectTriggerListText[item.workflowNodeId].push(item.attr)
            }
          })
        }
      })
    },
    // 切换触发表单
    handleCommand (command) {
      this.triggerFormIndex = command
    },
    // 切换系统字段
    changeSystemField (command) {
      this.commonFiledsIndex = command
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
      }
      if (tag.triggerNodeFlag) {
        // 触发表单删除
        const triggerIndex = this.selectTriggerListText[tag.workflowNodeId].findIndex(item => item === tag.attr)
        triggerIndex >= 0 && this.selectTriggerListText[tag.workflowNodeId].splice(triggerIndex, 1)
      } else if (tag.system) {
        // 系统表单删除
        const systemIndex = this.selectCommonListText[tag.workflowNodeId].findIndex(item => item === tag.attr)
        systemIndex >= 0 && this.selectCommonListText[tag.workflowNodeId].splice(systemIndex, 1)
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
    changebox (tag, form) {
      // 判断是触发表单还是系统表单
      let {workflowNodeId, formId, saasMark, businessType} = form === 'system' ? this.commonFileds[this.commonFiledsIndex] : this.triggerForms[this.triggerFormIndex]
      let tagForm = {
        attr: tag.attr,
        fieldType: tag.fieldType,
        attrName: tag.attrName,
        workflowNodeId: workflowNodeId,
        formId: formId,
        saasMark: saasMark,
        businessType: businessType,
        triggerNodeFlag: form === 'system' ? 0 : 1, // 字段是否是触发节点字段的标识，0:不是；1:是
        system: form === 'system' ? 1 : 0, // 是否为系统字段，0：不是；1：是
        property: form === 'system' ? tag.attr : '' // 系统字段的属性 当system为1时：此字段才有值；（提交人；commitUser  触发表单：triggerForm）
      }
      // 如果被选中的数组中有则删除，没有则push
      let index = this.selectWidgetList.findIndex((item) => (item.attr === tagForm.attr && item.workflowNodeId === tagForm.workflowNodeId))
      index >= 0 ? this.selectWidgetList.splice(index, 1) : this.selectWidgetList.push(tagForm)
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
/deep/ .el-dropdown-menu__item {
      width: 120px;
    }
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
    .el-dropdown-menu__item {
      width: 120px;
    }
    /deep/ .el-select .el-input input {
      padding-left: 0;
      border: 0
    }
    /deep/ .el-dropdown {
      cursor: pointer;
    }
    /deep/ .el-checkbox {
      margin: 11px 20px 0 0;
    }
    .el-dropdown-system {
      margin-top: 25px;
    }
  }
  .none-titp {
    margin-top: 20px;
    padding-left: 10px;
  }
}

</style>
<style lang="scss">
.manual-node-dialog{
  .select-list {
    .el-dropdown-menu__item {
      width: 120px!important;
    }
  }
}
</style>
