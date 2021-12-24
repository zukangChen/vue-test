<!--
 * @Author: 陈祖康
 * @Date: 2021-09-07 09:43:09
 * @LastEditors: 陈祖康
 * @LastEditTime: 2021-10-19 17:15:10
 * @Description: tooltip提示框
 * @Props: 
 * @Emit: 
-->
<template>
  <div class="tool-tip" @mouseenter="tipBoxEnter($event)" @mouseleave="tipBoxLeave($event)">
    <p class="tool-tip-content-p">
      <slot></slot>
    </p>
  </div>
</template>

<script>
export default {
  name: 'index',

  components: {
  },

  data () {
    return {
    }
  },

  props: {
    optionMaxWidth: {
      type: Number
    },
    toolTipContent: {
      type: String,
      default: 'test'
    },
    placement: {
      type: String,
      default: 'bottom'
    }
  },

  mounted () {
  },

  methods: {
    tipBoxEnter(e) {
      console.log('e',e.target.childNodes)
      let p_Node = e.target.childNodes[0]
      if (p_Node) {
        this.$store.commit('INIT_TOOL_TIP', {
          node: p_Node,
          content: this.toolTipContent,
          placement: this.placement
        })
      }
    },
    tipBoxLeave() {
      this.$store.commit('CLOSE_TOOL_TIP')
    }
  }
}
</script>

<style lang="scss" scoped>
  .tool-tip-content-p {
    padding: 0;
    margin: 0;
    text-overflow: ellipsis;
    overflow: hidden;
  }
</style>