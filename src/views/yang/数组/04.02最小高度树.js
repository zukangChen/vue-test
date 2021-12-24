/*
 * @Author: 陈祖康
 * @Date: 2021-07-08 19:20:22
 * @LastEditors: 陈祖康
 * @LastEditTime: 2021-07-10 10:44:22
 * @Description: 
 * @Props: 
 * @Emit: 
 */
// 给定一个有序整数数组，元素各不相同且按升序排列，编写一个算法，创建一棵高度最小的二叉搜索树。
// 示例:
// 给定有序数组: [-10,-3,0,5,9],

// 一个可能的答案是：[0,-3,9,-10,null,5]，它可以表示下面这个高度平衡二叉搜索树：

//           0 
//          / \ 
//        -3   9 
//        /   / 
//      -10  5 


/**
 * @param {number[]} nums
 * @return {TreeNode}
 */
// [-10,-3,0,5,9]
let test = [-10,-9,-8,-7,-6,-5,0,5,6,7,8,9,10]
let sortedArrayToBST = function(nums) {
  if (nums.length <= 0) return null
  // if (nums.length <= 1) return nums
  let cur = Math.floor((nums.length/2))
  return {
    val: nums[cur],
    left: sortedArrayToBST(nums.slice(0, cur)),
    right: sortedArrayToBST(nums.slice(cur+1))
  }
  // arr.push(nums[cur])
  // let left = nums.slice(0, cur)
  // let right = nums.slice(cur+1, nums.length)
  // sortedArrayToBST(left)
  // sortedArrayToBST(right)
};
let treeNode = sortedArrayToBST(test)

// 层序遍历(广度遍历) + 队列
// 思路：二叉树的层序遍历，即二叉树的广度遍历，先遍历根节点的相邻节点，再一次遍历相邻节点的子节点。
// 广度遍历通常借助队列来实现。用队列来存储当前层的节点数，遍历当前层的节点，将当前层的节点依次推入数组subRes[]，
// 再将当前节点的左右子节点推入队列中，进入下一层进行遍历，直到遍历完整棵树，即完成到二叉树的层序遍历。

function getTreeNode (tree) {
  let res = [] // 返回的遍历结果数组
  let que = [tree]
  while(que.length>0) {
    let sub = que.shift() // 每次拿出队列的第一个树节点，直到清空队列
    res.push(sub.val) // 将树节点的val存入结果数组
    if(sub.left) que.push(sub.left) // 将左节点加入队列中
    if(sub.right) que.push(sub.right) // 将右节点加入队列中
  }
  return res
}
console.log('tree', treeNode)
let treeArr = getTreeNode(treeNode)
console.log('treeArr', treeArr) // [0,  -7,  8, -9, -5, 6,10, -10, -8, -6,  5, 7,9]

//广度遍历 + 队列
let levelOrder = function(root) {
    if(!root){
        return []
    }
    let res = [] //结果最外层数组
    let queue = [root]
    while(queue.length>0){
        let len = queue.length//当前层的节点数目
        let subRes = []
        for(let i=0;i<len;i++){
            let node = queue.shift() //节点出列
            subRes.push(node.val) //将当前层的节点值加入subRes数组中
            //将下一层节点计入队列中
            if(node.left){
                queue.push(node.left)
            }
            if(node.right){
                queue.push(node.right)
            }
        }
        res.push(subRes)
    }
    return res
};
console.log('leetcode', levelOrder(treeNode)) // [[0],[-7,8],[-9,-5,6,10],[-10,-8,-6,5,7,9]]