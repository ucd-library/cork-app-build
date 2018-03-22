const path = require('path');

module.exports = (config) => {
  return {
    entry: path.resolve(config.root, config.entry),
    devtool: 'inline-source-map',
    mode: 'development',
    output: {
      filename: config.modern || 'bundle.js',
      path: path.resolve(config.root, config.preview)
    },
    target : 'web',
    resolve : {
      modules: [path.resolve(config.root, config.clientModules)]
    },
    resolveLoader : {
      modules: [path.resolve(__dirname, 'node_modules')]
    },
    module : {
      rules: [
          {
            test: /\.(html)$/,
            use: {
              loader: 'html-loader',
              options: {
                attrs: false
              }
            }
          },
          {
            test: /\.css$/,
            use: [ 'to-string-loader', 'css-loader' ]
          },
          {
            test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
            loader: 'url-loader',
            options: {
              limit: 10000
            }
          }
      ]
    }
  }
}