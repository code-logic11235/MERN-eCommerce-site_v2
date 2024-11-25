const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  // proxy to hit the backend server
  devServer: {

    historyApiFallback: true,
    proxy: [
      {
        context: ['/api'], //A request to /api/users will now proxy the request to http://localhost:4000/api/users.
        target: 'http://localhost:4000',
      },
    ],
    open: true
  },
};