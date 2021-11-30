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

### 支持ES6/ES7/JSX
> babel-loader

> @babel/cli babel的命令行工具，可不装，可通过npx babel来运行代码

> @babel/core 过程管理功能 把源代码变成AST 进行遍历和生成 并不清楚转换什么语法和语法如何转换

> @babel/preset-env  清楚转换什么语法和语法如何转换 例如ES6 -> ES5

> @babel/plugin-transform-runtime 转译代码 运行在编译时
> @babel/runtime-corejs3 运行在运行时
js文件在babel转码后会生成很多helper函数(可能有大量重复)，polyfill会在全局变量上挂载目标浏览器缺失的功能，这个插件的作用是将 helper 和 polyfill 都改为从一个统一的地方引入，并且引入的对象和全局变量是完全隔离的
