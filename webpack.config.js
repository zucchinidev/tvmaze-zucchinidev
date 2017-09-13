const path = require('path')
const webpack = require('webpack')
const nodeEnv = process.env.NODE_ENV || 'development'
const isDevelopment = nodeEnv === 'development'

let uglifyJsPlugin = new webpack.optimize.UglifyJsPlugin({
  compress: {
    warnings: false,
    screw_ie8: true,
    conditionals: true,
    unused: true,
    comparisons: true,
    sequences: true,
    dead_code: true,
    evaluate: true,
    if_return: true,
    join_vars: true
  },
  output: {
    comments: false
  }
})

const plugins = [
  new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false
  }), uglifyJsPlugin]

const entry = {
  index: [path.resolve(__dirname, 'lib/index.js')]
}

const output = {
  filename: '[name].js',
  path: path.resolve(__dirname, 'dist'),
  library: 'library',
  libraryTarget: 'umd',
  umdNamedDefine: true
}

module.exports = {
  plugins,
  entry,
  output,
  devtool: 'source-map',
  target: 'node',
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
}