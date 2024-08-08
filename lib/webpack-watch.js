const generator = require('./webpack-root');

module.exports = (config) => {
  config.env = 'development';
  config.outputPath = config.preview;

  config.outputFile = config.modern;
  let webpackConfig = generator(config);

  return webpackConfig;
}