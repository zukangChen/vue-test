<template>
  <div class="home">
    <!-- <my-table :table="table"></my-table> -->
    <order-table :tableObj="orderTable"></order-table>
    <!-- <list-table :tableData ="listTable.data" :tableHead="listTable.header"></list-table> -->
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="table.pageSize"
      :total="table.data.length"
      @current-change="currentChange"
      @prev-click="preClick"
      @next-click="nextClick">
    </el-pagination>
  </div>
</template>

<script>
// import myTable from "./my-table";
import orderTable from './order-table'
// import ListTable from './list-table.vue';
export default {
  name: "home",
  components: {
    // "my-table": myTable,
    orderTable,
    // ListTable
  },
  data() {
    // OrderTable
    return {
      table: {
        pageSize: 2,
        stripe: false, //是否为斑马纹
        loading: false, // 数据加载loading
        data: [
          {
            date: "2016-05-02",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1518 弄",
            img:"https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1941791201,474736097&fm=26&gp=0.jpg",
          },
          {
            date: "2016-05-04",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1517 弄",
            img:"https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1941791201,474736097&fm=26&gp=0.jpg",
          },
          {
            date: "2016-05-01",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1519 弄",
            img:"https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1941791201,474736097&fm=26&gp=0.jpg",
          },
          {
            date: "2016-05-03",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1516 弄",
            img:"https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1941791201,474736097&fm=26&gp=0.jpg",
          }
        ],
        event: {
          sortEvent: this.tableSort
        },
        header: [
          {
            prop: "selection",
            type: "selection",
            width: "55",
            fixed: "left"
          },
          {
            prop: "date",
            label: "日期",
            width: "180",
            formatter: ""
          },
          {
            prop: "name",
            label: "名称",
            tooltip: false,
            sortable: false
          },
          {
            type: 6,
            prop: "img",
            label: "头像",
            width: "180",
            isImg: true
          },
          {
            prop: "address",
            label: "地址",
            width: "180",
            tooltip: true
          },
          {
            type: 30000,
            prop: "options",
            label: "操作",
            width: "200",
            fixed: "right"
          }
        ],
        options: [
          {
            type: "success",
            label: "通过",
            event: this.checkPass,
            isShow: item => {
              return item.status === 0 ? false : true;
            }
          },
          {
            type: "danger",
            label: "不通过",
            event: this.checkNoPass,
            isShow: item => {
              return item.status === 1 ? false : true;
            }
          }
        ]
      },
      orderTable :{
      data: [
        {
          smile: '有',
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          img: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1941791201,474736097&fm=26&gp=0.jpg',
        },
        {
          smile: '何',
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄',
          img: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1941791201,474736097&fm=26&gp=0.jpg',
        },
        {
          smile: '不',
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
          img: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1941791201,474736097&fm=26&gp=0.jpg',
        }
      ],
      header: [
        {
          attrtype: 'smile',
          label: '梦',
          width: '180',
          // fixed: 'left'
        },
        {
          attrtype: 'name',
          label: '名称',
          tooltip: false,
          sortable: false,
          isClickThrough: true,
          width: '180'
          // fixed: 'left'
        },
        {
          attrtype: 'date',
          label: '日期',
          width: '180',
          // fixed: 'left'
        },
        // {
        //   attrtype: 'selection',
        //   type: 'selection',
        //   width: '55',
        //   fixed: 'left'
        // },
        {
          type: 6,
          attrtype: 'img',
          label: '商品信息',
          width: '180',
          isImg: true
        },
        {
          attrtype: 'address',
          label: '地址',
          width: '180',
          tooltip: true
        },
        {
          type: 30000,
          attrtype: 'options',
          label: '操作',
          width: '200',
          // fixed: 'right'
        }
      ],
      options: [
        {
          type: 'success',
          label: '通过',
          isShow: true
        },
        {
          type: 'danger',
          label: '不通过',
          isShow: true
        }
      ],
      img: [
        'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1941791201,474736097&fm=26&gp=0.jpg'
      ]
    }
    };
  },
  provide() {
        return {
            table: this.table
        }
    },
  methods: {
    //表格分类
    tableSort(val) {
      console.log(val);
    },
    //通过
    checkPass(val) {
      console.log(val);
    },
    //不通过
    checkNoPass(val) {
      console.log(val);
    },
    //当前页
    currentChange(page) {
      console.log('page', page)
    },
    //点击上一页
    preClick() {
      // console.log('page', page)
    },
    //点击下一页
    nextClick() {
      // console.log('page', page)
    }
  }
};
</script>