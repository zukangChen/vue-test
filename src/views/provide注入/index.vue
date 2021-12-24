<!--
 * @Author: 陈祖康
 * @Date: 2020-09-19 16:12:19
 * @LastEditors: 陈祖康
 * @LastEditTime: 2020-09-19 17:43:16
 * @Description: 
 * @Props: 
 * @Emit: 
-->
<template>
	<div>
		<h1>A 组件</h1>
    <span>我是{{theme.color}}</span>
		<button @click="() => changeColor()">改变color</button>
		<ChildrenB />
	</div>
</template>

<script>
import Vue from 'vue'
import ChildrenB from './childB'
export default {
	data() {
		return {
			theme: {
				name: 'dd',
			},
      color: 'blue',
      name: '小康'
		}
	},
	components: { ChildrenB },
	//  provide() {
	//   return {
	//     theme: {
	//     color: this.color //这种方式绑定的数据并不是可响应的
	//     } // 即A组件的color变化后，组件D、E、F不会跟着变
	//   };
	// },
	// provide() {
	// 	return {
	// 		theme: this.name, //方法一：提供祖先组件的实例
	// 	}
	// },
	// methods: {
	// 	changeColor(color) {
	//     console.log('改变颜色')
	// 		if (color) {
	// 			this.color = color
	// 		} else {
	// 			this.color = this.color === 'blue' ? 'red' : 'blue'
	// 		}
	// 	},
	// },
	// 方法二:使用vue2.6最新API Vue.observable 优化响应式 provide
	provide() {
		this.theme = Vue.observable({
			color: 'blue',
		})
		return {
      theme: this.theme,
      name: this.name
		}
	},
	methods: {
		changeColor(color) {
			if (color) {
				this.theme.color = color
			} else {
				this.theme.color = this.theme.color === 'blue' ? 'red' : 'blue'
			}
		},
	},
}
</script>

<style>
</style>