"use strict";

const webpack = require("webpack");
const path = require("path");

module.exports = (evn) => {

      return {
        entry: ["@babel/polyfill", "./src/main.js"],
        mode: 'production',
        devtool: 'source-map',

        output: {
          path: path.resolve(__dirname, "build"),
          publicPath: "/build/",
          filename: "project.bundle.js"
        },

        module: {
          rules: [
            {
              test: /\.js$/,
              use: "babel-loader",
              include: path.join(__dirname, 'src')
            },
            {
              test: [/\.vert$/, /\.frag$/],
              use: "raw-loader"
            }
          ]
        },

        plugins: [
          new webpack.DefinePlugin({
            CANVAS_RENDERER: JSON.stringify(true),
            WEBGL_RENDERER: JSON.stringify(true),
            PRODUCTION: JSON.stringify(true)
          })
        ]
      }
};