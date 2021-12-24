/*
 * @Author: 陈祖康
 * @Date: 2021-03-09 10:47:59
 * @LastEditors: 陈祖康
 * @LastEditTime: 2021-09-06 14:51:54
 * @Description: 总有远方可奔赴
 * @Props: 
 * @Emit: 
 */
// function Button(id) {
//     this.element = document.querySelector("#" + id);
//     this.bindEvent();
// }


// Button.prototype.bindEvent = function() {
//     this.element.addEventListener("click", this.setBgColor, false);
// };

// Button.prototype.setBgColor = function() {
//     this.element.style.backgroundColor = '#1abc9c'
// };

// var button = new Button("button");
// console.log('button', button)
let arr1 = [{skulist:[{id:1,name:'xiaoming'}, {id:2, name:'xiaogang'}, {id:3, name:'xiaohong'}]}, {skulist:[{id:4,name:'xiaowang'}, {id:5, name:'xiaogang'}, {id:6, name:'xiaohong'}]}]
let arr2 = [{id:1,age:'xiaoming'}, {id:2, name:'xiaogang'}, {id:4, name:'xiaowang'}]
// let arr5 = []
let arr7 = []
arr7 = arr2.map((item) => {
  return item.id
})
console.log('arr7', arr7)
// const arr3 = arr1.filter((item) => {
//   return !arr7.includes(item.id)
// })
let arr8 = JSON.parse(JSON.stringify(arr1))
arr1.forEach((item, index) => {
  item.skulist.forEach((skuItem, skuIndex) => {
    arr2.forEach((aitem) => {
      skuItem.id === aitem.id && arr8[index].skulist.splice(skuIndex, 1)
      console.log('arr8', arr8)
    })
  }) 
})
console.log('arr1', arr1)
// let arr3 = []
// arr2.forEach((aitem) => {
//   const arr5 = arr1.filter((item) => {
//     return item.id !== aitem.id
//   })
//   arr3 = arr3.concat(arr5)
// })
// console.log('arr3',arr3)
async function smile() {
  console.log('1')
  await new Promise ((resolve)=>{
  setTimeout(()=> {
    console.log('2')
    resolve()
  }, 500)
})
  console.log('3')
}
smile()

Promise.resolve(function(){
  setTimeout(() => {
    console.log('66')
  })
  console.log('0')
  return 88
}())
.then((res) => {
  console.log('5')
  return new Promise((resolve) => {
    console.log('9')
    setTimeout(()=> {
      console.log('1', res)
      resolve(16)
    })
  })
  // return setTimeout(()=> {
  //   console.log('1', res)
  //   return Promise.resolve(16)
  // })
  // return Promise.resolve(22)
})
.then(full => console.log('2', full))

// 使用 reduce、concat 和递归展开无限多层嵌套的数组
let arr20 = [1, 2, 3, [1, 2, 3, 4, [2, 3, 4]]];

function flatDeep(arr, d = 1) {
  console.log(d)
  // return arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flatDeep(val, d - 1) : val), [])
  // return d > 0 ? arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flatDeep(val, d - 1) : val), [])
  //   : arr.slice();
}


console.log(flatDeep(arr20, Infinity))

// 扁平化数组
function flatArr(arr) {
  return arr.reduce((acc,cur) => {
    return acc.concat(Array.isArray(cur) ? flatArr(cur) : cur)
  }, [])
}
let flatArr1 = [1, 2, 3, [1, 2, 3, 4, [2, 3, 4]]];
console.log('flatArr', flatArr(flatArr1))