/*
 * @Author: 陈祖康
 * @Date: 2020-08-17 09:02:30
 * @LastEditors: 陈祖康
 * @LastEditTime: 2020-08-17 09:18:53
 * @Description: my-table的一些公用方法
 * @Props: 
 * @Emit: 
 */

export default {
  created() {
  },
  methods: {
    //选择
    selectValue(selection, row) {
      console.log('55',selection, row)
    },
    //全选时触发
    selectAll(selection) {
      console.log('select', selection)
    }
  }
}