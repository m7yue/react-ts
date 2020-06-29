module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: '> 2% in CN and not ie <= 8 and not dead', // 配置的targets的意思是，选择目标环境为：中国区统计数据为2%以上的浏览器，不包括版本号小于8的IE浏览，不包括官方已经不维护的浏览器。
      },
    ],
    '@babel/preset-react',
    '@babel/preset-typescript',
  ],
  "plugins": [
    "@babel/plugin-transform-runtime"
  ]
};

//preset的执行顺序是从后到前的。根据以上代码的babel配置，会先执行@babel/preset-typescript，然后再执行@babel/preset-react。