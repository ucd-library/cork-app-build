const path = require('path');

module.exports = (config, ie=false) => {

  if ( !Array.isArray(config.clientModules) ) config.clientModules = [config.clientModules];
  
  let webpackConfig = {
    // root entry module to load
    entry : [
      path.join(__dirname, 'polyfills.js'),
      path.resolve(config.root, config.entry)
    ],
    // output bundle filename and path
    output: {
        filename: config.outputFile || 'bundle.js',
        path: path.resolve(config.root, config.outputPath)
    },
    // let webpack know mode as well, so it can do magic things
    mode: config.env || 'production',
    // we are bundling for web (instead of NodeJS or something else)
    target : 'web',
    // build source maps for debugging
    devtool: config.devtool || 'source-map',
    // were are is the node_modules directory for the client
    resolve : {
      modules: [
        ... config.clientModules.map(item => path.resolve(config.root, item)),
        path.resolve(__dirname, '..', '..', '..'),
        path.resolve(__dirname, '..', 'node_modules')
      ]
    },
    // where are the build dependencies. ie were is webpack modules/plugins
    // located.  This will look in this projects root folder as well as the root
    // folder of the project that is using this directory
    resolveLoader : {
      modules: [
        path.resolve(__dirname, '..', 'node_modules'),
        path.resolve(__dirname, '..', '..', '..')
      ]
    },
    // now we add or special loaders
    module : {
      rules: [
        // for polymer 3.0 we are writing HTML in a separate file, this will
        // load html as a string when user class import template from "./file.html"
        {
          test: /\.(html)$/,
          use: {
            loader: 'html-loader',
            options: {
                attrs: false
            }
          }
        },
        // this will load css as string like above.  Mostly used for injecting 3rd party
        // library css into elements shadow dom.  Example, leaflet css can be loaded this way
        {
          test: /\.css$/,
          use: [ 'to-string-loader', 'css-loader' ]
        },
        // this will inline images as base64 strings if they are small enough
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

  return webpackConfig;
}