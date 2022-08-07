const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'dist.js',
  },
  module: {
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
  plugins: [ // 插件
    new HtmlWebpackPlugin({
      template: './public/index.html', // 指定模板路径
      filename: 'index.html', // 指定文件名
    }),
    new CleanWebpackPlugin(),
  ],
  devServer: {
    hot: true, // 支持热更新
    port: 8080,
    static: path.resolve(__dirname, './public'), // contentBase:path.resolve(__dirname,'static') // 指定（额外的）静态文件目录， // 如果使用 CopyWebpackPlugin ，设置为false
  },
};
