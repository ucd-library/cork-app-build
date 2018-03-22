const path = require('path');

module.exports = (config) => {

  var modern = {
      entry : path.resolve(config.root, config.entry),
      output: {
          filename: config.modern || 'bundle.js',
          path: path.resolve(config.root, config.dist)
      },
      mode: 'production',
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
  };

  var ie =  {
      entry : path.resolve(config.root, config.entry),
      output: {
          filename: config.ie || 'ie-bundle.js',
          path: path.resolve(config.root, config.dist)
      },
      mode: 'production',
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
          },
          {
            test: /\.js$/,
            use: {
              loader: 'babel-loader',
              options: {
                // need to give babel exact location
                presets: ['babel-preset-env'].map(require.resolve)
              }
            }
          }
        ]
      }
  };

  return [modern, ie]
}