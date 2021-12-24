/*
 * @Author: 陈祖康
 * @Date: 2020-05-16 15:28:51
 * @LastEditors: 陈祖康
 * @LastEditTime: 2020-07-19 16:41:11
 * @Description: 
 * @Props: 
 * @Emit: 
 */ 
function shop(top, shops) {
  let sum = 0;
  let i =0;
  if (Number(shops[0])>top) {
    console.log('商品价格太高，无法购买')
  }else{
    while(sum + Number(shops[i]) <= top) {
      sum = sum + Number(shops[i])
      i++
    }
    console.log(sum)
  }
}

let str1 = '125 30 55 100 12 15';
let str2 = str1.split(' ');
str2.sort((a,b)=>{
  return a-b;
})

shop(100, str2)