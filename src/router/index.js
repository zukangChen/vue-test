/*
 * @Author: 陈祖康
 * @Date: 2020-07-19 14:44:38
 * @LastEditors: 陈祖康
 * @LastEditTime: 2021-11-11 16:47:20
 * @Description: router配置
 * @Props: 
 * @Emit: 
 */
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// const routerList = []
// function importAll (r) {
//   console.log('r', r)
//   r.keys().map( (key)=> {
//     console.log('key', key)
//     routerList.push(r(key).default)
//   })
// }
// importAll(require.context("../views", true , /\.vue/));
// const routers = [...routerList]
// console.log('routers', routers)
// const router = new Router({
//   routers
// })
// export default router
export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('@/App.vue'),
      redirect: './yang',
      meta: { title: 'app.vue' }
    },
    {
      path: '/a',
      name: 'a',
      redirect: './a/b',
      meta: { title: '测试多级路由跳转' },
      component: () => import('@/views/a/index'),
      children: [
        {
          path: 'b',
          component: () => import('@/views/a/b.vue')
        }
      ],
    },
    {
      path: '/v-deep',
      name: 'v-deep',
      component: () => import('@/views/v-deep穿透/index.vue'),
      meta: { title: 'vue的穿透属性' }
    },
    {
      path: '/validator',
      name: 'validator',
      component: () => import('@/views/cube-ui/index.vue'),
      meta: { title: 'cube-ui的validator校验组件' }
    },
    {
      path: '/event',
      name: 'event',
      component: () => import('@/views/事件参数$event/index.vue'),
      meta: { title: '事件参数$event' }
    },
    {
      path: '/require-context',
      name: 'require-context',
      component: () => import('@/views/自动化引入模块/index.vue'),
      meta: { title: '自动化引入模块' }
    },
    {
      path: '/observable',
      name: 'observable',
      component: () => import('@/views/vue-observable/index.vue'),
      meta: { title: '让一个对象可响应' }
    },
    {
      path: '/form',
      name: 'form',
      component: () => import('@/views/form/index.vue'),
      meta: { title: 'form表单，自定义v-modal' }
    },
    {
      path: '/computed',
      name: 'computed',
      component: () => import('@/views/计算属性/index.vue'),
      meta: { title: 'computed' }
    },
    {
      path: '/validate',
      name: 'validate',
      component: () => import('@/views/form/validate.vue'),
      meta: { title: '表单验证' }
    },
    {
      path: '/slot',
      name: 'slot',
      component: () => import('@/views/v-slot/index.vue'),
      meta: { title: 'v-slot插槽' }
    },
    {
      path: '/cascader',
      name: 'cascader',
      component: () => import('@/views/级联组件/index.vue'),
      meta: { title: 'element的级联组件' }
    },
    {
      path: '/table',
      name: 'Table',
      component: () => import('@/views/el-table封装/index.vue'),
      meta: { title: 'element的表格封装' }
    },
    {
      path: '/prop',
      name: 'myProp',
      component: () => import('@/views/prop传值/index.vue'),
      meta: { title: 'myProp传值' }
    },
    {
      path: '/provide',
      name: 'provide',
      component: () => import('@/views/provide注入/index.vue'),
      meta: { title: 'provide' }
    },
    {
      path: '/upload',
      name: 'upload',
      component: () => import('@/views/el-upload/index.vue'),
      meta: { title: 'upload' }
    },
    {
      path: '/watermark',
      name: 'watermark',
      component: () => import('@/views/水印/index.vue'),
      meta: { title: 'watermark' }
    },
    {
      path: '/maodian',
      name: 'maodian',
      component: () => import('@/views/锚点/index.vue'),
      meta: { title: '锚点' }
    },
    {
      path: '/yang',
      name: 'yang',
      component: () => import('@/views/yang/index.vue'),
      meta: { title: '锚点' }
    },
    {
      path: '/publish',
      name: 'publishSubscribers',
      component: () => import('@/views/publish-subscribers/index.vue')
    },
    {
      path: '/carousel',
      name: 'carousel',
      component: () => import('@/views/走马灯/index.vue')
    },
    {
      path: '/laout',
      name: 'laout',
      component: () => import('@/views/laout/index.vue')
    },
    {// tooltip提示框
      path: '/tooltip',
      name: 'tooltip',
      component: () => import('@/views/tooltip/index.vue')
    }
  ]
})