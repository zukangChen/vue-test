/*
 * @Author: 陈祖康
 * @Date: 2021-09-07 09:57:10
 * @LastEditors: 陈祖康
 * @LastEditTime: 2021-10-19 17:07:39
 * @Description: tooltip
 * @Props: 
 * @Emit: 
 */
export default {
  state: {
    // toolTip: {
    //   ele: null,
    //   toolTipContent: '初始化',
    //   isShow: false,
    //   toolTipPlacement: 'top'
    // },
    toolTip: null,
    toolTipContent: '',
    toolTipPlacement: '' // 设置位置
  },
  getters: {
    toolTip: state => { return state.toolTip },
    toolTipContent: (state) => state.toolTipContent,
    toolTipPlacement: (state) => state.toolTipPlacement
  },
  mutations: {
    // 挂载
    MOUNT_TOOL_TIP(state, node) {
      console.log('vuex')
      state.toolTip = node
    },
    // 初始化
    INIT_TOOL_TIP(state, obj) {
      console.log('INIT')
      // 设置挂载点的要展示的提示内容的Dom
      state.toolTip.referenceElm = obj.node
      // 先消掉之前的
      if (state.toolTip.$refs.popper) state.toolTip.$refs.popper.style.display = 'none'
      state.toolTip.doDestroy()

      // 设置组件内的条件变量为true,否则无法调用handleClosePopper
      state.toolTip.setExpectedState(true)
      // 展示新的tool-tip
      state.toolTip.handleShowPopper()
      // 填入内容
      state.toolTipContent = obj.content
      // 设置位置
      state.toolTipPlacement = obj.placement

      // console.log('obj', obj)
      // state.toolTip.toolTipContent = obj.content
      // state.toolTip.ele = obj.node
      // state.toolTip.isShow = true
      // state.toolTip.toolTipPlacement = obj.placement
      // console.log('state', state)
    },
    // 关闭
    CLOSE_TOOL_TIP(state) {
      console.log('CLOSE')
      state.toolTip.setExpectedState(false)
      state.toolTip.handleClosePopper()
      // state.toolTip
    }
  }
}