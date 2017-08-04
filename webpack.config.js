const path = require('path');

const ENV_PRODUCTION = process.env.NODE_ENV === 'production';
const PORT = process.env.PORT || 3000;

const CleanWebpackPlugin = require('clean-webpack-plugin');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HotModuleReplacementPlugin = require('webpack/lib/HotModuleReplacementPlugin');

const config = {
  entry: ['./client/index.js'],
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new CommonsChunkPlugin({
      name: 'vendor',
      minChunks: module => /node_modules/.test(module.resource),
    }),
    new CommonsChunkPlugin({ name: 'manifest' }),
    new HtmlWebpackPlugin({
      template: './client/template.html',
      chunksSortMode: 'dependency',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
};

if (!ENV_PRODUCTION) {
  config.devtool = 'cheap-module-source-map';

  config.plugins.push(new HotModuleReplacementPlugin());

  config.entry.unshift(
    'react-hot-loader/patch',
    `webpack-dev-server/client?http://localhost:${PORT}`,
    'webpack/hot/only-dev-server'
  );

  config.devServer = {
    contentBase: path.resolve(__dirname, 'dist'),
    historyApiFallback: true,
    hot: true,
    port: PORT,
    proxy: {
      '/api/**': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      }
    },
    overlay: {
      warnings: true,
      errors: true,
    },
    stats: {
      cached: false,
      cachedAssets: false,
      chunkModules: false,
      colors: true,
      hash: false,
      timings: true,
      version: false,
      modules: false,
    },
  };
}

if (ENV_PRODUCTION) {
  config.devtool = 'hidden-source-map';
}

module.exports = config;
