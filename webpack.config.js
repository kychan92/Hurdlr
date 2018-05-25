let webpack = require('webpack');
let path    = require('path');
let fs      = require('fs');

let nodeModules = {};

fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

module.exports = {
    entry  : './main.js',
    target : 'node',
    output : {
        path     : __dirname,
        filename : 'bundle.js'
    },
    externals : nodeModules
}