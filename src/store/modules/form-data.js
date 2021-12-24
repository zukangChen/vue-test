/*
 * @Author: 陈祖康
 * @Date: 2020-08-02 15:33:15
 * @LastEditors: 陈祖康
 * @LastEditTime: 2020-08-19 14:25:50
 * @Description: 表单数据
 * @Props: 
 * @Emit: 
 */ 
export default {
  state: {
    show: '',
    title: '开心',
    dialogShow: false, // 弹窗的显示隐藏
    token: '19970901', // 模拟请求的token值
  },
  getters: {
    getToken: state => {
      //模拟请求的token值
      return state.token
    },
    getTitle: state => {
      return state.title
    },
    getDialogShow: state => {
      return state.dialogShow
    }
  },
  mutations: {
    SET_TITLE (state, val) {
      //新建表单的标题
      state.title = val
    },
    SET_DIALOG_SHOW (state, val) {
      //控制弹窗的开关
      state.dialogShow = val
    },
    CONTROL_SHOW(state, show) {
      //控制开关
      state.show = show
    }
  },
  actions: {
    controlShow({commit}, val) {
      commit('CONTROL_SHOW', val)
    },
    controlDialog({commit}, val) {
      commit('SET_DIALOG_SHOW', val)
    },
    controlTitle({commit}, val) {
      commit('SET_TITLE', val)
    }
  }
}
