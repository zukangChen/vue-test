/*
 * @Author: 陈祖康
 * @Date: 2020-08-16 16:09:53
 * @LastEditors: 陈祖康
 * @LastEditTime: 2020-08-17 10:59:34
 * @Description: 表格每个字段单元格的基础mixin
 * @Props: 
 * @Emit: 
 */

import inputText from './input-text.vue' // 1
// import linkOther from './table-column/link-other.vue' // 20001
// import subForm from './table-column/sub-form.vue' // 10
// import tdDetail from './table-column/td-detail.vue' // 10
import handleOptions from './handle-options.vue'
import tableImg from './table-Img.vue'
export default {
  components: {
    inputText,
    // linkOther,
    // subForm,
    // tdDetail,
    handleOptions,
    tableImg
  },
  filters: {
    findComponent: (fieldType) => {
      let componentName = ''
      switch (fieldType) {
        case 6:
          componentName = 'tableImg'
          break
        case 8:
          componentName = 'file'
          break
        case 10:
          componentName = 'rate'
          break
        case 37:
          componentName = 'dateBirthday'
          break
        case 30007: // 展开，现在不做处理
          componentName = 'expand'
          break
        case 30000:
          componentName = 'handleOptions'
          break
        default:
          componentName = 'inputText'
          break
      }
      console.log('name', componentName)
      return componentName
    }
  }
}