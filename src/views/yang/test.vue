<!--
 * @Author: 陈祖康
 * @Date: 2021-01-26 16:04:06
 * @LastEditors: 陈祖康
 * @LastEditTime: 2021-06-24 22:33:27
 * @Description: 
 * @Props: 
 * @Emit: 
-->
<template>
  <div class="test">
    <div class="span">
      span
    </div>
    <button id="button">start</button>
  </div>
</template>

<script>
export default {
  
  data() {
    return {
      name: 'czk'
    }
  },
  mounted() {
    // this.begin()
    // console.log('tt', this)
    function Button(id) {
      console.log('this0', this)
      this.element = document.querySelector("#" + id);
      console.log('this1', this)
      this.bindEvent();
    }

    Button.prototype.bindEvent = function() {
        this.element.addEventListener("click", this.setBgColor, false);
        console.log('this2', this)
    };

    Button.prototype.setBgColor = function() {
      console.log('this3', this)
      this.element.style.backgroundColor = '#1abc9c'
    };

    let button = new Button("button");
    console.log('button', button)
    this.begin()
  },
  methods: {
    begin() {
      console.log('methis', this)
      function test () {
        console.log('test', this)
      }
      let butest = new test()
      // test()
      console.log('s', butest)
    }
  }
}
</script>

<style>
.test {
  width: 200px;
  height: 200px;
  background-color: blue;
  /* position: fixed; */
  /* z-index: 2; */
  /* float: left; */
  
}
.span {
  width: 400px;
  height: 100px;
  z-index: 2;
}
</style>