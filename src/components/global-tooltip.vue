<!--
 * @Author: 陈祖康
 * @Date: 2021-09-07 09:53:01
 * @LastEditors: 陈祖康
 * @LastEditTime: 2021-09-09 13:56:55
 * @Description: 全局的tooltip
 * @Props: 
 * @Emit: 
-->
<template>
  <div class="tooltip">
    <el-tooltip ref="globalTooltip" :content="content" :placement="placement">
    </el-tooltip>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  computed: {
    content () {
      return this.$store.state.tooltip.toolTipContent
    },
    placement () {
      return this.$store.state.tooltip.toolTipPlacement
    },
    toolTip () {
      return this.$store.state.tooltip.toolTip
    }
  },
  watch: {
  },
  mounted() {
    this.$store.commit('MOUNT_TOOL_TIP', this.$refs.globalTooltip)
  }
}
</script>

<style>

</style>