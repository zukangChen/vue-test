<template>
  <div class="index">
    <lazy-cascader v-model="category" :props="props"></lazy-cascader>
  </div>
</template>

<script>
import LazyCascader from "lazy-cascader";
export default {
  name: 'index',

  components: {
    LazyCascader
  },

  data () {
    return {
    }
  },

  props: {
  },

  mounted () {
  },

  methods: {
  }
}
</script>

<style lang="scss" scoped>

</style>
