// "use strict";

// const webpack = require("webpack");
// const path = require("path");

function buildConfig(env) {
  return require("./webpack." + Object.keys(env)[0] + ".js")(env);
}
module.exports = buildConfig;
