<!--
 * @Author: 陈祖康
 * @Date: 2020-11-30 19:03:39
 * @LastEditors: 陈祖康
 * @LastEditTime: 2020-12-01 09:57:16
 * @Description: 水印
 * @Props: 
 * @Emit: 
-->
<template>
  <div class="app">
        <h1>秋风</h1>
        <p>hello</p>
</div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  mounted() {
    // const demo = this.$createElement('span', {'style': {
    //   color: 'red'
    // }}, `陈`)
    // console.log('demo',demo,document.getElementsByClassName("app")[0])
    // demo.$mounted(document.getElementsByClassName("app")[0])
    const waterWrapper = document.createElement('div');
    this.cssHelper(waterWrapper, {
          position: 'fixed',
          top: '0px',
          right: '0px ',
          bottom: '0px',
          left: '0px',
          overflow: 'hidden',
          display: 'flex',
          'flex-wrap': 'wrap',
          'pointer-events': 'none'
      })
    const waterHeight = 100;
    const waterWidth = 180;
    const { clientWidth, clientHeight } = document.documentElement || document.body;
    const column = Math.ceil(clientWidth / waterWidth);
    const rows = Math.ceil(clientHeight / waterHeight);
    for (let i = 0; i < column * rows; i++) {
        const wrap = document.createElement('div');
        this.cssHelper(wrap, Object.create({
            position: 'relative',
            width: `${waterWidth}px`,
            height: `${waterHeight}px`,
            flex: `0 0 ${waterWidth}px`,
            overflow: 'hidden',
        }));
        wrap.appendChild(this.createItem());
        waterWrapper.appendChild(wrap)
    }
    document.body.appendChild(waterWrapper)
  },
  methods: {
   cssHelper(el, prototype) {
      for (let i in prototype) {
        el.style[i] = prototype[i]
      }
    },
    createItem() {
        const item = document.createElement('div')
        item.innerHTML = '小康的笔记'
        this.cssHelper(item, {
            position: 'absolute',
            top: `50px`,
            left: `50px`,
            fontSize: `16px`,
            color: '#000',
            lineHeight: 1.5,
            opacity: 0.1,
            transform: `rotate(-15deg)`,
            transformOrigin: '0 0',
            userSelect: 'none',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
        })
        return item
    }
  }

}
</script>

<style>

</style>