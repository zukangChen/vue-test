<!--
 * @Author: 陈祖康
 * @Date: 2021-01-13 13:43:38
 * @LastEditors: 陈祖康
 * @LastEditTime: 2021-01-13 14:28:52
 * @Description: 
 * @Props: 
 * @Emit: 
-->
<template>
<el-main>
  <div class="order-table">
    <!-- 表格 -->
    <el-table
      :max-height="tableHeight || 600"
      :data="tableObj.data"
      :span-method="objectSpanMethod"
      @selection-change="handleSelectionChange">
      <!-- <div v-for="(item, index) in tableObj.header" :key="index"> -->
        <!-- 日期 -->
        <template v-for="item in tableObj.header">
          <el-table-column
          v-if="item.attrtype === 'date'"
          :fixed="item.fixed"
          :key="item.attrtype"
          :prop="item.attrtype"
          :label="item.label">
          <template #default="scope">
            <span>{{scope.row.date}}</span>
          </template>
          </el-table-column>
        <!-- 点击穿透文本 -->
          <el-table-column
          v-else-if="item.isClickThrough"
          :prop="item.attrtype"
          :label="item.label"
          :key="item.attrtype"
          :fixed="item.fixed">
          <template #default="scope">
            <span class="table-text is-link" @click="openLink(scope.row, item)">{{scope.row.name}}</span>
            <el-tag v-if="scope.row.istag">标签一</el-tag>
          </template>
          </el-table-column>
        <!-- 操作按钮 -->
          <el-table-column
          v-else-if="item.attrtype === 'options'"
            :key="item.attrtype"
            :prop="item.attrtype"
            :label="item.label"
            :fixed="item.fixed">
              <template #default="scope">
                <div class="table__options" :class="tableObj.options[0].type === 'order' ? 'removeFlex' : 'table__options'">
                  <div v-for="(btn, index) in tableObj.options" :key="index">
                    <template>
                      <!-- 按钮操作 -->
                      <el-button
                        class="table__options__btn"
                        @click="handleBtn(scope.row, btn.btnType)"
                        :key="btn.label"
                        v-if="btn.isShow">
                        {{btn.label}}
                      </el-button>
                    </template>
                  </div>
                </div>
              </template>
          </el-table-column>
        <!-- 图片 -->
          <el-table-column :prop="item.attrtype" :label="item.label" :key="item.attrtype" v-else-if="item.attrtype === 'img'">
            <template #default="scope">
              <div class="table-img">
                <div class="table__img">
                  <div v-for="(img, index) in tableObj.img" :key="index">
                    <el-popover placement="left" trigger="click">
                      <template #reference>
                        <el-image
                          :src="scope.row[item.attrtype]"
                          fit="contain">
                        </el-image>
                      </template>
                      <el-image
                        style="width: 300px; height: auto;"
                        :src="scope.row[item.attrtype]"
                        fit="contain">
                      </el-image>
                    </el-popover>
                  </div>
                </div>
                <div>
                  <span class="table__shop-name">你就像风一样，该配合你演出的我演视而不见啥呀手动阀打发撒旦发发士大夫士大夫犯得上发射点发射点房贷首付</span>
                </div>
              </div>
            </template>
          </el-table-column>
        <!-- 选择框 -->
          <el-table-column
          v-else-if="item.attrtype === 'selection'"
            :key="item.attrtype"
            :prop="item.attrtype"
            :type="item.attrtype"
            width="55"
            :fixed="item.fixed"
            >
          </el-table-column>
        <!-- 只需要标签不需要穿透的姓名 -->
          <el-table-column
          v-else-if="item.isTag"
          :key="item.attrtype"
          :prop="item.attrtype"
          :label="item.label">
          <template #default="scope">
            <span>{{scope.row.name}}</span>
            <div class="disableTag" v-if="!scope.row.enable">禁用</div>
          </template>
          </el-table-column>
        <!-- 其他默认 -->
          <el-table-column
            v-else
            :key="item.attrtype"
            :prop="item.attrtype"
            :label="item.label"
            >
          </el-table-column>
        </template>
      <!-- </div> -->
    </el-table>
  </div>
</el-main>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'order-table',

  components: {
  },
  setup (ctx) {
    console.log('b', ctx.tableObj.options)
    const multipleSelection = ref([])
    return {
      multipleSelection // 选择框数组
    }
  },
  props: {
    tableObj: {
      // 表格双向绑定数据
      type: Object,
      default: () => {}
    },
    tableHeight: {
      // 表格高度
      type: Number
    },
    ismerge: {
      // 是否需要有合并
      type: Boolean,
      default: false
    }
  },
  created () {
    console.log('ss', this.tableObj)
  },
  computed: {
  },
  methods: {
    /**
     * 全选
     */
    handleSelectionChange (val) {
      console.log('val', val)
      this.multipleSelection = val
    },
    /**
     * 操作按钮
     */
    handleBtn (row, btnType) {
      // row 改行数据
      // btn 点击的按钮类型
      this.$emit('handleBtn', row, btnType)
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
     * @description 列表回显操作
     * @param {String} [value] 回显数据
     */
    getShowText (value) {
      let showVal = value
      return showVal || '--'
    },
    /**
     * @description 可跳转的
     * @param {Object} [data] 行数据
     * @param {Object} [linkDetail] 跳转参数
     */
    openLink (data, linkDetail) {
      console.log(`跳转参数：`, data)
      console.log(`跳转参数linkDetail：`, linkDetail)
      // 先这样写，到时候根据linkDetail跳转到对应的页面
      this.$router.push({path: '/orders/order-detail'})
      // if (detailBusinessType.includes(linkDetail.businessType)) {
      //   this.dialogVisible = true
      //   this.linkData = {dataId: data.dataId, ...linkDetail}
      // }
    },
    /**
     * 合并行
     */
    objectSpanMethod ({ rowIndex, columnIndex }) {
      if (!this.ismerge) return
      if (columnIndex === 0 || columnIndex === this.tableObj.header.length - 1) {
        // 如果有第二种规格 且为多规格
        let num = this.tableObj.data.length // 需要合并的行数
        if (rowIndex % num === 0) {
          return {
            rowspan: num,
            colspan: 1
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .order-table {
    position: relative;
    .is-link {
      cursor: pointer;
      color: rgba(70, 179, 255, 100);
    }
    .disableTag {
      display: inline-block;
      margin-left: 5px;
      background-color: rgba(0, 0, 0, 0.04);
      color: rgba(0, 0, 0, 0.65);
      font-size: 12px;
      width: 40px;
      height: 20px;
      text-align: center;
      line-height: 20px;
    }
    .table__img, .table__options {
      display: flex;
    }
    .removeFlex {
      display: block;
      text-align: center;
      .is-link {
        color: #409EFF!important;
      }
    }
    .table-img {
      display: flex;
    }
    .table__img {
      /deep/ img {
        width: 70px;
        height: 70px;
      }
    }
    .table__shop-name {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .table__options {
      .table__options__span {
        color: #FD8D3D;
        border: 0;
      }
      .table__options__span:hover {
        background-color: #F5F7FA;
      }
      /deep/ button {
        margin-right: 6px;
      }
    }
    // /deep/.el-table tbody tr:hover>td {
    //   background-color:#ffffff
    // }
  }
</style>
