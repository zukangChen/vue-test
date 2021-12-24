<!--
 * @Author: xuwang.bao
 * @LastEditors: 陈祖康
 * @Description: 详情页的根详情页 组件 - (请注意，此详情页为默认占满所在div)
 * @Date: 2019-02-28 18:42:34
 * @LastEditTime: 2021-07-20 11:14:38
 -->
<template>
  <div class="form-data-detail">
    <transition
      name="el-zoom-in-right">
      <el-dialog
        v-if="dialogShow"
        :title="$t('message.confirmTitle')"
        :top="isActivityHead ? '90px' : '60px'"
        ref="dialogRef"
        :show-close="false"
        :close-on-click-modal="closeOnClickModal"
        custom-class="form-data-detail__dialog__body"
        class="form-data-detail__dialog"
        :modal-append-to-body="true"
        :visible.sync="dialogShow"
        width="970px">
        <div class="workflow-approve-detail" v-if="false">
          <!-- 关闭按钮 -->
          <div @click="dialogShow = false" class="workflowTitle__close-btn">
            <i class="el-icon-close"></i>
          </div>
          <flow-detail
          :flowTable="true"
          type="meSub"
          :query="{appId: 4451, businessType:201, formId:16891, menuId:18900, processNodeTaskId:123, processTaskId:52, processType:'create', saasMark:1}">
          </flow-detail>
        </div>
        <div class="detail" v-else>
            <!-- header -->
          <div class="form-data-detail__dialog__title" slot="title">
            <div class="title-top">
              <!-- title + 字段标题 -->
              <div class="title-wrap">
                  <!-- SAAS中有三种章：坏账、部分坏账、作废 -->
                  <!-- todo -->
                  <div class="chapter" v-for="seal in sealPoJoList" :key="seal.attr" :style="{left:imgLeft+'px'}">
                    <img v-if="seal.attr === 'isBad'" src="../../assets/bad.png"/>
                    <img v-else-if="seal.attr === 'partialBad'" src="../../assets/badpart.png"/>
                    <img v-else-if="seal.attr === 'cancel'" src="../../assets/cancel.png"/>
                    <img v-else-if="seal.attr === 'red'" src="../../assets/is-red.png"/>
                    <!-- 归档章：报价单详情页 -->
                    <img v-else-if="seal.attr === 'archived'" src="../../assets/archive.png"/>
                  </div>
                  <span class="title-text" ref="titleName" :class="{red: isRed}">{{title.name}}</span>
                  <i
                    v-if="[pageBusinessType.CUSTOMER_MANAGEMENT, pageBusinessType.SALES_OPPORTUNITY].indexOf(query.businessType) > -1"
                    class="el-star" @click="handleFocus" :class="[isFocus ? 'el-icon-star-on' : 'el-icon-star-off']"
                    v-dataGrow="getDataGrow(formQuery.businessType, 'toggleFocus')"></i>
                  <i v-if="esignStatus.code === 1" class="iconfont icon-chakan go-esign" @click="goEsign"></i>
                  <el-tooltip v-if="soukePid" :content="$t('formDataDetail.goToChestnutDetailsPage')" placement="top" effect="light">
                    <i @click="toLiziDetail" class="to-souke-detail iconfont icon-zhanghuxinxichaxun"></i>
                  </el-tooltip>
                  <i v-if="hasOuterLinkShare === 1" class="outer-link-share iconfont icon-fenxiang" @click="getOuterLinkShare"></i>
                  <input :id="'copy-href'+query.dataId" class="copy-href-hidden" type="text" v-model="copyHref">
                  <span class="smart-scoring" v-if="head.score">
                    <span>{{ $t('formDataDetail.smartScoring') }}：</span>{{ head.score }}
                  </span>
                  <!-- 标签 -->
                  <div class="tag-list tag-computed" v-if="head.tags">
                    <template v-if="esignStatus.code === 1 || esignStatus.code === 2">
                      <el-tag class="blue-tag" color="#ecf5ff">
                        {{ esignStatus.name }}
                      </el-tag>
                    </template>
                    <template v-for="(tag, tagindex) in head.tags">
                      <el-tooltip v-if="tag.type === 'label'" :disabled="getTagLength(tag.value.name) <= 6" :key="tagindex"  effect="dark" :content="tag.value.name" placement="top">
                        <el-tag  :class="tag.type" :style="`color:${tag.value.color};border:none`" :color="tag.value.color+'33'">
                          {{maxSlice(tag.value.name, 9)}}
                        </el-tag>
                      </el-tooltip>
                      <el-tooltip v-else :disabled="getTagLength(tag.value) <= 9" :key="tagindex"  effect="dark" :content="tag.value" placement="top">
                        <el-tag  :class="tag.type">
                          {{maxSlice(tag.value, 9)}}
                        </el-tag>
                      </el-tooltip>
                    </template>
                    <template v-if="labelEditAttr">
                      <span class="tag-label__add" @click="tagAddDialogShow = true">+</span>
                    </template>
                  </div>
              </div>
                <!-- todo -->
                <!-- 拨号按钮 -->
                <div class="cti-btn" v-if="phoneList.length">
                  <i class="web-iconfont web-icon-dial" @click="makeCall"></i>
                </div>
                <!-- 设置BOM版本 -->
                <template v-if="[this.pageBusinessType.BOMBILL].indexOf(query.businessType) > -1 && head.bomVersionPojo && head.bomVersionPojo.isShow">
                  <el-checkbox v-model="head.bomVersionPojo.isDefault" @change="changeBomVersion">{{$t('formDataDetail.setAsDefaultVersion')}}</el-checkbox>
                </template>
                <!-- 新建其他表单权限 -->
                <div class="add-form-permission-bts"  v-if="addFormPermissionBts.length>0">
                  <!-- 多个按钮 -->
                  <template v-if="addFormPermissionBts.length > 1">
                    <el-dropdown
                      trigger="click" @click="addLinkClick(addFormPermissionBts[0])" split-button type="primary">
                      <span
                        v-dataGrow="getDataGrow(addFormPermissionBts[0].businessType, addFormPermissionBts[0].btnType)">{{addFormPermissionBts[0].value}}</span>
                      <el-dropdown-menu slot="dropdown">
                        <template v-for="(item,index) in addFormPermissionBts">
                          <el-dropdown-item
                            @click.native="addLinkClick(item)"
                            v-dataGrow="getDataGrow(item.businessType, item.btnType)"
                            :key="index"
                            v-if="index !== 0"
                          >
                          {{item.value}}
                          </el-dropdown-item>
                        </template>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </template>
                  <!-- 单个按钮 -->
                  <template v-if="addFormPermissionBts.length === 1">
                    <el-button v-dataGrow="getDataGrow(addFormPermissionBts[0].businessType, addFormPermissionBts[0].btnType)"
                      type="primary" @click="addLinkClick(addFormPermissionBts[0])">{{addFormPermissionBts[0].value}}</el-button>
                  </template>
                </div>
                <!-- 详情自身权限 -->
                <div class="detail-permission-bts">
                  <!-- 右上角操作按钮 -->
                <el-button-group v-if="head.button && head.button.length">
                  <template v-for="btn in head.button">
                    <el-button
                      v-if="btn.attr.indexOf('cloudCode_') >= 0"
                      :key="btn.attr"
                      @click="handleClickCloudCode(btn)">
                      <div class="detail-button-icon">
                        <i :class="btn.icon + ' iconfont'"></i>
                        <span>{{btn.value}}</span>
                      </div>
                    </el-button>
                    <el-button
                      v-else
                      v-dataGrow="getDataGrow(btn.linkBusinessType, btn.attr)"
                      :key="btn.attr"
                      :icon="'el-icon-' + menuType[btn.attr].icon"
                      :class="menuType[btn.attr].icon"
                      @click="handleBtn(btn)">
                      {{btn.value}}
                    </el-button>
                  </template>
                </el-button-group>
              </div>
            </div>
              <!-- 副标题样式已经写好 -->
              <div class="sub-title" v-if="head.secondTitle && head.secondTitle.length">
                <span class="text" :class="{red: textItem.type === 'red'}" v-for="(textItem, textIndex) in head.secondTitle" :key="textIndex+textItem.value">
                  <template v-if="textItem.type!=='though'">
                    {{textItem.name}}：
                    <el-tooltip :disabled="getTagLength(textItem.value) <= 10"   effect="dark" :content="String(textItem.value)" placement="top">
                      <em>{{maxSlice(textItem.value, 10)}}</em>
                    </el-tooltip>
                  </template>
                  <template v-else>
                    <span>{{textItem.name}}:</span> <a @click="thoughClick(textItem.value[0])">{{textItem.value[0].name}}</a>
                  </template>
                </span>
              </div>
              <!-- 关闭按钮 -->
              <div @click="dialogShow = false" class="title__close-btn">
                <i class="el-icon-close"></i>
            </div>
          </div>
          <!-- <el-scrollbar ref="scrollTab" style="height:100%;"> -->
          <div class="scroll-body" ref="scrollTest">
            <!-- 客户、销售机会、销售线索 阶段 -->
          <customer-stage-flow
            v-if="[pageBusinessType.CUSTOMER_MANAGEMENT, pageBusinessType.SALES_OPPORTUNITY, pageBusinessType.SALES_LEADS].indexOf(query.businessType) > -1 && customerStage.stageList && customerStage.stageList.length"
            ref="stageFlow"
            :customerStage="customerStage"
            :customerId="this.query.dataId"
            :customerType="customerType"
            :query="this.query"
            @openLoseBecause="loseBecauseShow = true"
            @createContract="createContract"
            @refreshCustomerStage="refreshCustomerStage"
            @refreshDetail="refreshDetail"
          ></customer-stage-flow>
          <!-- 拨号界面 -->
          <dial-modal
            v-if="dialModalShow"
            :dialStyle="dialStyle"
            :phoneList="phoneList"
            @closeModal="dialModalShow=false">
          </dial-modal>
          <!-- 延期计划的弹窗 -->
          <postpone-time
            ref="postponeTime"
            :options="delayCauseOptions"
            @refreshDetail="refreshDetail">
          </postpone-time>
            <!-- dialog 的 body -->
            <div class="form-data-detail__dialog__content">
              <DetailTabs
              :query="childPropQuery"
              :formQuery="formQuery"
              :customerInfo="customerInfo"
              :supplierInfo="supplierInfo"
              :detailTabs="detailTabs"
              :activeName.sync="activeName"
              :isLoadMore.sync="isLoadMore"
              @refresh="refreshDetail"
              @refreshCustomerStage="refreshCustomerStage"/>
            </div>
            <circulation
              :workOrderId="query.dataId"
              :operate="operate"
              :tipText="tipText"
              v-if="showCirculation"
              @close="showCirculation = false"
              @refresh="refreshDetail"
              />
            <!-- </el-scrollbar> -->
          </div>
        </div>
      </el-dialog>
      <!-- </el-scrollbar> -->
    </transition>

     <!-- 选择模板模态框 刘文新增-->
    <el-dialog :title="$t('formDataDetail.chooseTemplate')" :visible.sync="dialogVisible">
            <el-form :model="form" label-position="left" label-width="80px" :rules="rules" ref="ruleForm">
                <el-form-item :label="$t('nouns.moduleName')" prop="modelType">
                    <el-select v-model="form.modelType" :placeholder="$t('placeholder.choosePls',{attr:''})">
                        <el-option v-for="item in formList" :key="item.id" :value="item.id" :label="item.name"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="sureConfirm('ruleForm')">{{ $t('operation.confirm') }}</el-button>
            </div>
    </el-dialog>

    <!-- 子详情 -->
    <form-data-detail
      :query="childrenDetailQuery"
      v-if="childrenShow"
      :show.sync="childrenShow"/>
    <eSign v-if="showEsign" :show.sync="showEsign" :list="formList" :formQuery="formQuery" :query="query" />
    <!-- 线索转换 -->
    <lead-conversion
      :query="query"
      :formQuery="formQuery"
      v-if="showLeadConversion"
      :dialogVisible.sync="showLeadConversion"
      @refreshDetail="refreshDetail"
    />
    <!-- 标签选择弹框 -->
    <tagDataDialog
      v-if="tagAddDialogShow"
      @dialogSubmit="tagSubmit"
      :selectTagList="selectTagList"
      :appId="+$route.query.appId"
      :formId="+paasFormEntityExt.id"
      :show.sync="tagAddDialogShow"
    />

    <!-- 右上角无效按钮弹框 -->
    <invalidReason
      v-if="invalidReasonDialogShow"
      :query="query"
      @refreshDetail="refreshDetail"
    />
  </div>
</template>

<script>
import { Message, MessageBox } from 'element-ui'
// 业务枚举
import commonBusinessType from '@/constants/common/business-type'
// 业务配置
import {businessTypeOption} from '@/constants/common/business-option'
// 按钮枚举
import * as common from '@/constants/common/global-config.js'
// tabs 封装组件
import DetailTabs from './components/detail-tabs'
// api
import { getModuleList } from '@/api/print'
import { downLoadEsign, getEsignFlowStatus, getEsignNoticeUrl, getEsignPreCheck } from '@/api/esign'
import { getFormDataDetail } from '@/api/form-detail'
import { getBusinessStage, setDefaultVersion, setPaymentBadDebtReturn, setPayPlanBadDebtReturn } from '@/api/form-detail-tabs'
import { deleteSingle, batchArchive, batchCancel, batchFocus, batchSetProductionStatus } from '@/api/batch-handle'
import { settingCommunicatePlan, getDelayCauseDataDictionary } from '@/api/form-special-list.js'
import { changeWorkflow } from '@/api/workOrder-detail.js'
import {getSoukeIdentity} from '@/api/souke.js'
import { getOuterLinkShareUrl } from '@/api/outer-link.js'
// 阶段面包屑（客户、机会）
import customerStageFlow from './components/tabs/customer-stage-flow'
// 拨打电话小浮层
import dialModal from '@/components/common/dial-modal'
// 访客计划延期弹框
import postponeTime from '@/views/crm/communicate-plan/components/postponeTime'
// 工单流转弹窗
import circulation from './components/dialog/circulation'
import tempVue from '@/utils/temp-vue'
import { mapActions, mapGetters } from 'vuex'
// e 签宝跳转操作
import eSign from './components/dialog/esign'
import * as dd from 'dingtalk-jsapi'
import * as batchHandleApi from '@/api/batch-handle.js'
import cloudCode from '@/components/cloudcode'

// 低代码工厂
import lowCodeFactory from '@/utils/low-code-factory'

// 线索转换弹窗
import leadConversion from './components/dialog/lead-conversion'

import { clueFollow } from '@/api/market-manage'

// 标签弹框
import tagDataDialog from '@/components/all-fields/form-data-edit/tag-tabs/tag-data-dialog'

// 右上角无效按钮弹框
import invalidReason from './components/dialog/invalid-reason'

// 工作流审批详情
import FlowDetail from '@/views/app/work-flow/flowApprove/FlowDetail'
export default {
  name: 'form-data-detail',
  provide: function () {
    return {
      parentDetail: this // 用于注入规格字段子组件
    }
  },
  components: {
    // dialogView,
    FlowDetail, // 工作流审批详情
    customerStageFlow,
    dialModal, // 拨打电话
    postponeTime, // 访客计划弹框
    DetailTabs,
    circulation,
    eSign,
    leadConversion, // 线索转换弹窗
    tagDataDialog, // 标签编辑
    invalidReason // 右上角无效按钮弹框
  },

  mixins: [
    // dialogMixin
  ],

  props: {
    show: {
      type: Boolean,
      default: false
    },
    query: {
      // 用于查询表单的复合对象
      type: Object,
      required: !0,
      default: () => {
        return null
        // return {
        //   'dataId': '14', // 单行数据 必传
        //   'appId': '134', // 应用id 必传
        //   'menuId': '4', // 菜单id 必传
        //   'formId': '', // 表单id （非必传）
        //   'saasMark': 1, // saas标志，1:saas;2:paas
        //   'businessType': 1
        // }
      }
    },
    flowDetailQuery: {
      type: Object,
      default: () => ({

      })
    }
  },

  data () {
    return {
      showLeadConversion: false,
      customerInfo: {},
      supplierInfo: {},
      pageBusinessType: commonBusinessType,
      businessTypeOption,
      dialogShow: false,
      childrenShow: false,
      childrenDetailQuery: {},
      closeBtnZIndex: 0,
      // 按钮对应的文字和样式
      menuType: common.menuType,
      // detailPermissionBts: [], // 表单详情自己本身的权限（编辑，打印，删除）
      addFormPermissionBts: [], // 新建其他表单的权限
      detailTabs: [], // 详情tabs
      paasFormEntityExt: {}, // 表单实体
      /* 特殊业务开始，saas那边， 考虑放mixin */
      dialModalShow: false, // 拨号号码弹框
      dialStyle: {}, // 拨号列表显示位置
      phoneList: [], // 拨号列表
      customerStage: {}, // 客户阶段
      customerStageInitFn: null, // 客户阶段init方法
      loseBecauseShow: false, // 客户流失原因
      isPublic: '', // 是否是公海客户
      customerType: 'customer',
      opportunity: null, // 销售机会阶段和副标题
      sealPoJoList: [], // 坏账、部分坏账、作废
      status: 0, //  标记坏账和部分坏账
      crossMonth: false, //  该条发票是否是跨月的标记
      hasRed: 0, //  该条发票是否包含红冲
      isRed: false, //  标记是否是红冲发票
      isFocus: 0, // 关注切换
      soukePid: 0, // 是否可调转栗子详情页
      delayCauseOptions: [], // 访客计划延期原因
      /* 特殊业务结束 */
      head: {},
      title: '',
      activeName: '',
      form: {// 打印模板表单信息
        modelType: ''
      },
      formList: [], // 可选择的打印模板列表
      rules: {// 表单验证规则
        modelType: [{ required: true, message: this.$t('placeholder.choosePls', {attr: this.$t('operation.print') + this.$t('form.template')}), trigger: 'change' }]
      },
      dialogVisible: false, // 模态框开关
      operate: '', // 工单操作
      showCirculation: false, // 工单操作弹窗
      tipText: '', // 工单操作标题
      detailLoading: null, // 打开详情Loading效果
      isActivityHead: false,
      closeOnClickModal: false, // 是否允许点击 model 关闭 dialog
      hasOuterLinkShare: 0, // 是否有外链分享按钮
      showEsign: false, // e 签宝弹框
      esignStatus: {
        name: '',
        code: ''
      },
      batchHandleApi: batchHandleApi,
      copyHref: '', // 外链地址
      tagAddDialogShow: false, // 添加标签弹窗
      labelEditAttr: null, // 详情页是否有添加标签（加号）
      isLoadMore: false,
      imgLeft: 0,
      invalidReasonDialogShow: false // 右上角无效按钮弹框
    }
  },

  computed: {
    // ...mapGetters(['getCTIStatus']),
    ...mapGetters({
      getCTIStatus: 'getCTIStatus',
      appInfo: 'proList/getAppInfo'
    }),
    formQuery () {
      let { appId, menuId, id, saasMark, businessType } = this.paasFormEntityExt
      if (this.query.businessType) {
        businessType = this.query.businessType
      }
      return {
        appId,
        menuId,
        formId: id,
        saasMark,
        businessType
      }
    },
    childPropQuery () {
      return {
        ...this.query,
        ...this.formQuery
      }
    },
    selectTagList () {
      let tempArr = this.head.tags.filter(item => item.type === 'label')
      return tempArr.map(item => {
        return {...item.value}
      })
    }
  },
  watch: {
    // 设置标题图片位置
    title: {
      handler (val) {
        this.$nextTick(_ => {
          let titleName = this.$refs.titleName
          if (val.name && titleName) {
            this.imgLeft = titleName.offsetWidth < 41 ? 90 : (titleName.offsetWidth - 40)
          } else {
            this.imgLeft = 90
          }
        })
      }
    },
    // 控制sync 动画
    show: {
      immediate: true,
      handler (val) {
        // this.dialogShow = val
        this.$nextTick(() => {
          this.dialogShow = val
        })
      }
    },
    // 双向绑定控制动画
    dialogShow (val) {
      if (val) {
        console.log('show', new Date())
        this.$nextTick(() => {
          this.detailLoading = this.$loading({target: '.form-data-detail__dialog__body'})
        })
        this.$emit('update:show', val)
      } else {
        setTimeout(() => {
          this.$emit('update:show', val)
        }, 400)
      }
    },
    // 通过query 来完成初始化请求
    query: {
      immediate: true,
      handler (val) {
        if (val) {
          this.init()
        } else {
          console.log('详情参数缺失')
        }
      }
    },
    /**
     * 监听tab 发生变化后，默认选中第一个tab
     */
    detailTabs (val) {
      if (val) {
        // 当前无选中tab 或者 选中tab 不在当前tabs数组中时
        // 将tab重置到第一个
        let attrs = val.map(item => item.attr)
        if (
          (!this.activeName || !attrs.includes(this.activeName)) &&
          val.length
        ) {
          this.activeName = val[0].attr
        }
      }
    }
  },
  created () {
    // 关联新建保存
    let formDataEditSuccessFn = () => {
      this.detailRefresh()
    }
    tempVue.$on('formDataEditSuccess', formDataEditSuccessFn)
    // 关联新建取消
    let formDataCancelFn = () => {
      if (this.activeName === 'communicateRecord') {
        this.detailRefresh()
      }
    }
    tempVue.$on('formDataCancel', formDataCancelFn)
    tempVue.$on('detailRefresh', this.detailRefresh)

    let openChildFn = (data) => {
      this.showChildrenDetail(data)
    }
    tempVue.$on('openChild', openChildFn)
    // 如果是短信模块进入的详情，将tab栏直接跳转到短信往来tab栏
    if (this.query.activeName === 'smsSendAndReply') {
      this.activeName = 'smsSendAndReply'
    }

    // 程序化的事件监听
    this.$once('hook:beforeDestroy', function () {
      window.removeEventListener('setItemEvent', {})
      tempVue.$off('formDataEditSuccess', formDataEditSuccessFn)
      tempVue.$off('formDataCancel', formDataCancelFn)
      tempVue.$off('openChild', openChildFn)
    })
  },
  mounted () {
    this.isActivityHead = localStorage.getItem('isActivityHead') === 'true'
    window.addEventListener('setItemEvent', this.setItemEvent)
    setTimeout(() => {
      this.closeOnClickModal = true
    }, 400)
    this.$nextTick(() => {
      setTimeout(() => {
        this.addLoadMore()
      })
    })
  },
  beforeDestroy () {
    window.removeEventListener('setItemEvent', this.setItemEvent)
    tempVue.$off('detailRefresh')
    // if (!(this.$parent && this.$parent.dialogShow)) {
    //   window.removeEventListener('setItemEvent', {})
    //   tempVue.$off('formDataEditSuccess')
    //   tempVue.$off('formDataCancel')
    // }
  },

  methods: {
    ...mapActions([
      'formDataAdd',
      'formDataEdit',
      'formDetailLinkAdd',
      'formDetailCopy',
      'toggleCtiModal', // 度言呼叫中心电话弹框
      'formDetailNewVersion' // 报价单新版本
    ]),
    setItemEvent (e) {
      if (e.key === 'isActivityHead') {
        this.isActivityHead = e.newValue
      }
    },
    // 标签超出省略
    maxSlice (val, len) {
      return utils.getByteLen(val) > len ? val.slice(0, len) + '...' : val
    },
    // 字符长度
    getTagLength (val) {
      return utils.getByteLen(val)
    },
    tagSubmit (val) {
      const { businessType, dataId, saasMark, subBusinessType } = this.query
      const { appId } = this.$route.query
      const params = {
        attr: this.labelEditAttr,
        appId: +appId,
        businessType,
        dataIdList: [dataId],
        fieldType: 800000, // 标签
        formId: this.formQuery.formId,
        menuId: this.formQuery.menuId,
        saasMark,
        subBusinessType,
        value: val.map(item => item.id)
      }
      this.batchHandleApi['batchUpdate'](params).then((data) => {
        this.$message({
          type: 'success',
          message: this.$t('message.operateSuccessSymbol')
        })
        this.init()
      }).catch(() => {})
    },
    // 跳转到栗子详情页
    toLiziDetail () {
      getSoukeIdentity({pid: this.soukePid}).then(({ result = {} }) => {
        // 返回的结果为当前登录人的搜客身份-正式用户、三无账号、游客
        this.$router.push({
          name: 'soukeDetail',
          query: {
            identity: result,
            path: `/report/${this.soukePid}?company=${this.title.name.trim()}&source=销帮帮CRM`
          }
        })
      }).catch((err) => {
        console.log(err)
      })
    },
    // 打电话
    makeCall (event) {
      // 判断是否开启CTI
      if (this.getCTIStatus) {
        if (this.phoneList.length <= 1) {
          window.CALL_CENTER.callme(this.phoneList[0].phoneNum)
        } else {
          // 显示电话列表弹层
          const position = event.target.getBoundingClientRect()
          this.dialStyle = {
            left: `${position.left + 30}px`,
            top: `${position.top - 6}px`
          }
          setTimeout(() => {
            // todo
            this.dialModalShow = true
          }, 50)
        }
      } else {
        this.$message({
          type: 'warning',
          message: '第一次使用呼叫中心，请在右下角弹窗完成认证！'
        })
        // todo
        this.toggleCtiModal(true)
      }
    },
    // 访客计划延期原因获取
    getPostponeCause () {
      let params = {
        ...this.query
      }
      getDelayCauseDataDictionary(params).then((data) => {
        this.delayCauseOptions = data.result.list
      }).catch(() => {})
    },
    // 详情刷新（如访客计划延期后刷新）
    refreshDetail () {
      // 刷新详情和列表
      this.detailRefresh()
    },
    // 右上角的操作-跟进中
    clueFollow () {
      console.log(this.query.dataId, 'aaaa')
      clueFollow({
        dataId: this.query.dataId
      }).then(data => {
        Message({
          type: 'success',
          message: data.msg || this.$t('message.operateSuccessSymbol')
        })
        this.refreshDetail()
      }).catch((err) => {
        console.log(err)
      })
    },
    // 操作按钮（编辑删除打印等等）
    handleBtn (btn) {
      if (btn.attr === 'edit') {
        this.detailEdit()
      } else if (btn.attr === 'del') {
        this.deleteSingle()
      } else if (btn.attr === 'print') {
        this.openPrintDialog()
      } else if (btn.attr === 'recall') {
        this.handleRecall()
      } else if (btn.attr === 'copy') {
        this.handleCopy(btn)
      } else if (btn.attr === 'archived') {
        this.archivedRows(1)
      } else if (btn.attr === 'cancelArchived') {
        this.archivedRows(2)
      } else if (btn.attr === 'cancel') {
        this.cancelHandel(1)
      } else if (btn.attr === 'revertCancel') {
        this.cancelHandel(0)
      } else if (btn.attr === 'red') {
        //  详情页的红冲操作
        this.addRed(btn)
      } else if (btn.attr === 'badDebt') {
        this.badOrReturnDebt(btn)
      } else if (btn.attr === 'return') {
        this.badOrReturnDebt(btn)
      } else if (btn.attr === 'finish') {
        // 生产单完成
        this.operatingOrder(2)
      } else if (btn.attr === 'restart') {
        // 生产单重启
        this.operatingOrder(1)
      } else if (btn.attr === 'close') {
        // 生产单关闭
        this.operatingOrder(3)
      } else if (btn.attr === 'delay') {
        // 访客计划延期
        this.postponePlan()
      } else if (btn.attr === 'quit') {
        // 访客计划取消
        this.abolishPlan()
      } else if (btn.attr === 'complete') {
        // 访客计划完成
        this.completePlan(btn)
      } else if (btn.attr === 'newVersion') {
        // 报价单-新版本
        this.newVersion(btn)
      } else if (btn.attr === 'contractEsign') {
        // e签宝下载电子合同
        this.downLoadContract()
      } else if (btn.attr === 'esign') {
        // e 签宝发起签署
        this.startShowEsign()
      } else if (btn.attr === 'invalid') {
        // 无效
        this.invalidReasonDialogShow = true
      } else if (btn.attr === 'follow') {
        // 跟进中
        this.clueFollow()
      } else {
        console.warn(btn)
      }
    },
    // 云叩按钮点击
    handleClickCloudCode (btn) {
      cloudCode(btn.actions, 2, { xbb_detailId: this.query.dataId, xbb_detailAppId: this.query.appId, originQuery: this.query })
    },
    // 新版本
    newVersion (btn) {
      this.formDetailNewVersion({
        ...this.query,
        ...this.formQuery,
        newVersionAttr: true
      })
    },
    // 完成计划
    completePlan (btn) {
      this.formDetailLinkAdd({
        dataIdList: [this.query.dataId],
        saasMark: 1,
        businessType: btn.linkBusinessType,
        linkBusinessType: this.query.businessType
      })
    },
    // 延期计划
    postponePlan () {
      let refer = 'detail'
      this.$refs.postponeTime.dialogFormVisible = true
      this.$refs.postponeTime.planId = this.query.dataId
      this.$refs.postponeTime.model = true
      // 表明是来自 详情还是列表
      this.$refs.postponeTime.refer = refer
    },
    // 取消计划
    abolishPlan () {
      this.$confirm(this.$t('formDataDetail.areYouSaureToCancelThisPlan'), this.$t('operation.cancel'), {
        confirmButtonText: this.$t('operation.confirm'),
        cancelButtonText: this.$t('operation.cancel'),
        type: 'warning'
      }).then(() => {
        let params = {
          dataId: this.query.dataId,
          operate: 3
        }
        settingCommunicatePlan(params).then((data) => {
          this.$message({
            type: 'success',
            message: data.msg || this.$t('message.canceclSuccess')
          })
          // 刷新详情和列表
          this.detailRefresh()
        }).catch(() => {})
      }).catch(() => {})
    },
    // 复制
    handleCopy (btn) {
      this.formDetailCopy({
        ...this.query,
        ...this.formQuery
      })
    },
    //  详情页的发票红冲和回款的红冲
    addRed (btn) {
      // if (this.query.businessType === this.pageBusinessType.PAYMENTAPI || this.query.businessType === this.pageBusinessType.PAYMENT_SHEET) {
      if ([this.pageBusinessType.PAYMENTAPI, this.pageBusinessType.PAYMENT_SHEET, this.pageBusinessType.PAYPLAN, this.pageBusinessType.PAY_SHEET].includes(this.query.businessType)) {
        // 新建红冲回款单
        this.formDetailLinkAdd({
          dataIdList: [this.query.dataId],
          saasMark: 1,
          businessType: btn.linkBusinessType,
          linkBusinessType: this.query.businessType,
          saveUrl: 'linkAddCollectionSave'
        })
      } else if ([this.pageBusinessType.INVOICE, this.pageBusinessType.PAY_INVOICE].includes(this.query.businessType)) {
        // 红冲发票开票
        this.formDataEdit({
          ...this.query,
          ...this.formQuery,
          saasSpecialParamPojo: {fromRed: 1} // 红冲发票请求编辑页参数
        })
      }
    },
    // 坏账和还原
    badOrReturnDebt (btn) {
      if (btn.attr === 'badDebt') {
        this.formDetailLinkAdd({
          dataIdList: [this.query.dataId],
          saasMark: 1,
          businessType: btn.linkBusinessType,
          linkBusinessType: this.query.businessType,
          saveUrl: 'linkAddCollectionSave'
        })
      } else if (btn.attr === 'return') {
        let params = {
          menuId: this.$route.query.menuId,
          ...this.query
        }
        this.$confirm(this.$t('formDataDetail.areYouSaureToRestoreData'), this.$t('message.confirmTitle'), {
          confirmButtonText: this.$t('operation.confirm'),
          cancelButtonText: this.$t('operation.cancel'),
          type: 'warning'
        }).then(() => {
          let promise = ''
          if (this.query.businessType === 701) {
            promise = setPaymentBadDebtReturn(params)
          } else {
            promise = setPayPlanBadDebtReturn(params)
          }
          promise.then(data => {
            this.$message({
              type: 'success',
              message: data.msg || this.$t('message.operateSuccessSymbol')
            })
            // 刷新详情和列表
            this.detailRefresh()
            tempVue.$emit('updateFormList')
          }).catch(() => {})
        }).catch(() => {})
      }
    },
    // 作废确认
    cancelHandel (type) {
      let status = type ? this.$t('operation.cancellation') : this.$t('operation.restore')
      let text1 = this.$t('formDataDetail.whether') // 是否
      let text2 = this.$t('formDataDetail.invoice') // 发票
      let text3 = this.$t('formDataDetail.billingDateOver') // 开票日期已跨月
      let text4 = this.$t('formDataDetail.confirm') // 确认
      let noticeMsg = `${text1 + status} “${this.head.title.name}” ?`
      if (this.crossMonth) {
        noticeMsg = `“${text2 + this.head.title.name}”${text3}，${this.$t('formDataDetail.areYouSure', {attr: status})}?`
      }
      this.$confirm(noticeMsg, `${status + text4}`, {
        confirmButtonText: this.$t('operation.confirm'),
        cancelButtonText: this.$t('operation.cancel'),
        type: 'warning'
      }).then(() => {
        this.cancelInvoice(type)
      }).catch(() => {})
    },
    // 作废&还原
    cancelInvoice (type) {
      // let url = '/invoice/cancel.html'
      let params = {
        dataIdList: [this.query.dataId],
        ...this.formQuery,
        status: type,
        single: 1
      }
      batchCancel(params).then(data => {
        this.$message({
          type: 'success',
          message: data.msg || this.$t('message.operateSuccessSymbol')
        })
        // 刷新详情和列表
        this.detailRefresh()
      }).catch(() => {})
    },
    // 归档 & 取消归档
    archivedRows (archived) {
      // 判断当前是归档还是取消归档
      let cancel = archived === 1 ? '' : this.$t('operation.cancel')
      // const h = this.$createElement
      // const warning =
      //   this.moduleName === 'customerApi' && archived === 1
      //     ? '归档客户为短时间内不需要跟进的客户，归档后不影响业务使用。'
      //     : ''

      this.$confirm(
        `${this.$t('formDataDetail.confirm') + cancel + this.$t('operation.pigeonhole')} “${this.head.title.name}”?`,
        `${cancel + this.$t('formDataDetail.archiveConfirmatioan')}`,
        {
          // title: `${cancel}归档确认`,
          // message: h('div', { class: 'confirm-con' }, [
          //   h('h4', { class: 'tit' }, warning),
          //   h(
          //     'div',
          //     { class: 'msg' },
          //     `确认${cancel}归档 “${this.head.title.name}” 吗?`
          //   )
          // ]),
          confirmButtonText: this.$t('operation.confirm'),
          cancelButtonText: this.$t('operation.cancel'),
          type: 'warning'
        }
      )
        .then(() => {
          const params = {
            businessType: this.query.businessType,
            dataIdList: [this.query.dataId],
            archived: archived
          }
          batchArchive(params).then(data => {
            this.$message({
              type: 'success',
              message: data.msg || this.$t('message.operateSuccessSymbol')
            })
            // 刷新详情和列表
            this.detailRefresh()
          })
        })
        .catch(() => {})
    },
    // 生产单重启完成关闭
    operatingOrder (status) {
      let params = {
        dataIdList: [this.query.dataId],
        businessType: this.query.businessType,
        status: status
      }
      batchSetProductionStatus(params).then(data => {
        this.$message({
          type: 'success',
          message: data.msg || this.$t('message.operateSuccessSymbol')
        })
        // 刷新详情和列表
        this.detailRefresh()
      }).catch(() => {})
    },
    // 设置BOM版本默认版本
    changeBomVersion (val) {
      let params = {
        dataId: this.query.dataId,
        businessType: this.query.businessType,
        isDefault: this.head.bomVersionPojo.isDefault
      }
      setDefaultVersion(params).then(data => {
        this.$message({
          type: 'success',
          message: data.msg || this.$t('message.operateSuccessSymbol')
        })
      }).catch(() => {})
    },
    openPrintDialog () {
      // 打开打印选择模板
      this.dialogVisible = true
      // 初始化时请求可打印的模板
      this.getPrintModelList()
    },
    // 关联新建
    addLinkClick (item) {
      console.log(item)
      // 低代码 详情页按钮
      if (item.attr === 'lowCode') {
        return lowCodeFactory({ handle: 1, info: { xbb_selected_datas: [{...this.query}] }, action: item.actionList })
      }
      // 关联列表新建
      if (item.attr === 'linkList') {
        // debugger
        // const target = this.detailTabs.filter(i => i.value === item.value)[0]
        const {linkAppId, linkBusinessType, linkFormId, linkMenuId, linkSaasMark, linkSubBusinessType} = item.linkList
        this.formDataAdd({
          appId: linkAppId,
          menuId: linkMenuId,
          formId: linkFormId,
          businessType: linkBusinessType,
          saasMark: linkSaasMark,
          subBusinessType: linkSubBusinessType,
          defaultLinkInfo: {
            dataId: this.query.dataId,
            linkList: item.linkList,
            formId: this.query.formId,
            saasMark: this.query.saasMark,
            businessType: this.query.businessType
          },
          useDraft: false
        })
        return
        // this.formDataAdd({
        //   ...this.query,
        //   defaultLinkInfo: {
        //     dataId: this.query.dataId,
        //     linkList: target.linkList
        //   }
        // })
      }
      // 工单流转
      if (this.query.businessType === this.pageBusinessType.WORK_ORDER && item.attr !== 'workOrderOutstock') {
        this.handleCirculation(item)
        return
      }
      // e 签宝 发起签署
      if (item.btnType === 'esign') {
        this.startShowEsign()
        return
      }
      if (item.btnType === 'esignDownload') {
        this.downLoadContract()
        return
      }
      // 线索转换
      if (item.attr === 'transform') {
        this.showLeadConversion = true
        return
      }
      // console.log('下拉关联新建', item)
      let params = {
        dataIdList: [this.query.dataId],
        saasMark: 1,
        businessType: item.businessType,
        subBusinessType: this.query.businessType,
        linkBusinessType: this.query.businessType
      }
      if (this.query.businessType === 712) {
        params.dataIdList = [this.customerInfo.id]
        params.linkBusinessType = this.customerInfo.businessType
      } else if (this.query.businessType === 810) {
        params.dataIdList = [this.supplierInfo.id]
        params.linkBusinessType = this.supplierInfo.businessType
      }
      if (item.attr === 'paymentSheet') {
        // 回款单保存走特殊接口
        params.saveUrl = 'linkAddCollectionSave'
      } else if (item.attr === 'paySheet') {
        // 付款单保存走特殊接口
        params.saveUrl = 'linkAddPayPlanSheetSave'
      } else if (item.attr === 'pushNotify') {
        // 设置跟进提醒要传的参数
        params.saveUrl = 'batchPushNotify'
      } else if (['finishedProductInstock', 'returnedMaterielInstock'].indexOf(item.attr) > -1) {
        // 成品入库/退料入库传attr
        params.attr = item.attr
      }
      // 退回公海池
      if (item.attr === 'backSea') {
        // 线索 或者 客户
        const businessType = item.businessType === 8002 ? 8000 : 100
        let backSeaParams = {
          dataIdList: [this.query.dataId],
          saasMark: 1,
          businessType
        }
        const title = i18n.t('mixin.returnConfirm')
        const message = i18n.t('mixin.' + (businessType !== 8000 ? 'returnCustomers' : 'returnClues'), { attr: params.dataIdList.length })
        const url = 'batchBackCustomer'
        // this.messageConfirm(options)
        this.$confirm(message, title, {
          confirmButtonText: i18n.t('operation.confirm'),
          cancelButtonText: i18n.t('operation.cancel'),
          type: 'warning',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm' && url) {
              instance.confirmButtonLoading = true
              instance.confirmButtonText = i18n.t('mixin.inExecution')
              // 有指定接口，直接处理
              // let subBusinessType = params.subBusinessType
              done()
              this.$notify({
                title: '退回公海池',
                message: '退回公海池中，请稍等...',
                type: 'info'
              })
              this.batchHandleApi[url](backSeaParams).then((data) => {
                setTimeout(() => {
                  if (data.result) {
                    this.detailRefresh()
                    setTimeout(() => {
                      this.dialogShow = false
                      this.$notify.closeAll()
                    }, 1000)
                  }
                }, 2000)
              }).catch(() => {
                this.$notify.closeAll()
              }).finally(() => {
                done()
                instance.confirmButtonLoading = false
              })
            } else {
              done()
            }
          }
        }).then(() => {
        }).catch(() => {
        })
        return
      }
      this.formDetailLinkAdd(params)
    },
    // 工单流转
    handleCirculation (item) {
      if (item.attr === 'accept') {
        this.changeWorkflow(item.attr)
      } else {
        this.tipText = this.$t('business.workOrder') + item.value
        this.operate = item.attr
        this.showCirculation = true
      }
    },
    changeWorkflow (operate) {
      let params = {
        operate: operate,
        workOrderId: this.query.dataId
      }
      changeWorkflow(params).then(data => {
        Message({
          type: 'success',
          message: data.msg || this.$t('message.operateSuccessSymbol')
        })
        this.refreshDetail()
      }).catch(() => {})
    },
    /**
     * 父组件更新事件发布
     */
    detailUpdate (cb) {
      if (typeof cb === 'function') {
        cb()
      }
    },
    init () {
      this.getFormDataDetail()
    },
    // 新建模板表单非空验证
    sureConfirm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const { appId, businessType, formId, saasMark } = this.formQuery
          const {dataId} = this.query
          const pro = process.env.NODE_ENV
          if (pro === 'development') { // 开发环境
            // window.location.href = `http://192.168.10.197:8080/#/pagepreview?entityId=${dataId}&formId=${formId}&businessType=${businessType}&appId=${appId}&id=${this.form.modelType}`
            const goUrl = `${globalConst.DEV_PRINT_LOCALHOST}` + utils.openBlankUrl(`/#/pagepreview?entityId=${dataId}&formId=${formId}&businessType=${businessType}&appId=${appId}&id=${this.form.modelType}&saasMark=${saasMark}`)
            window.open(goUrl)
          } else { // 生产环境
            // window.location.href = `/print/index.html#/pagepreview?entityId=${dataId}&formId=${formId}&businessType=${businessType}&appId=${appId}&id=${this.form.modelType}`
            window.open(utils.openBlankUrl(`/print/index.html#/pagepreview?entityId=${dataId}&formId=${formId}&businessType=${businessType}&appId=${appId}&id=${this.form.modelType}&saasMark=${saasMark}`))
          }
          this.dialogVisible = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 获取选择模板列表
    getPrintModelList () {
      const { appId, menuId, saasMark, formId, businessType } = this.formQuery
      let params = {
        appId, menuId, saasMark, formId, businessType
      }
      getModuleList(params).then(res => {
        console.log('模板列表', res)
        if (res.result.listPrintList) { // 容错处理
          this.formList = res.result.listPrintList
          this.form.modelType = this.formList[0].id
          if (this.formList.length === 1) { // 单模板直接跳打印预览页
            this.sureConfirm('ruleForm')
          }
        }
      }).catch(() => {})
    },
    // 穿透详情
    thoughClick ({businessType, id, saasMark}) {
      this.showChildrenDetail({
        appId: this.query.appId,
        dataId: id,
        saasMark,
        businessType,
        subBusinessType: this.query.subBusinessType
      })
    },
    // 关注切换
    handleFocus () {
      // 转换0和1
      let status = Math.abs(this.isFocus - 1)
      this.isFocus = status
      // 请求接口
      let params = {
        dataIdList: [this.query.dataId],
        ...this.formQuery,
        focus: status
      }
      batchFocus(params).then(data => {
        this.$message({
          type: 'success',
          message: data.msg || this.$t('message.operateSuccessSymbol')
        })
        tempVue.$emit('updateFormList')
      }).catch(() => {})
    },
    // editClick () {
    //   this.detailEdit()
    // },
    detailEdit () {
      this.formDataEdit({
        editCallback: this.formEditCallback.bind(this),
        'dataId': this.query.dataId,
        ...this.formQuery
      })
    },
    formEditCallback ({ code }) {
      if (code === 2) {
        this.dialogShow = false
      }
      // console.log(this, result)
    },
    /**
     * 单个删除
     */
    deleteSingle () {
      // 提示信息
      let alertMessage = this.businessTypeOption[this.query.businessType] && this.businessTypeOption[this.query.businessType].deleteNotice
      alertMessage = alertMessage || this.$t('formDataDetail.sureDeleteThisData')
      // if (this.query.businessType === 100) { // 当前业务为客户详情时
      //   alertMessage = '删除客户同时会删除销售机会、联系人、跟进记录等客户相关信息，存在合同的客户不允许删除！'
      // } else {
      //   alertMessage = '确定删除此条数据?'
      // }
      this.$confirm(alertMessage, this.$t('message.confirmTitle'), {
        confirmButtonText: this.$t('operation.confirm'),
        cancelButtonText: this.$t('operation.cancel'),
        type: 'warning'
      }).then(() => {
        deleteSingle({
          'dataIdList': [this.query.dataId], // 需要删除的行数据
          ...this.formQuery
        })
          .then(({ msg, result: { errorDataMemo, errorDataList, errorTypeList } }) => {
            // 如果成功删除
            if (!errorDataList || errorDataList.length <= 0) {
              this.$message({
                type: 'success',
                message: msg
              })
              this.dialogShow = false
              // 延迟刷新列表页，因为ES删除数据需要时间
              setTimeout(() => {
                tempVue.$emit('updateFormList')
              }, globalConst.DELAY_TIME)
            } else {
              // 删除失败
              let msg = ''
              errorTypeList.forEach(item => {
                msg += `<p>${item}</P>`
              })
              this.$alert(msg, this.$t('message.delFail'), {
                type: 'error',
                confirmButtonText: this.$t('operation.confirm'),
                dangerouslyUseHTMLString: true,
                callback: action => {

                }
              })
            }
          }).catch(() => {})
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('message.cancelDel')
        })
      })
    },
    /**
     * 刷新详情和列表
     */
    detailRefresh () {
      setTimeout(() => {
        this.init()
        this.$emit('detailUpdate')
        tempVue.$emit('updateFormList')
      }, globalConst.DELAY_TIME)
    },
    showChildrenDetail (query) {
      this.childrenDetailQuery = query
      this.childrenShow = true
    },
    openChild (data) {
      console.log('将要打开的子详情', data)
    },
    /**
     * 查询当前详情
     */
    getFormDataDetail () {
      // 每次请求需要初始化TABs
      this.detailTabs = []
      getFormDataDetail({ menuId: this.$route.query.menuId, ...this.query })
        .then(({
          result: {
            head,
            head: { button, title, workFlow, hasOuterLinkShare },
            special,
            tab,
            labelEditAttr,
            paasFormEntityExt
          }
        }) => {
          this.head = head
          this.labelEditAttr = labelEditAttr
          if (this.$route.query.subBusinessType === '712') {
            let index = this.head.secondTitle.findIndex(item => item.type === 'though')
            if (index !== -1) {
              let customerInfo = this.head.secondTitle[index].value[0]
              this.customerInfo = customerInfo
            }
          } else if (this.$route.query.subBusinessType === '810') {
            let index = this.head.secondTitle.findIndex(item => item.type === 'though')
            if (index !== -1) {
              let supplierInfo = this.head.secondTitle[index].value[0]
              this.supplierInfo = supplierInfo
            }
          }

          this.title = title
          this.isFocus = title.isFocus // 关注的状态
          // pid字段存在则说明改客户是从搜客转客户而来或者通过工商查询新建的客户
          this.soukePid = title.pid ? title.pid : ''
          // this.detailPermissionBts = button
          this.addFormPermissionBts = workFlow || []
          this.detailTabs = tab
          this.paasFormEntityExt = paasFormEntityExt || {}
          // 是否有外链分享按钮
          this.hasOuterLinkShare = Number(hasOuterLinkShare)

          // 初始化时请求可打印的模板
          // this.getPrintModelList()
          // 跨越发票
          if (this.head.crossMonth) {
            this.crossMonth = this.head.crossMonth
          }
          // 拨打电话
          if (this.head.dial) {
            if (typeof head.dial === 'string') {
              this.head.dial = JSON.parse(this.head.dial)
            }
            this.phoneList = this.head.dial
          }
          // 回款单详情头部印章
          if (this.head.title.sealPoJoList) {
            this.sealPoJoList = this.head.title.sealPoJoList
          }
          // 详情成功之后处理
          if ([this.pageBusinessType.CUSTOMER_MANAGEMENT, this.pageBusinessType.SALES_OPPORTUNITY, this.pageBusinessType.SALES_LEADS].indexOf(this.query.businessType) > -1) {
            // 销售阶段
            this.getOppoStage()
          } else if (this.query.businessType === this.pageBusinessType.COMMUNICATE_PLAN) {
            // 访客计划延期原因
            this.getPostponeCause()
          }
          // 这里为啥要等到详情页请求有了再请求呢 因为这个接口要等详情页接口获取到了 formId 才能到下面取值请求
          this.getEsignStatus()
        })
        .catch((error) => {
          console.log('getFormDataDetail', error)
          if (error.code) {
            // 数据不存在关闭详情
            this.dialogShow = false
          }
        })
        .finally(() => {
          this.detailLoading && this.detailLoading.close && this.detailLoading.close()
        })
    },
    // 销售阶段
    getOppoStage () {
      let params = {
        ...this.query,
        formId: this.formQuery.formId
      }
      if (this.query.businessType === this.pageBusinessType.CUSTOMER_MANAGEMENT) {
        // 客户阶段
        params.businessType = 108
      } else if (this.query.businessType === this.pageBusinessType.SALES_OPPORTUNITY) {
        // 销售机会阶段
        params.businessType = 304
      } else if (this.query.businessType === this.pageBusinessType.SALES_LEADS) {
        // 销售线索阶段
        params.businessType = 8005
      }
      getBusinessStage(params).then(data => {
        if (data.result) {
          this.customerStage = data.result
        }
      }).catch(() => {})
    },
    // 面包屑中客户成生成合同、机会赢单生成合同
    createContract (params) {
      console.log(222, params)
      let obj = {
        ...params,
        dataIdList: [this.query.dataId],
        getFormDataUrl: 'createContract'
      }
      this.formDetailLinkAdd(obj)
    },
    // 在客户详情时变更客户状态，如果当前页是阶段工作，把阶段工作也刷新
    refreshCustomerStage (isStageWork = false) {
      console.log(333, this.activeName)
      if (
        this.activeName === 'customerStage' &&
        this.customerStageInitFn
      ) {
        this.customerStageInitFn()
        // 刷新阶段工作
      }
      // 销售线索刷新详情页，改变状态显示
      if (this.query.businessType === 8000 && !isStageWork) {
        this.detailRefresh()
        return
      }
      // 刷新列表TODO(包含刷新详情)
      this.getOppoStage()
      tempVue.$emit('updateFormList')
    },
    // 获取表单的外链分享链接并复制到剪切板
    getOuterLinkShare () {
      utils.debounce(() => {
        // 调用接口获取链接地址
        getOuterLinkShareUrl({
          formId: this.formQuery.formId,
          businessType: this.formQuery.businessType,
          dataId: this.query.dataId,
          saasMark: this.formQuery.saasMark
        }).then((res) => {
          // 开发环境，后端返回的外链表单地址的前缀是后端的前缀，这里要截掉改成本地的
          this.copyHref = process.env.NODE_ENV === 'development' ? res.result.url.replace('localhost:8017', window.location.host) : res.result.url
          let transfer = document.getElementById('copy-href' + this.query.dataId)
          this.$nextTick(() => {
            transfer.select()
            document.execCommand('copy')
            transfer.blur()
            this.$message({
              message: this.$t('outerLink.expand.copySuccess'),
              type: 'success'
            })
          })
        })
      })()
    },
    startShowEsign () {
      if (!utils.isDingTalk() && !utils.isDevEnv()) {
        return this.$message({
          type: 'warning',
          message: this.$t('operation.pleaseOpenInDingTalk')
        })
      }
      const getTemplate = () => {
        const { appId, menuId, saasMark, formId } = this.formQuery
        const params = {
          appId, menuId, saasMark, formId
        }
        getModuleList(params).then(res => {
          console.log('模板列表', res)
          if (res.result.listPrintList) { // 容错处理
            this.formList = res.result.listPrintList
            this.showEsign = true
          } else {
            this.formList = []
            this.showEsign = true
          }
        }).catch(() => {})
      }
      const params = {
        dataId: this.query.dataId,
        formId: this.formQuery.formId
      }
      getEsignPreCheck(params).then(res => {
        if (res.result && res.result.code) {
          const confrimButton = {
            100098: this.$t('nouns.authentication'),
            100099: this.$t('nouns.recharge')
          }
          MessageBox.confirm(res.result.content, this.$t('message.confirmTitle'), {
            confirmButtonText: confrimButton[res.result.code] ? confrimButton[res.result.code] : this.$t('message.know'),
            cancelButtonText: res.result.pcUrl ? this.$t('operation.cancel') : false,
            type: 'warning'
          }).then(() => {
            if (res.result.code === 100098) {
              dd.biz.util.openLink({
                url: res.result.pcUrl
              })
            } else if (res.result.code === 100099) {
              this.$store.commit('SET_DETAIL_DIALOG_SHOW', false)
              this.$router.push(res.result.pcUrl)
            }
          }).catch(() => {})
        } else {
          getTemplate()
        }
      })
    },
    downLoadContract () {
      const params = {
        dataId: this.query.dataId,
        formId: this.formQuery.formId
      }
      downLoadEsign(params).then(res => {
        if (utils.isDingTalk()) {
          dd.biz.util.downloadFile({
            url: res.result.downloadUrl, // 要下载的文件的url
            name: '电子合同.pdf'
          })
        } else {
          window.open(res.result.downloadUrl)
        }
      })
    },
    // 详情页查询签署状态
    getEsignStatus () {
      const params = {
        dataId: this.query.dataId,
        formId: this.formQuery.formId
      }
      getEsignFlowStatus(params).then(res => {
        // console.log(res)
        this.esignStatus = res.result
      })
    },
    // 点击查看页前往E 签宝
    goEsign () {
      if (utils.isDingTalk() || utils.isDevEnv()) {
        const params = {
          dataId: this.query.dataId,
          formId: this.formQuery.formId
        }
        getEsignNoticeUrl(params).then(res => {
          dd.biz.util.openLink({
            url: res.result.pcUrl
          })
        })
      } else {
        this.$message({
          type: 'warning',
          message: this.$t('operation.pleaseOpenInDingTalk')
        })
      }
    },

    // 获取埋点拼接参数
    getDataGrow (targetBusinessType, alias) {
      return {
        alis: `${targetBusinessType}-detail-${this.formQuery.businessType}-${alias}`
      }
    },

    // 监听滚动来判断部分tab标签页是否需要加载下一页
    addLoadMore (cb) {
      const scrollAdd = this.$refs['scrollTest']
      if (scrollAdd) {
        scrollAdd.addEventListener('scroll', () => {
          let scrollTop = scrollAdd.scrollTop
          let blockHeight = scrollAdd.clientHeight
          let scrollHeight = scrollAdd.scrollHeight
          if ((scrollHeight - (scrollTop + blockHeight) <= 50) && (scrollHeight - (scrollTop + blockHeight) >= 0)) {
            this.isLoadMore = true
          } else {
            this.isLoadMore = false
          }
        })
      }
    }
  }
}
</script>

<style lang="scss">
@import './index.scss'; // 冻结的固定css
.workflow-approve-detail {
  padding-left: 20px;
  padding-top: 20px;
  height: 100%;
  .workflowTitle__close-btn {
    position: absolute;
    background: #fff;
    height: 50px;
    width: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    cursor: pointer;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    top: 0px;
    left: -51px;
  }
  .workflowTitle__close-btn:hover {
    color: #E05353;
  }
}
.form-data-detail {
  .el-zoom-in-right-enter-active {
    transition: all .6s ease;
  }
  .el-zoom-in-right-leave-active {
    // transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    transition: all .8s ease;
  }
  .el-zoom-in-right-enter, .el-zoom-in-right-leave-to
  /* .el-zoom-in-right-leave-active for below version 2.1.8 */ {
    transform: translateX(600px);
    opacity: 0;
  }
  em.el-tooltip {
    font-style: normal;
    // white-space: nowrap;
    // text-overflow: ellipsis;
    // overflow: hidden;
    // max-width: 100px;
    display: inline-block;
    vertical-align: top;
  }
}
.scroll-body {
  overflow: scroll;
  height: 100%;
}
.go-esign {
  color: #FF8E3D;
  cursor: pointer;
}
.blue-tag {
  color: #409eff;
  border: 1px solid #409eff;
}
.copy-href-hidden {
  opacity: 0;
  position: absolute;
  top: -15px;
}
.tag-list {
  max-height: 60px;
  overflow: auto;
  margin-right: 10px;
  span {
    margin-bottom: 5px;
  }
  .tag-label__ellipsis {
    display: none;
    // display: inline-block;
    height: 24px;
    width: 32px;
    line-height: 24px;
    text-align: center;
    color: #D8D8D8;
    background-color: #FAFAFA;
    margin-right: 5px;
  }
  .tag-label__add {
    display: inline-block;
    height: 23px;
    width: 32px;
    line-height: 23px;
    text-align: center;
    color: #D8D8D8;
    background-color: #FAFAFA;
    border: 1px dashed #D8D8D8;
    box-sizing: border-box;
    border-radius: 2px;
    cursor: pointer;
  }
}
</style>
