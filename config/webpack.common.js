const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const devMode = process.env.NODE_ENV !== 'production'; // true 开发环境 false 生产环境

module.exports = {
  entry: {
    app: path.resolve(__dirname, '../src/index.tsx'),
  },
  resolve: {
    extensions: ['.js', '.jsx','.ts', '.tsx'], // 定义好文件后缀名后，在import文件的时候，就可以不加文件后缀名了。  
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
  },
  output: {
    filename: devMode ? '[name].js' : '[name].[hash].js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        exclude: /[\\/]node_modules[\\/]/,
        loader: 'html-loader', //用来将html文件解析为字符串的
        options: {
          minimize: !devMode,
        }
      },
      {
        test: /(\.js(x?))|(\.ts(x?))$/,
        exclude: /[\\/]node_modules[\\/]/,
        use:[
          // 'thread-loader',
          'babel-loader?cacheDirectory=true',
        ]
      },
      {
        test: /\.s[ac]ss$/i,
        exclude: /[\\/]node_modules[\\/]/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: true,
              hmr: devMode,
            },
          },
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        exclude: /[\\/]node_modules[\\/]/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/[name].[sha512:hash:base64:7].[ext]',
            },
          }
        ],
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin(), //用于清除上次打包的文件
    new HtmlWebpackPlugin({ //用于生成一个html文件
      title: 'my-react-cli',
      template: path.resolve(__dirname, '../src/index.html'),
      filename: 'index.html',
    }),
    new webpack.ProvidePlugin({ // 定义自动查找的标志符  当需要变量React的时候，会自动到当前目录或者node_modules中去找react模块。这样就不用在每个组件文件中都使用一次import React from 'react'了
      React: 'react',
      ReduxConnect: ['react-redux', 'connect'],
      Axios: 'axios',
      UseEffect: ['react', 'useEffect'],
    }),
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : '[name].[hash].css',
    }),
  ],
/*   optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        },
      },
    },
  } */
  optimization: {
    runtimeChunk: 'single', // 表示生成一个单独的运行时文件，这个文件会被所有的块（chunks）共享。
    splitChunks: {
      maxInitialRequests: 6, // 设置入口文件的最大并行请求数量为6。
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
            return `npm.${packageName.replace('@', '')}`;
          },
          chunks: 'all'
        },
      },
    },
  }
}
