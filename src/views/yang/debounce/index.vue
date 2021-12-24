<!--
 * @Author: 陈祖康
 * @Date: 2020-12-09 19:33:18
 * @LastEditors: 陈祖康
 * @LastEditTime: 2021-08-05 10:34:54
 * @Description: 防抖节流
 * @Props: 
 * @Emit: 
-->
<template>
  <div class="debounce">
    <h2>smile</h2>
    <button @click="beforedebounce">防抖</button>
    <button @click="beforethrottle">节流</button>
    <div :class="{'isTest': isTest, 'content': true}">
      content
      <div class="box" @click="changeTest">
        box
      </div>
    </div>
    <span>{{member.role}}</span>
    <button @click="member.role++">加</button>
  </div>
</template>
<script>
// 引入防抖函数，我们也可以把这个防抖函数的方法挂在到全局，让它成为一个全局方法
import * as utils from '@/views/yang/debounce/debounce' 
let pre = Date.now()
let firstTime = true
export default {
  data () {
    return {
      confirmDebounce: '',
      timer: null,
      num: 0,
      isTest: false
    }
  },
  mounted() {
  },
  computed: {
    member() {
      return this.itemMember
    }
  },
  props: {
    itemMember:{
      typeof: Object,
      default() {
        return {
          role: 1
        }
      }
    }
  },
  methods: {
    changeTest() {
      console.log('ww', this.isTest)
      this.isTest = true
    },
    beforedebounce () {
      utils.debounce(this.debounceFn, 1000)()
      utils.debounce(()=>{console.log('22')}, 1000)()
      // this.debounce(this.debounceFn, 1000)()
    },
    // 防抖函数
    debounce(fn, dely=500) {
      console.log(12312312)
      // let timer = null // 在vue文件里写防抖方法，该timer要在data里定义否则每次点击防抖按钮，timer都会重新被覆盖。从而导致每次都会执行fn方法，导致防抖方法无效
      let self = this
      return function() {
        self.timer && clearTimeout(self.timer)
        self.timer = setTimeout(()=> {
          self.timer = null
          fn.call(self)
        }, dely)
      }
    },
    debounceFn() {
      console.log('防抖')
    },
    beforethrottle() {
      this.throttle(this.throttleFn, 1000)
    },
    throttle (fn,dely = 500) {
      let now = Date.now()
      console.log('now', now)
      if (now - pre > dely || firstTime) {
        pre = now
        firstTime = false
        fn.call(this)
      }
    },
    throttleFn() {
      console.log('节流')
    }
  }
}
</script>

<style scoped>
.debounce {
  width: 100%;
  height: 100%;
}
.content {
  width: 200px;
  height: 300px;
  background-color: pink;
  padding: 10px;
  /* position: relative; */
  display: flex;
}
.box {
  /* left: 0;
  top: 0;
  right: 0;
  bottom: 0; */
  width: 20px;
  height: 20px;
  margin: auto;
  /* position: absolute; */
  background-color: blue;
  /* transition: width 1s ease-in 0.1s; */
}
.box:hover {
  height: 50px;
  width: 100px;
  background-color: red;
  /* transition: all 5s ease-in 2s; */
   /* transition-property: width; 
   transition-duration:1s ,1s; */
  transition: width 5s ease-in 1s;
}
.isTest {
  height: 100px;
  width: 100px;
  background-color: red;
  transition: width 1s ease-in 0.1s;
}

</style>