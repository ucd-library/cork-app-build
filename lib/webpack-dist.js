const generator = require('./webpack-root');

module.exports = (config) => {
  config.env = 'production';
  config.outputPath = config.dist;

  config.outputFile = config.modern;
  let webpackConfig = generator(config);

  return webpackConfig;
}