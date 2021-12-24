/*
 * @Author: 陈祖康
 * @Date: 2021-06-30 10:02:02
 * @LastEditors: 陈祖康
 * @LastEditTime: 2021-06-30 11:13:54
 * @Description: 多维数组拍平
 * @Props: 
 * @Emit: 
 */
const arr = [1,[2,3],[[4,5]],[[6,7],[8,9]]]
let result = []
function myFlat (arr) {
  arr.forEach(item => {
    if (Array.isArray(item)) {
      myFlat(item)
    } else {
      // result = [...result, item]
      // result = result.concat(item)
      result.push(item)
    }
  });
}
myFlat(arr)
console.log('res', result)

let result2 = []
function myFlat2 (arr) {
  result2 = arr.flat(Infinity)
}
myFlat2(arr)
console.log('res2', result2)

