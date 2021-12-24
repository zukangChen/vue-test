/*
 * @Author: 陈祖康
 * @Date: 2020-07-19 16:37:05
 * @LastEditors: 陈祖康
 * @LastEditTime: 2021-09-29 15:34:49
 * @Description: 
 * @Props: 
 * @Emit: 
 */
// webpack 是node写出来的 node的写法
// let path = require('path')
module.exports = {
  //  publicPath: process.env.NODE_ENV === 'production' ? './' : '/', // 有时间试验一下是否是网络问题
  // build时构建文件的目录 构建时传入 --no-clean 可关闭该行为
  outputDir: 'dist',

  // build时放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
  assetsDir: 'assets',
  publicPath: './', // 打包加载资源的路径
  // 指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径。
  indexPath: 'index.html',
  pages: {
    index: {
      // page 的入口
      entry: 'src/main.js',
      // 模板来源
      template: 'public/index.html',
      // 在 dist/index.html 的输出
      filename: 'index.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'Index Page',
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      // chunks: ['chunk-vendors', 'chunk-common', 'index']
    },
    // 当使用只有入口的字符串格式时，
    // 模板会被推导为 `public/subpage.html`
    // 并且如果找不到的话，就回退到 `public/index.html`。
    // 输出文件名会被推导为 `subpage.html`。
    // subpage: 'src/subpage/main.js'
  },
  devServer: { // 开发服务器的配置
    // port: 3001,
    hot: true, // 热更新
    progress: true,
    compress: true,
    contentBase: './build', // 指定打包后的地址
    open: true// 打包后自动打开浏览器
  },
  // mode: 'development', // 模式 默认两种 production 生产 development 开发
  // entry: './src/index.js', // 入口
  // output: {
  //   filename:'bundle.js', // 打包后的文件名
  //   path: path.resolve(__dirname,'build'), // 路径必须是一个绝对路径
  // },
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': [
          './src/theme'
        ]
      }
    }
  },
  // watch: true,
  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: false
    }
  }
}
