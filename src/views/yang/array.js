/*
 * @Author: 陈祖康
 * @Date: 2021-08-17 14:14:36
 * @LastEditors: 陈祖康
 * @LastEditTime: 2021-08-17 14:15:24
 * @Description: 
 * @Props: 
 * @Emit: 
 */
// 快速排序
let quickSort = function (arr) {
  if (arr.length < 1) { //如果数组就是一项，那么可以直接返回
    return arr;
  }
  let centerIndex = Math.floor(arr.length / 2); //获取数组中间的索引
  let centerValue = arr[centerIndex]; //获取数组中间项
  let left = [], right = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < centerValue) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return quickSort(left).contanct([centerValue], quickSort(right)); //递归调用
}

// 冒泡排序
let bubbleSort = function (arr) {
  let len = arr.length;
  for (let i = 0; i < len; i++) {
    for (let j = 0; i < len - 1 - i; i++) {
      if (arr[j] > arr[j + 1]) { //相邻元素两两对比
        let temp = arr[j + 1]; //元素交换
        arr[j + 1] = arr[j];
        arr[j] = temp;
      }
    }
  }
  return arr;
}
