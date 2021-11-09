# cork-app-build
Webpack + Babel build for UCD Web Component apps

## Install

In your project install both webpack and this project

```bash
npm install --save-dev webpack webpack-cli @ucd-lib/cork-app-build
```

## Create build config scripts

Example watch script: webpack-watch.config.js

The watch script builds a version of the elements that are compatable with modern
browsers.  The watch script will watch all file resources and rebuild the bundle
whenever a change is made.

```js
let config = require('@ucd-lib/cork-app-build').watch({
  // root directory, all paths below will be relative to root
  root : __dirname,
  // path to your entry .js file
  entry : 'public/elements/entry-element.js',
  // folder where bundle.js will be written
  preview : 'public/js',
  // path your client (most likely installed via yarn) node_modules folder.
  // It's  best to separate client code/libraries from all other modules (ex: build tools such as this).
  clientModules : 'public/node_modules',
  // show babel debug in console log
  babelDebug : true
});

// optionaly you can run:
// require('@ucd-lib/cork-app-build').watch(config, true)
// Adding the second flag will generate a ie build as well as a modern
// build when in development.  Note this slows down the build process.

module.exports = config;
```

Example dist script: webpack-dist.config.js

The dist script creates minified code for both modern browsers as well as 
a special bundle for Internet Explorer (of course...).

```js
let config = require('@ucd-lib/cork-app-build').dist({
  // root directory, all paths below will be relative to root
  root : __dirname,
  // path to your entry .js file
  entry : 'public/elements/entry-element.js',
  // folder where bundle.js and ie-bundle.js will be written
  dist : 'dist/js',
  // path your client (most likely installed via yarn) node_modules folder.
  // It's  best to separate client code/libraries from all other modules (ex: build tools such as this).
  clientModules : 'public/node_modules'
});

// optionaly you can run:
// require('@ucd-lib/cork-app-build').dist(config, true)
// Adding the second flag will generate a ie build as well as a modern
// build when in development.  Note this slows down the build process.

module.exports = config;
```


## Babel Polyfill

The IE build automatically adds the [babel-polyfill dependency](https://babeljs.io/docs/usage/polyfill/).

## Production Babel Presets

Information on the presets used in Babel for production builds:
 - https://babeljs.io/docs/en/babel-preset-env
 - https://github.com/browserslist/browserslist

## Run watch/dist

Finally, add the following to your npm "scripts" section of your package.json file:

```js
{
  "scripts" : {
    "watch": "webpack --config webpack-watch.config.js --watch",
    "dist": "webpack --config webpack-dist.config.js"
  }
}
```

Now you can run the webpack watch script:

```bash
npm run watch
```

or build dist

```bash
npm run dist
```