const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");

// const CompressionPlugin = require('compression-webpack-plugin');
// 使用gzip压缩js和css文件，允许缓存文件，压缩后的文件名在原本文件名后面加上了.gz后缀。需要在服务端配置优先使用gz文件，这样当服务器收到一个请求比如a.js的时候，会先去找a.js.gz文件，如果找不到a.js.gz再去找未压缩的文件a.js。

const smp = new SpeedMeasurePlugin();

module.exports = smp.wrap(merge(common, {
  mode: 'production', //mode为production的时候，Webpack会将process.env.NODE_ENV设置为production。并且自动配置了terser-webpack-plugin，这个插件利用terser过滤掉js中多余的内容，包括去掉js中的注释和空格。
  devtool: 'source-map',
  output: {
    publicPath: '/', 
  },
  // stats: 'errors-warnings',// 设置只打印错误信息和警告信息。
/*   plugins: [
    new CompressionPlugin({
      cache: true,
      algorithm: 'gzip',
      test: /\.(js|css)$/,
    }),
  ], */
}));
