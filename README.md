# react + ts + react-router + redux + webpack 脚手架说明

> By 7yue at 2020.06.29.

## 初始化
 - `mkdir my-react-cli` - 创建项目目录
 - `npm init -y` - 初始化项目
 >-y 的意思是初始化项目的过程中所有的选项选择默认项

## Webpack配置
  >`npm i --save-dev webpack webpack-cli`
    
  #### 三个配置文件
  - `webpack.common.js` - 通用的webpack配置
  - `webpack.dev.js` - 开发环境的webpack配置
  - `webpack.prod.js` - 生产环境的webpack配置

  #### 打包html、js文件
  >`npm i --save-dev html-webpack-plugin html-loader clean-webpack-plugin`
  - `html-loader` - 用来将html文件解析为字符串的
  - `html-webpack-plugin` - 用于生成一个html文件
  - `clean-webpack-plugin` - 用于清除上次打包的文件

  #### cross-env
  >`npm i --save-dev cross-env`
  
  package.json文件的scripts部分
  ```
    "scripts": {
        "start": "cross-env NODE_ENV=development webpack-dev-server --config ./config/webpack.dev.js",
        "build": "cross-env NODE_ENV=production webpack --config ./config/webpack.prod.js",
        "build:dev": "cross-env NODE_ENV=development webpack --config ./config/webpack.dev.js"
    }
  ```
  >build:dev 是为了方便查看以不压缩的方式打包后的代码内容。
  
  >当设置mode值为production的时候，会自动设置process.env.NODE_ENV 为production。在入口文件中拿到的process.env.NODE_ENV为production，但是要想在配置文件中使用环境变量，必须使用cross-env NODE_ENV=production先设置好环境变量，否则webpack.common.js文件中是拿到的process.env.NODE_ENV为undefined。

  #### 合并webpack配置
  >`npm i --save-dev webpack-merge webpack-dev-server`
  - `webpack-merge` 用来合并webpack配置
  - `webpack-dev-server` 供一个服务器

    
  #### 使用Sass
  > - `npm i --save-dev css-loader sass-loader node-sass`
  > - `npm i --save-dev postcss postcss-loader autoprefixer`
  > - `npm i --save-dev mini-css-extract-plugin`
  - `node-sass` - sass-loader需要
  - `sass-loader` - 将sass/scss文件解析为css
  - `css-loader` - 解析css文件
  - `postcss-loader` - 使用postcss对css进行添加属性前缀等处理。
  - `autoprefixer` - 在postcss中使用的插件，它解析CSS并根据Can I Use中值给CSS添加供应商前缀
  >postcss需要在根目录创建文件postcss.config.js
  ```
  module.exports = {
    plugins: [
      require('autoprefixer')
    ]
  }
  ```
  - `MiniCssExtractPlugin` - 将每个js中引入的css提取为单独的一个css文件。

  #### 引入图片
  > `npm i --save-dev file-loader`
  - `MiniCssExtractPlugin` - 将import、require、url()等引入的文件解析为一个路径，然后再将该路径下的文件放到output目录下，不光是图片文件，像字体文件等也可以使用file-loader来处理。

  #### 使用 babel
  >babel 的作用是将代码转换为在浏览器上能正常运行的代码。其实上文中已经使用babel来解析JSX和TypeScript了。但是解析过JSX和TypeScript之后得到的JavaScript可能依然无法在某些浏览器上正常运行，所以需要使用@babel/preset-env，@babel/preset-env根据设置的目标环境找出所需的插件，并将插件列表传给babel，这样只需配置好目标环境，其他的babel会进行处理。

  >`npm i --save-dev @babel/preset-env`

  #### 使用 aync / await 
  > `npm i --save-dev  @babel/plugin-transform-runtime`
  ```
    "plugins": [
      "@babel/plugin-transform-runtime"
    ]
  ```

  #### 一些配置技巧
  - 在 `extensions` 中定义好文件后缀名后，在 import 文件的时候，就可以不加文件后缀名了。webpack 会按照定义的后缀名的顺序依次处理文件
  - `alias` 中定义了 src 文件目录的别名是 @，这样在文件中引入别的文件的时候，可以直接使用 @，而不是去找文件的相对路径。
  - 使用 `webpack.ProvidePlugin` 定义自动查找的标志符，如 `React: 'react'`,指的是当需要变量 React 的时候，会自动到当前目录或者 node_modules 中去找 react 模块。这样就不用在每个组件文件中都使用一次`import React from 'react'` 了。
  - 使用 cacheDirectory 缓存loader的执行结果。`loader: 'babel-loader?cacheDirectory=true'`,这样设置会使用默认缓存目录 node_modules/.cache/babel-loader。
  - splitChunks 将通用的模块打包为单独的一个文件，如果不配置splitChunks，那么代码会全部打包到app.hash.js中，导致app.hash.js文件很大，js越大，请求js文件和执行文件的时间越长，页面呈现给用户的耗时就越久。



## 使用 React
  >`npm i --save react react-dom` 
  - `react` 只包含了定义React组件的必要功能
  - `react-dom` 渲染器

  #### 使用@babel/preset-react转化JSX语法
  >`npm i --save-dev babel-loader @babel/core @babel/preset-react`
  - `babel-loader` - 使用babel解析文件
  - `@babel/core` - babel的核心模块
  - `babel-loader` - 使用babel解析文件

  >在根目录下创建.babelrc.js文件用于进行babel配置。

      module.exports = {
        presets: ['@babel/preset-react'],
      };

## 使用TypeScript
  #### 依赖安装
  >`npm i --save-dev typescript @babel/preset-typescript`
  > `npm i --save-dev @types/react @types/react-dom`
  - `@types/react` - react的类型定义
  - `@types/react-dom` - react-dom的类型定义
  - `@babel/preset-typescript` - babel的preset，用于处理TypeScript

  #### .babelrc.js  
  ```
  module.exports = {
    presets: [
      '@babel/preset-react',
      '@babel/preset-typescript',
    ],
  }
  ```
 >preset的执行顺序是从后到前的。根据以上代码的babel配置，会先执行@babel/preset-typescript，然后再执行@babel/preset-react。

 #### 在根目录创建tsconfig.json文件，用于TypeScript配置
  ```
  {
    "compilerOptions": {
      "baseUrl": "./",
      "jsx": "react",
      "paths": {
        "@/*": ["src/*"]
      },
      "esModuleInterop": true,
    },
    "include": [
      "src/*",
      "typings/*"
    ]
  }
  ```
  - baseUrl 设置基础路径。
  - jsx 用来设置jsx语法是以什么方式转换为JavaScript的。
  - esModuleInterop 为true允许使用import React from 'react'，否则对于没有默认导出的模块，比如react，必须使用import * as React from 'react'。
  - include 设置typescript处理的文件范围。

  >之前，通过webpack.ProvidePlugin定义了代表react包的标志符React，TypeScript中需要为React定义类型


  typings/redux.d.ts:
  ```
  import React from 'react';

  declare global {
    const React: typeof React;
  }
  ``` 
>Webpack中定义了路径的别名@，在tsconfig.json中也需要做相应的配置：
```
  "baseUrl": "./",
  "paths": {
    "@/*": ["src/*"]
  }
```

## 使用 React Router
> - `npm i --save react-router-dom`
> - `npm i --save-dev @types/react-router-dom` 

使用了 React的 Code Splitting，React.lazy 能使 import() 动态引入的内容作为常规组件来渲染。React.lazy 需要配合React的Suspense来使用。 用 import() 动态引入模块，引入的模块会单独打包为一个文件，只有在需要的时候才会去请求和执行该文件。


## 使用 Redux
> - `npm i --save redux react-redux`
> - `npm i --save-dev @types/react-redux`

 #### 设置全局变量ReduxConnect。
 > 全局变量ReduxConnect引用react-redux中的connect模块，这样就就不用在每个容器组件中都引用一遍connect了。webpack.common.js：
 ```
  new webpack.ProvidePlugin({
    React: 'react',
    ReduxConnect: ['react-redux', 'connect'],
  }),
 ```
 >typings/redux.d.ts:
 ```
  import { connect } from 'react-redux';
  declare global {
    const ReduxConnect: typeof connect;
  }
 ```

 ## 使用 Axios
 > `npm i axios`

 >config/webpack.common.js:
  ```
  new webpack.ProvidePlugin({
    ...
    Axios: 'axios',
  }),
  ```

> typings/axios.d.ts:
```
import axios from 'axios';

declare global {
  const Axios: typeof axios;
}
```





  
