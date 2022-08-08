// array-flat-polyfill and globalthis were added to support iOS 11 devices (iPad mini 4, iPad air 2, etc) specifically for the library v3 website launch
require('array-flat-polyfill');
const globalThisFn = require('globalthis');

if (typeof globalThis === 'undefined') {
    window.globalThis = globalThisFn();
}