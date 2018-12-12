const webpack = require('webpack')

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({ CONFIG: JSON.stringify(require("config")) })
  ],
  resolve: {
    extensions: [
      '.ts', '.tsx', '.js'
    ]
  },
  devServer: {
    contentBase: 'dist'
  }
}
