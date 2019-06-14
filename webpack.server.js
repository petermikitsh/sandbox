const path = require('path');
const StartServerWebpackPlugin = require('start-server-webpack-plugin');
const webpack = require('webpack');
const webpackNodeExternals = require('webpack-node-externals');

const HOT_ENTRY = 'webpack/hot/poll?1000';

module.exports = function(env) {
  const devMode = Boolean(env && env.dev);
  return {
    devtool: devMode ? 'eval-source-map' : 'source-map',
    entry: {
      server: [
        devMode && HOT_ENTRY,
        path.resolve(__dirname, 'src/server/index.ts'),
      ].filter(Boolean)
    },
    externals: [
      webpackNodeExternals({
        whitelist: [HOT_ENTRY]
      })
    ],
    mode: 'development',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'babel-loader',
          include: path.resolve(__dirname, 'src/server')
        }
      ]
    },
    node: {
      __dirname: false
    },
    plugins: [
      devMode && new StartServerWebpackPlugin(),
      new webpack.BannerPlugin({
        banner: 'require("source-map-support").install();',
        raw: true,
      }),
    ].filter(Boolean),
    resolve: {
      extensions: ['.ts', '.tsx', '.js']
    },
    stats: {
      modules: false
    },
    target: 'node',
    watch: devMode,
  };
}
