/*
 * @Author: 陈祖康
 * @Date: 2021-07-24 16:55:53
 * @LastEditors: 陈祖康
 * @LastEditTime: 2021-07-24 17:07:43
 * @Description: 颜色字符串转换
 * @Props: 
 * @Emit: 
 */
/**
 * 描述
将 rgb 颜色字符串转换为十六进制的形式，如 rgb(255, 255, 255) 转为 #ffffff
1. rgb 中每个 , 后面的空格数量不固定
2. 十六进制表达式使用六位小写字母
3. 如果输入不符合 rgb 格式，返回原始输入
示例1
输入：
'rgb(255, 255, 255)'
复制
输出：
#ffffff
 */

function rgb2hex(sRGB) {
    let arr = sRGB.match(/\d{1,3},(.)*\d{1,3},(.)*\d{1,3}/g)
    if (arr) {
        let newArr = arr.toString().split(',')
        return '#' + smile(newArr[0]) + smile(newArr[1]) + smile(newArr[2])
    }else {
        return sRGB
    }
}
function smile (num) {
    return num < 16 ? '0' + parseInt(num).toString(16) : parseInt(num).toString(16)
}
console.log('smile', rgb2hex('rgb(0, 0, 0)'))

// //方式1：行数最少

// function rgb2hex(sRGB) {
//     return sRGB.replace(/^rgb\((\d+)\s*,\s*(\d+)\s*,\s*(\d+)\)$/,function($0,$1,$2,$3){
//         return '#'+('0'+(+$1).toString(16)).slice(-2)+('0'+(+$2).toString(16)).slice(-2)+('0'+(+$3).toString(16)).slice(-2);
//     });
// }

// //方式2：行数较少，代码较少，容易理解

// function rgb2hex(sRGB) {
//     return sRGB.replace(/^rgb\((\d+)\s*,\s*(\d+)\s*,\s*(\d+)\)$/,function($0,$1,$2,$3){
//         return '#'+toHex($1)+toHex($2)+toHex($3);
//     });
// }
// function toHex(str){
//     return ('0'+(+str).toString(16)).slice(-2);
// }

// //方式3：行数较少，代码最少，容易理解？  //
// function rgb2hex(sRGB){
//     var result=['#'];
//     if(!/rgb\(\d+(,\s*\d+){2}\)/.test(sRGB)){
//         return sRGB;
//     }
//     sRGB.replace(/\d+/g,function($0){
//         result.push(('0'+(+$0).toString(16)).slice(-2));
//     });
//     return result.join('');
// }