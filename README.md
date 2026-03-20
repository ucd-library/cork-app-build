# cork-app-build
Webpack build for UCD Library SPA applications/websites

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
import corkAppBuild from '@ucd-lib/cork-app-build';

let config = corkAppBuild.watch({
  // root directory, all paths below will be relative to root
  root : __dirname,
  // path to your entry .js file
  entry : 'public/elements/entry-element.js',
  // folder where bundle.js will be written
  preview : 'public',
  // path your client (most likely installed via yarn) node_modules folder.
  // Due to the flat:true flag of yarn, it's normally best to separate 
  // client code/libraries from all other modules (ex: build tools such as this).
  // will take an array of relative paths as well
  clientModules : 'public/node_modules'
});

// optionaly you can run:
// require('@ucd-lib/cork-app-build').watch(config, true)
// Adding the second flag will generate a ie build as well as a modern
// build when in development.  Note this slows down the build process.
```

Example dist script: webpack-dist.config.js

The dist script creates minified code for both modern browsers as well as 
a special bundle for Internet Explorer (of course...).

```js
import corkAppBuild from '@ucd-lib/cork-app-build';

let config = corkAppBuild.dist({
  // root directory, all paths below will be relative to root
  root : __dirname,
  // path to your entry .js file
  entry : 'public/elements/entry-element.js',
  // folder where bundle.js and ie-bundle.js will be written
  dist : 'dist',
  // path your client (most likely installed via yarn) node_modules folder.
  // Due to the flat:true flag of yarn, it's normally best to separate 
  // client code/libraries from all other modules (ex: build tools such as this).
  // will take an array of relative paths as well
  clientModules : 'public/node_modules'
});
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

## Webpack Utilities
You can add any webpack plugins by manipulating the config object.

```js

import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

let config = corkAppBuild.dist({...});
if( !Array.isArray(config) ) config = [config];
config.forEach(conf => {

  // handle css files
  let cssModule = conf.module.rules.find(rule => {
  if( !Array.isArray(rule.use) ) return false;
    return rule.use.includes('css-loader');
  });

  let mindex = cssModule.use.indexOf('css-loader');
  cssModule.use[mindex] = {
    loader: 'css-loader',
    options: {
      url : false
    }
  }

  // build sass into a css file
  if( !Array.isArray(conf.entry) ) conf.entry = [conf.entry];
  conf.entry.push(path.join(__dirname, './scss/style.scss'););
  conf.module.rules.push({
    test: /\.s[ac]ss$/i,
    use: [
      { loader: MiniCssExtractPlugin.loader},
      { loader: 'css-loader', options : {url: false} },
      {
        loader: 'sass-loader',
        options: {
          sassOptions: {
            // if using @ucd-lib/theme-sass make sure to include path to these sass stylesheets
            includePaths: [
              path.join(__dirname, "../../../node_modules/@ucd-lib/theme-sass"),
              path.join(__dirname, "../../../node_modules/breakpoint-sass/stylesheets"),
              path.join(__dirname, "../../../node_modules/sass-toolkit/stylesheets")]
          }
        }
      }
    ]
  });

  conf.plugins = [
    new MiniCssExtractPlugin({
      filename: `../../css/stle.css`
    })
  ];

})

```