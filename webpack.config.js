const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');

var commonConfig = {
  output: {
    path: path.resolve(__dirname + '/dist/')
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        include: __dirname,
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.css$/,
        loader: 'style!less!css'
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      sourceMap: false,
      mangle: true,
      compress: {
        warnings: false
      }
    })
  ]
};

module.exports = [
  merge(commonConfig, {
    entry: path.resolve(__dirname + '/src/plugin.js'),
    output: {
      filename: 'vue-datetime-picker-2.min.js',
      libraryTarget: 'window',
      library: 'vue-datetime-picker-2'
    }
  }),

  merge(commonConfig, {
    entry: path.resolve(__dirname + '/src/vue-datetime-picker-2.vue'),
    output: {
      filename: 'vue-datetime-picker-2.js',
      libraryTarget: 'umd',
      library: 'vue-datetime-picker-2',
      umdNamedDefine: true
    }
  })
];
