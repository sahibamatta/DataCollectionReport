var path = require("path");

var DIST_DIR = path.resolve(__dirname, "dist");
var SRC_DIR = path.resolve(__dirname, "src");
const HOST = process.env.HOST || '0.0.0.0';
const PORT = process.env.PORT || '8770';

var config = {
  entry: SRC_DIR + "/app/index.js",
  output: {
    path: DIST_DIR + "/app",
    filename: "bundle.js",
    publicPath: "/app/"
  },

  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react']
        }
      },
      {
        test: /\.html?$/,
        exclude: /node_modules/,
        loader: 'html-loader'
      },
      {
        test: /\.css?$/,
        exclude: /node_modules/,
        loader: 'style-loader'
      },
      {
        test: /\.css?$/,
        exclude: /node_modules/,
        loader: 'css-loader'
      }
    ]
  },
  devServer: {
      contentBase: './src',
      // do not print bundle build stats
      noInfo: true,
      // enable HMR
      hot: true,
      // embed the webpack-dev-server runtime into the bundle
      inline: true,
      // serve index.html in place of 404 responses to allow HTML5 history
      historyApiFallback: true,
      port: PORT,
      host: HOST,
      disableHostCheck: true,
      proxy: [
          
          {
              context: ['/DataCollection/**'],
              target: ' http://52.66.151.69:8080',
              secure: false,
              changeOrigin: true,
          },
      ],
  },
};

module.exports = config;