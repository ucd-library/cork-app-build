const generator = require('./webpack-root');

module.exports = (config) => {
  config.env = 'production';
  config.outputPath = config.preview;

  config.outputFile = config.modern;
  let webpackConfig = generator(config);

  config.outputFile = config.ie;
  let webpackConfigIE = generator(config, true);
  
  return [webpackConfig, webpackConfigIE];
}