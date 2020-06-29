const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development', // mode值为production的时候，会自动设置process.env.NODE_ENV 为production。在入口文件中拿到的process.env.NODE_ENV为production，但是要想在配置文件中使用环境变量，必须使用cross-env NODE_ENV=production先设置好环境变量
  devtool: 'inline-source-map',
/*   module: {
    rules: [
      {
        enforce: 'pre',
        test: /(\.js(x?))|(\.ts(x?))$/,
        exclude: /[\\/]node_modules[\\/]/,
        loader: 'eslint-loader',
      }
    ]
  }, */
  devServer: {
    open: true,
    hot: true, // 配置hot为true的时候会使用hot-module-replacement让文件内容改变时，重新加载相应模块（不是重新加载整个应用）
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'http://www.a-fake-url.com',
        changeOrigin: true,
      },
    },
    // stats: 'errors-warnings',// 设置只打印错误信息和警告信息。
  },
});
