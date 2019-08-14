const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OpenBrowserWebpackPlugin = require('open-browser-webpack-plugin');
const StatsWebpackPlugin = require('stats-webpack-plugin');

module.exports = function (env) {
  const devMode = env && env.dev;
  return {
    devServer: {
      contentBase: path.resolve('static'),
      historyApiFallback: {
        index: '/public'
      },
      host: '0.0.0.0'
    },
    devtool: devMode ? 'eval' : 'source-map',
    entry: {
      client: [
        path.resolve(__dirname, 'src/client')
      ],
    },
    mode: devMode ? 'development' : 'production',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'babel-loader',
          include: path.resolve(__dirname, 'src')
        }
      ]
    },
    optimization: {
      // Uncomment for more detailed bundle stats
      // concatenateModules: false,
      runtimeChunk: 'single',
      splitChunks: {
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            enforce: true,
            chunks: 'all'
          }
        }
      }
    },
    output: {
      filename: devMode ? '[name].js' : '[name].[chunkhash:6].js',
      path: path.resolve(__dirname, 'dist/public'),
      publicPath: '/public'
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: 'src/client/index.html'
      }),
      new OpenBrowserWebpackPlugin(),
      !devMode && new StatsWebpackPlugin('../stats.json'),
    ].filter(Boolean),
    resolve: {
      extensions: ['.ts', '.tsx', '.js']
    },
    stats: {
      modules: false
    }
  };
}
