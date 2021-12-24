/*
 * @Author: 陈祖康
 * @Date: 2021-11-09 14:23:21
 * @LastEditors: 陈祖康
 * @LastEditTime: 2021-11-09 15:39:53
 * @Description:提示框的自定义指令（本项目里还有一种用vuex管理的提示框，这里是全局指令的形式）
 * @Props:
 * @Emit:
 */
import Vue from 'vue'
import { Tooltip } from 'element-ui'

const Constructor = Vue.extend(Tooltip)
const instance = new Constructor()
instance.$mount('#v-tooltip')

export default {
  inserted(el, binding) {
    el.onmouseenter = function () {
      // 先消掉之前的
      instance.$refs.popper && (instance.$refs.popper.style.display = 'none')
      instance.doDestroy()

      // 设置挂载点 和 显示的内容
      instance.referenceElm = el
      instance.content = binding.value.toolTipContent
      // 提示框的位置
      instance.placement = binding.value.placement || 'bottom'

      instance.setExpectedState(true)
      instance.handleShowPopper()
    }
    el.onmouseleave = function () {
      instance.referenceElm = null
      instance.setExpectedState(false)
      instance.handleClosePopper()
    }
  }
}