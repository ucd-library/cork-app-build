const generator = require('./webpack-root');

module.exports = (config, ie=false) => {
  config.env = 'development';
  config.outputPath = config.preview;

  config.outputFile = config.modern;
  let webpackConfig = generator(config);
  console.log(webpackConfig);

  if( ie ) {
    config.outputFile = config.ie;
    let webpackConfigIE = generator(config, true);
    console.log(webpackConfigIE);

    webpackConfig = [webpackConfig, webpackConfigIE];
  }

  return webpackConfig;
}