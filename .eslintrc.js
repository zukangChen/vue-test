/*
 * @Author: 陈祖康
 * @Date: 2020-03-30 16:43:48
 * @LastEditors: 陈祖康
 * @LastEditTime: 2021-09-09 16:45:07
 * @Description: 
 * @Props: 
 * @Emit: 
 */
module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  parserOptions: {
    // 解析器
    parser: 'babel-eslint',
    sourceType: "module",
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 'no-console': true,
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'eqeqeq': 2,
    'no-var': 2,
  },
  "globals": {
    "utils": true
  }
}
