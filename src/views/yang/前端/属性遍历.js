/*
 * @Author: 陈祖康
 * @Date: 2021-07-24 17:50:34
 * @LastEditors: 陈祖康
 * @LastEditTime: 2021-07-24 18:10:14
 * @Description: 属性遍历
 * @Props: 
 * @Emit: 
 */
/**
 * 描述
  找出对象 obj 不在原型链上的属性(注意这题测试例子的冒号后面也有一个空格~)
  1、返回数组，格式为 key: value
  2、结果数组不要求顺序
  示例1
  输入：
  var C = function() {this.foo = 'bar'; this.baz = 'bim';}; 
  C.prototype.bop = 'bip'; 
  iterate(new C());
  复制
  输出：
  ["foo: bar", "baz: bim"]
 */

  function iterate(obj) {
    const temp = []
    for(let key in obj){
        if(obj.hasOwnProperty(key)){
            temp.push(key.concat(': ',obj[key]))
        }
    }
    return temp
}
let C = function() {this.foo = 'bar'; this.baz = 'bim';}
C.prototype.bop = 'bip'
console.log('smile', iterate(new C()))
console.log('smile', iterate2(new C()))
console.log('smile', iterate3(new C()))

//1、Object.keys(obj) 只会遍历实例属性key值，不会遍历原型上的属性

function iterate2(obj) {
    const keyArr = Object.keys(obj)
    const temp = []
    for(let i in keyArr){
        temp[i] = keyArr[i].concat(': ',obj[keyArr[i]])
    }
    return temp
}
//2、for in可以遍历到obj的原型属性和方法，如果不想遍历原型上的，可以在循环内通过obj.hasOwnProperty()判断其是否是自己的实例属性

function iterate3(obj) {
    const temp = []
    for(let key in obj){
        if(obj.hasOwnProperty(key)){
            temp.push(key.concat(': ',obj[key]))
        }
    }
    return temp
}

