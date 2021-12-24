/*
 * @Author: xuwang.bao
 * @LastEditors: yuelin.ye
 * @Description: 一些公共逻辑mixin
 * @$emit:
 * @$slot:
 * @Date: 2019-04-09 09:43:07
 * @LastEditTime: 2021-06-07 14:36:39
 */
import AddNodeButton from './../components/add-node-button'

export default {
  inject: {
    flowIndex: {default: null}
  },
  props: {
    parentNode: {
      // 父节点
      required: true,
      default: () => ({})
    }
  },
  components: {
    AddNodeButton
  }
}
