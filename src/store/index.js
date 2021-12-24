/*
 * @Author: 陈祖康
 * @Date: 2020-08-02 15:21:44
 * @LastEditors: 陈祖康
 * @LastEditTime: 2021-09-07 10:40:15
 * @Description: vuex入口文件
 * @Props: 
 * @Emit: 
 */ 
import Vue from 'vue'
import Vuex from 'vuex'
import formData from './modules/form-data'
import tooltip from './modules/tooltip'
Vue.use(Vuex)

export default new Vuex.Store( {
  modules: {
    formData,
    tooltip
  }
})