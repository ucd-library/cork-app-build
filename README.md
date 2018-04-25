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
  preview : 'public',
  // path your client (most likely installed via yarn) node_modules folder.
  // Due to the flat:true flag of yarn, it's normally best to separate 
  // client code/libraries from all other modules (ex: build tools such as this).
  clientModules : 'public/node_modules'
});

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
  dist : 'dist',
  // path your client (most likely installed via yarn) node_modules folder.
  // Due to the flat:true flag of yarn, it's normally best to separate 
  // client code/libraries from all other modules (ex: build tools such as this).
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