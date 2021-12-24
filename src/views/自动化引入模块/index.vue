<!--
 * @Author: 陈祖康
 * @Date: 2020-07-26 16:05:25
 * @LastEditors: 陈祖康
 * @LastEditTime: 2020-07-26 16:45:10
 * @Description: 自动化引入模块（requireContext）
 * @Props: 
 * @Emit: 
--> 
<template>
	<div class="require">
    show time
    <require> </require>
    <require2></require2>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
	data() {
		return {
      name: 'xiaoqi'
    }
	},
	created() {
		const requireComponent = require.context(
			// 其组件目录的相对路径
			'../../components',
			// 是否查询其子目录
			true,
			// 匹配基础组件文件名的正则表达式
			/\w+\.vue$/
    )
    console.log('requireComponent', requireComponent)
		requireComponent.keys().forEach((fileName) => {
      // 获取组件配置
      console.log('fileName', fileName)
			const componentConfig = requireComponent(fileName)
			let componentName = fileName
				.split('/')
				.pop()
				.replace(/\.\w+$/, '')
			if (componentName === 'index') {
				componentName = componentConfig.default.name
      }
      console.log(componentName)
			// 全局注册组件
			Vue.component(
				componentName,
				// 如果这个组件选项是通过 `export default` 导出的，
				// 那么就会优先使用 `.default`，
				// 否则回退到使用模块的根。
				componentConfig.default || componentConfig
			)
		})
	},
}
</script>

<style>
</style>