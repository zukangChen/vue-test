/*
 * @Author: 陈祖康
 * @Date: 2021-06-22 11:09:31
 * @LastEditors: 陈祖康
 * @LastEditTime: 2021-06-22 14:10:38
 * @Description: 事件循环机制
 * @Props: 
 * @Emit: 
 */
console.log(1);
setTimeout(() => {
  console.log(2);
  process.nextTick(() => {
    console.log(3);
  });
  new Promise((resolve) => {
    console.log(4);
    resolve();
  }).then(() => {
    console.log(5);
  });
});
new Promise((resolve) => {
  console.log(7);
  resolve();
}).then(() => {
  console.log(8);
});
process.nextTick(() => {
  console.log(6);
});
setTimeout(() => {
  console.log(9);
  process.nextTick(() => {
    console.log(10);
  });
  new Promise((resolve) => {
    console.log(11);
    resolve();
  }).then(() => {
    console.log(12);
  });
});







// 1 7 6 8 2 4 9 11 3 10 5 12