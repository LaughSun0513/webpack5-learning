# webpack5-learning

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
    - file-loader url-loader
        - file-loader esModule是false可以让使用图片地址的时候不加default
        - url-loader多了一个limit，可以让图片在限制大小内的变成base64格式 其余和file-loader一样
- plugin
- devServer
    - 配置变化比较大

### 支持
- 支持css，less，sass
- 支持图片
    - 引入图片的方式有三种
        - 放在静态文件根目录里，通过html中的image直接引用，需要配置`devServer.contentBase`
        - 通过require/import 引入
        - 可以在css中通过background url引入，依赖css-loader