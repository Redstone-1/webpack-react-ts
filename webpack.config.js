const path = require('path'); // node 路径工具
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // 每次打包会产生冗余垃圾，这个插件会清除之前打包剩余垃圾
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 生成 html 文件

module.exports = (env, args) => {
  console.log('env', env);
  console.log('args', args);
  return {
    mode: 'development', // webpack 运行模式 development & production
    devtool: 'inline-source-map', // 代码 sourceMap 类型
    entry: './src/index.tsx', // 打包入口
    output: { // 输出文件及文件名等
      path: path.resolve(__dirname, './dist'),
      filename: 'dist.js',
    },
    module: { // 一些针对模块的打包规则，主要是不同文件使用不同 loader 处理
      rules: [
        {
          test: /\.(ts|tsx)$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['babel-preset-env', 'babel-preset-react'],
            },
          },
        },
        {
          test: /\.css$/, // 使用正则表达式匹配所有需要使用此loader的文件
          use: [
            'style-loader',
            'css-loader',
          ],
        },
        {
          test: /\.scss$/, // 使用正则匹配所有需要使用此loader的文件
          use: [
            'style-loader',
            'css-loader',
            'sass-loader',
          ], // 处理顺序依次是：sass-loader -> css-loader -> style-loader
        },
        {
          test: /\.less$/,
          use: [
            'style-loader',
            'css-loader',
            'less-loader',
          ],
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: [{
            loader: 'url-loader',
            options: {
              limit: 1024 * 30, // 30KB以下的文件采用url-loader
              fallback: 'file-loader', // 否则采用file-loader，默认值是file-loader
              outputPath: 'images', // 图片输出路径,相当于output.path
            },
          }],
        },
        {
          test: /\.(eot|ttf|woff|svg)$/,
          use: [{
            loader: 'url-loader',
            options: {
              limit: 1024 * 30,
              fallback: 'file-loader',
              outputPath: 'fonts',
            },
          }],
        },
      ],
    },
    resolve: { // 很重要，解析文件路径，不配置的话引入组件时找不到对应文件
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    plugins: [ // 插件
      new HtmlWebpackPlugin({
        template: './public/index.html', // 指定模板路径
        filename: 'index.html', // 指定文件名
      }),
      new CleanWebpackPlugin(),
    ],
    devServer: { // 创建本地开发服务
      hot: true, // 支持热更新
      port: 8080,
      static: path.resolve(__dirname, './public'),
    },
  }
};
