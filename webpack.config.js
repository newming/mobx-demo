const path = require('path')

const config = {
  mode: 'development',
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
          // Plugin 会运行在 Preset 之前
          // Plugin 会从第一个开始顺序执行。ordering is first to last
          // Preset 的顺序则刚好相反(从最后一个逆序执行)
        options: {
          presets: ['env', 'react'],
          plugins: ['transform-decorators-legacy', 'transform-class-properties'] // 这里需要注意顺序
        }
      }
    }]
  },
  devtool: 'inline-source-map'
}

module.exports = config