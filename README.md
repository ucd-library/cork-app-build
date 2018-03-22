# cork-app-build
Webpack + Babel build for UCD Polymer 3+ apps

## Install

In your project install both webpack and this project

```bash
npm install --save-dev webpack webpack-cli
npm install --save-dev @ucd-lib/cork-app-build
```

## Create build config scripts

Example watch script: webpack-watch.config.js

```js
let config = require('@ucd-lib/cork-app-build').watch({
  root : __dirname,
  entry : 'public/elements/entry-element.js',
  preview : 'public',
  clientModules : 'public/node_modules'
});

module.exports = config;
```

Example dist script: webpack-dist.config.js

```js
let config = require('@ucd-lib/cork-app-build').dist({
  root : __dirname,
  entry : 'public/elements/entry-element.js',
  dist : 'dist',
  clientModules : 'public/node_modules'
});

module.exports = config;
```

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