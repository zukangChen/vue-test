/*
 * @Author: 陈祖康
 * @Date: 2020-03-30 16:43:48
 * @LastEditors: 陈祖康
 * @LastEditTime: 2021-11-09 14:34:44
 * @Description: 
 * @Props: 
 * @Emit: 
 */
import Vue from 'vue'
import store from '../src/store'
import less from 'less'
import Vant from 'vant';
import 'vant/lib/index.css';
require('../src/mock/index.js')//引入mock

// import '@/assets/icons/iconfont.css' 本地引入iconFont的css地址
import * as smile from 'smile-util-tools' // 引入npm包
// console.log('啥啊', smile.isArray([]))
// import './cube-ui'
import router from './router/index'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import event from '@/views/publish-subscribers/publish.js'
// 引入utils的工具方法
import utils from '@/utils/index'
// 加入全局指令（目前只有一个v-tooltip的全局指令）
import '@/directives/index'
if (window.utils === undefined) window.utils = utils // 将utils方法绑定到全局对象
Vue.use(Vant)
Vue.use(less)
Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.smile = smile
Vue.prototype.$myMessage = (show, title) => {
  console.log(show, title)
  store.dispatch('controlDialog', show)
  store.dispatch('controlTitle', title)
}
Vue.prototype.event = event
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
