<!--
 * @Author: 陈祖康
 * @Date: 2020-08-01 19:51:30
 * @LastEditors: 陈祖康
 * @LastEditTime: 2020-08-01 20:02:18
 * @Description: 
 * @Props: 
 * @Emit: 
--> 
<template>
  <div id="app">
		<top-component :head="head" :message="msg"></top-component>
	</div>
</template>
	<script>
  import Vue from 'vue'
  export default {
    data() {
      return {
        msg:'this is last child',
        head:[
          {title:'product list'},
          {title:'query center'},
          {title:'order system'}
          ]
      }	
    },
    created() {
    Vue.component('top-component',{
		render:function(createElement){
			return createElement('h1',
				{
					attrs:{id:1},
					on:{
						click:() => {console.log(this.message)}
					},
				},
				[ '来吧',
          createElement('child-component',{props:{titles:this.message}})])
		},
      props:['message','head']
      
    })
    Vue.component('child-component',{
      props:['titles'],
      render:function(createElement){
        return createElement('i',this.titles)
      }
    })
    }
  }
	</script>