/*
 * @Author: 陈祖康
 * @Date: 2021-09-09 15:06:30
 * @LastEditors: 陈祖康
 * @LastEditTime: 2021-09-14 09:52:14
 * @Description: 防抖
 * @Props: 
 * @Emit: 
 */
/**
 * 防抖函数一般用于防止重复点击或表单的重复提交，它只执行最后一次的提交
 * @param {*} method 需要防抖的方法
 * @param {*} dely 防抖时间 | 默认为0.5秒
 * @returns 
 */
let timer
const debounce = function (method, dely = 500) {
  // 不要把timer定义到函数内，因为定义到函数内，每次调用这个方法都会生成一个新的timer,这样就不会有防抖的效果
  // 如果你非要在函数方法里面定义timer，那你用的时候，得const getDebounce = debounce(method, dely),然后再getDebounce()去调用
  // let timer 

  let self=this
  return function(){
    timer && clearTimeout(timer)
    timer = setTimeout(() => {
      method.call(self)
    }, dely)
  }
  // let timer
  // return function () {
  //   let self = this
  //   let args = { ...arguments }
  //   if (timer) clearTimeout(timer)
  //   timer = setTimeout(() => {
  //     fn.call(self, ...args)
  //   }, dely)
  // }
}
/**
 * 使用
 * import * as utils from '@/views/yang/debounce/debounce' 
 * utils.debounce(this.debounceFn, 1000)()
 */

/**
 * 不使用return function () 返回闭包的形式
 *  let timer
    const debounce = function (method, dely=500) {
      let self = this
      timer && clearTimeout(timer)
        timer = setTimeout(()=> {
          method.call(self)
        }, dely)
    }
 * 
 * 
 */

/**
 * 使用
 * import * as utils from '@/views/yang/debounce/debounce' 
 * utils.debounce(this.debounceFn, 1000)
 */
export{ debounce }