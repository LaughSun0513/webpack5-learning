# webpack5-learning
- 基本安装
- 支持基本html模板的打包和引入(html-webpack-plugin)
- 支持css/less/sass(style-loader/css-loader/less/less-loader/node-sass/sass-loader)
- 支持图片引入(file-loader/url-loader/html-loader)
- 支持ES6/ES7/JSX(babel-loader)
## 安装
```bash
pnpm install 
webpack 
webpack-cli
webpack-dev-server 
html-webpack-plugin
```

## 基本配置
- entry
- output
- loader
    - style-loader css-loader
    - file-loader url-loader html-loader
        - file-loader esModule是false可以让使用图片地址的时候不加default
        - url-loader多了一个limit，可以让图片在限制大小内的变成base64格式 其余和file-loader一样
        - html里面有`img`标签引入的src图片，使用html-loader
- plugin
- devServer
    - 配置变化比较大

```js
// 将devServer的内存打包代码输出到当前项目dist目录下面查看
// npm i webpack-dev-middleware -D
{
    devServer: {
        static: resolve(__dirname, 'dist'),
        devMiddleware: {
            writeToDisk: true
        }
    }
}
```
### 支持css，less，sass
### 支持图片
- 引入图片的方式有三种
    - 放在静态文件根目录里，通过html中的image直接引用，需要配置`devServer.contentBase`
    - 通过require/import 引入
    - 可以在css中通过background url引入，依赖css-loader
    - html里面有`img`标签引入的src图片，使用html-loader, 貌似js生成的img标签也会识别

> 问题: webpack5里面的 url-loader 和 css-loader在处理background url引入图片上会存在冲突，这里采用替换url-loader的方式，
> 利用webpack5自带的方式处理图片 type: 'asset'的方式，不过貌似html-loader不会造成冲突
```js
{
    test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
    type: 'asset',
    parser: {
        dataUrlCondition: {
            maxSize: 1000 * 1024,
        },
    },
    generator: {
        filename: 'images/[base]',
    }
}
```

#### type:asset
[type:asset的文档](https://webpack.js.org/guides/asset-modules/)
> asset/resource 替换file-loader 把图片拷贝到输出目录里去，返回一个输出后的路径，包括文件

> asset/inline 替换url-loader的limit功能 不拷贝文件，直接把url变成base64字符串, parser.dataUrlCondition.maxSize代替

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.txt/,
        type: 'asset',
        parser: {
         dataUrlCondition: {
           maxSize: 4 * 1024 // 4kb
         }
       }
      }
    ]
  }
};
```

> asset/source 默认，处理文本 类似raw-loader 引入方式没有xx.default

```js
// raw-loader
const txt = require('./1.txt');
document.querySelector('#app').innerHTML = txt.default;

// asset/source
const txt = require('./1.txt');
document.querySelector('#app').innerHTML = txt;
```

### 支持ES6/ES7/JSX/装饰器模式等
```js
{
    "@babel/cli": "^7.16.0",  // babel的命令行工具，可不装，可通过npx babel来运行代码
    "@babel/core": "^7.16.0", // 过程管理功能 把源代码变成AST 进行遍历和生成 并不清楚转换什么语法和语法如何转换
    "@babel/plugin-proposal-class-properties": "^7.16.0",
    "@babel/plugin-proposal-decorators": "^7.16.4",
    "@babel/plugin-transform-runtime": "^7.16.4",
    "@babel/runtime-corejs3": "^7.16.3",
    "@babel/preset-env": "^7.16.4",
    "babel-loader": "^8.2.3",
}
```
- @babel/core 
- @babel/preset-env  清楚转换什么语法和语法如何转换 例如ES6 -> ES5

```js
{
    "presets": [
        ["@babel/preset-env", {
            useBuiltIns: 'usage', // 按需加载corejs的包，比如用到了Promise，就只加载Promise的corejs包不会去加载Map的
            corejs: '3.0',
            targets: {
                chrome: ">=58",
                firefox: ">=58",
                ie: ">=11"
            }
        }]
    ],
}
// useBuiltIns: usage 
// useBuiltIns: entry 
// useBuiltIns: false
```
- [@babel/plugin-transform-runtime](https://babeljs.io/docs/en/babel-plugin-transform-runtime) 转译代码 运行在编译时
- @babel/runtime-corejs3 运行在运行时
> js文件在babel转码后会生成很多helper函数(可能有大量重复)，polyfill会在全局变量上挂载目标浏览器缺失的功能，这个插件的作用是将 helper 和 polyfill 都改为从一个统一的地方引入，并且引入的对象和全局变量是完全隔离的

> 为什么会出现上面这俩包呢？

个人的想法是，要兼容IE等低版本的浏览器，很多语法不支持，比如Promise/Set/Map/Array.includes
就需要babel-polyfill自己去实现，但是这个包很大，里面其实是core-js，现在已经更新到3版本了
我们不想在项目代码里面引入一些没用的polyfill增加体积，
`require('babel-polyfill')` 这样太简单粗暴了, 
实现原理其实是在全局对象或者内置对象的prototype上添加方法来实现，缺点是造成全局污染

- [@babel/runtime](https://babeljs.io/docs/en/babel-runtime) 这是个工具函数的库，可以让babel的一些helpers的函数直接通过require引入，不需要每次都重复写



> 问题: 在配置babel的过程中发现，如果不配置`exclude: /node_modules/`会导致报错, 
怀疑原因是babel去编译node_modules里的包导致的
```
Html Webpack Plugin:
  Error: Child compilation failed:
  Module not found: Error: Can't resolve 'core-js/modules/es.regexp.exec.js'
```
```js
// webpack.config.js
{
    test: /\.(ts|js)x?$/,
    use: ['babel-loader'],
    exclude: /node_modules/
}

// babel.config.js
module.exports = {
    "presets": [
        ["@babel/preset-env", {
            useBuiltIns: 'usage',
            corejs: '3.0'
        }]
    ],
    "plugins": [
        ['@babel/plugin-transform-runtime', { corejs: 3}],
        // 如果没有的功能，直接自己加babel插件即可
        // 把类和对象装饰器编译成ES5
        ["@babel/plugin-proposal-decorators", { legacy: true}],
        // 转换静态类属性以及使用属性初始值化语法声明的属性
        "@babel/plugin-proposal-class-properties"
    ]
}
```
