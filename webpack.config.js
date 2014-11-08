module.exports = {
  entry: './src/App.js',
  output: {
    path: './dist/',
    filename: 'App.js'
  },
  module: {
    loaders: [
      {loader: 'jsx-loader'}
    ]
  }
};
