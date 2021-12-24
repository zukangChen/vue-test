<!--
 * @Author: jing.chen
 * @Date: 2021-01-04 13:41:22
 * @LastEditors: 陈祖康
 * @LastEditTime: 2021-01-13 14:22:39
 * @Description: 表格
-->
<template>
  <div class="list-table">
    <div class="list-table__content">
      <el-table
        v-if="tableHead.length"
        :data="tableData"
        height="100%"
        style="width: 100%;">
        <template v-for="cloumn in tableHead">
          <!--  时间 -->
          <el-table-column :label="cloumn.attrName" min-width="180" v-if="cloumn.attrType === 'date'" :key="cloumn.attr">
            <template #default="scope">
              <div class="show-text">
                {{}}
                <span class="table-text">{{scope.row[cloumn.attrtype]}}</span>
              </div>
            </template>
          </el-table-column>
          <!-- 关联数据 -->
          <el-table-column :label="cloumn.attrName" min-width="180" v-else-if="cloumn.linkDetail" :key="cloumn.attr">
            <template #default="scope">
              <div class="show-text">
                <span class="table-text is-link" @click="openLink(scope.row, cloumn.linkDetail)">{{scope.row[cloumn.attrtype]}}</span>
              </div>
            </template>
          </el-table-column>

          <!-- 其他文本 -->
          <el-table-column :label="cloumn.attrName" min-width="180" v-else :key="cloumn.attr">
            <template #default="scope">
              <div class="show-text">
                <span class="table-text">{{(scope.row[cloumn.attrtype]) }}</span>
              </div>
            </template>
          </el-table-column>
        </template>
      </el-table>
      <!-- <form-detail v-model:dialogVisible="dialogVisible" :link-data="linkData" v-if="dialogVisible"></form-detail> -->
    </div>
  </div>
</template>

<script>
import { computed, reactive, ref } from 'vue'
// import FormDetail from './components/detail/index.vue'
// import { detailBusinessType } from './detail-businessType.js'
export default {
  name: 'list-table',
  components: {
    // FormDetail
  },
  props: {
    tableData: {
      type: Array,
      default: () => []
    },
    tableHead: {
      type: Array,
      default: () => []
    }
  },
  setup (props) {
    const dialogVisible = ref(false)
    const linkData = reactive({})
    const showTableHead = computed(() => props.tableHead.filter(item => item.showType !== 7))
    return {
      showTableHead,
      dialogVisible,
      linkData
    }
  },
  methods: {
    /**
     * @description 列表回显操作
     * @param {String} [value] 回显数据
     */
    getShowText (value) {
      let showVal = value
      return showVal || '--'
    },
    /**
     * @description 列表回显操作
     * @param {String} [value] 回显数据
     * @param {Object} [isLink] 行linkDetail
     */
    getShowTextLink (value, isLink) {
      let showVal = value
      if (isLink.attr !== 'serialNo') { // 可跳转 并且不是serialNo
        showVal = showVal ? showVal[0].name : '--'
      }
      return showVal || '--'
    },

    /**
     * @description: 时间戳转日期格式,后端传进格式
     * @param {type}
     * @return:
     */
    // formatDate (timestamp, dateType) {
    //   // 由于后端么有限制好时间戳的number类型，所以这里可能存在string类型的时间戳，同时还存在不用转化的时间
    //   // let isTimestamp = !isNaN(+timestamp)
    //   // if (isTimestamp) { // 如果穿过来是时间戳
    //   //   return utils.timestampToTimeString(+timestamp, dateType)
    //   // } else { // 最后跟进时间（传的是string时）
    //   //   return timestamp
    //   // }
    // },
    /**
     * @description 可跳转的
     * @param {Object} [data] 行数据
     * @param {Object} [linkDetail] 跳转参数
     */
    // openLink (data, linkDetail) {
    //   console.log(`跳转参数：`, data)
    //   console.log(`跳转参数linkDetail：`, linkDetail)
    //   if (detailBusinessType.includes(linkDetail.businessType)) {
    //     this.dialogVisible = true
    //     this.linkData = {dataId: data.dataId, ...linkDetail}
    //   }
    // }
  }
}
</script>

<style lang="scss" scoped>
.list-table {
  flex: 1;
  // overflow-y: scroll;
  padding: 0 20px;
  height: calc(100% - 60px);
  position: relative;
  .list-table__content {
    height: 100%;
    .table-text {
      height: 20px;
      color: rgba(51, 51, 51, 100);
      font-size: 14px;
      text-align: left;
      font-family: PingFangSC-Regular;
    }
    .is-link {
      cursor: pointer;
      color: rgba(70, 179, 255, 100);
    }
  }
}
</style>

