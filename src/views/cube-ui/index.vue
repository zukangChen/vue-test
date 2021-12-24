<!--
 * @Author: 陈祖康
 * @Date: 2020-07-19 16:42:39
 * @LastEditors: 陈祖康
 * @LastEditTime: 2020-07-19 16:45:37
 * @Description: cube-ui的validator
 * @Props: 
 * @Emit: 
--> 
<template>
	<div class="index">
		<div class="validator-item">
			<p>Async validate:</p>
			<cube-validator
				v-model="valid"
				:model="captcha"
				:rules="rules"
				:messages="messages"
				:immediate="immediate"
				@validating="validatingHandler"
				@validated="validatedHandler"
			>
				<cube-input v-model="captcha" placeholder="Please input captcha"></cube-input>
			</cube-validator>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			valid: undefined,
			captcha: '',
			rules: {
				type: 'number',
				required: true,
				len: 6,
				captchaCheck: val => {
					return resolve => {
						setTimeout(() => {
							resolve(val === '123456')
						}, 1000)
					}
					/** or return promise:
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve(val === '123456')
            }, 1000)
          })
          **/
				}
			},
			messages: {
				captchaCheck: 'Please input "123456"'
			}
		}
	},
	methods: {
		validatingHandler() {
			console.log('validating')
		},
		validatedHandler() {
			console.log('validated')
		}
	}
}
</script>

<style scoped>
</style>
