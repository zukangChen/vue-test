/*
 * @Author: 陈祖康
 * @Date: 2021-07-21 14:56:38
 * @LastEditors: 陈祖康
 * @LastEditTime: 2021-07-22 09:36:58
 * @Description: 时间格式化输出
 * @Props: 
 * @Emit: 
 */
/**
 * 描述
按所给的时间格式输出指定的时间
格式说明
对于 2014.09.05 13:14:20
yyyy: 年份，2014
yy: 年份，14
MM: 月份，补满两位，09
M: 月份, 9
dd: 日期，补满两位，05
d: 日期, 5
HH: 24制小时，补满两位，13
H: 24制小时，13
hh: 12制小时，补满两位，01
h: 12制小时，1
mm: 分钟，补满两位，14
m: 分钟，14
ss: 秒，补满两位，20
s: 秒，20
w: 星期，为 ['日', '一', '二', '三', '四', '五', '六'] 中的某一个，本 demo 结果为 五
示例1
输入：
formatDate(new Date(1409894060000), 'yyyy-MM-dd HH:mm:ss 星期w')
输出：
2014-09-05 13:14:20 星期五
 */
// 方法一有问题
function PrefixZero(num, n) {
    return (Array(n).join(0) + num).slice(-n);
}
const dayMap = {
  '1': '星期一',
  '2': '星期二',
  '3': '星期三',
  '4': '星期四',
  '5': '星期五',
  '6': '星期六'
}
let timeObj = {
  'yyyy': (time) => {
    return time.getFullYear().toString() + '-'
  },
  'yy': (time) => {
    return time.getFullYear().toString().slice(2) + '-'
  },
  'MM': (time) => {
    return PrefixZero(time.getMonth() + 1, 2).toString() + '-'
  },
  'M': (time) => {
    return (time.getMonth()+1).toString() + '-'
  },
  'dd': (time) => {return PrefixZero(time.getDay(), 2).toString() + ' '},
  'd': (time) => {return time.getDay().toString() + ' '},
  'HH': (time) => {return PrefixZero(time.getHours(), 2).toString() + ':'},
  'H': (time) => {return time.getHours().toString() + ':'},
  'hh': (time) => {
    return PrefixZero(time.getHours() >= 12 ? time.getHours()-12 : time.getHours(), 2).toString() + ':'
  },
  'h': (time) => {return (time.getHours() >= 12 ? time.getHours()-12 : time.getHours()).toString() + ':'},
  'mm': (time) => {return PrefixZero(time.getMinutes(),2).toString() + ':'},
  'm': (time) => {return time.getMinutes().toString() + ':'},
  'ss': (time) => {return PrefixZero(time.getSeconds(),2).toString() + ' '},
  's': (time) => {return time.getSeconds().toString() + ' '},
  '星期w': (time) => {
    return dayMap[time.getDay()]
  },
}
function formatDate (time, formatStr) {
  let strArr = formatStr.split(' ')
  let arr = []
  console.log(strArr)
  let arr0 = strArr[0].split('-')
  let arr1 = (strArr[1] && strArr[1].split('-')) || []
  let arr2 = strArr[2] || []
  arr = [...arr0, ...arr1, arr2]
  console.log(arr)
  let str = ''
  arr.forEach((item) => {
    str = str + timeObj[item](time).toString()
    console.log('str', str)
  })
  console.log('str', str)
  return str
}
// formatDate(new Date(1409894060000), 'yyyy-MM-dd HH:mm:ss 星期w')
let localOffset = new Date().getTimezoneOffset()*60*1000; 
formatDate(new Date(1409894060999+localOffset), 'yyyy-MM-hh-ss-dd-mm')

function formatDate2(date, format = "yyyy-MM-dd HH:mm:ss 星期w") {
  let o = {
    "M+" : date.getMonth()+1,                 //月份
    "d+" : date.getDate(),                    //日
    "H+" : date.getHours(),                   //24小时
    "h+":date.getHours()>12?date.getHours()-12:date.getHours(), //12小时
    "m+" : date.getMinutes(),                 //分
    "s+" : date.getSeconds(),                 //秒
     "w" :"日一二三四五六".charAt(date.getDay())
 
  };
  // 年份
  if(/(y+)/.test(format)){
      //与正则表达式匹配的第一个 子匹配(以括号为标志)字符串  RegExp.$1
    format=format.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
  }
 
  for(let k in o){
    if(new RegExp("("+ k +")").test(format)){
      format = format.replace(
        RegExp.$1, (RegExp.$1.length===1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length))); 
    }      
  }
 
  return format;
}
formatDate2(new Date(1409894060999+localOffset), 'yyyy-MM-hh-ss-dd-mm')