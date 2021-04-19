const webpack = require("webpack");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const SWPrecacheWebpackPlugin = require("sw-precache-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");


const config = {
  entry: {
    app: './public/js/index.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: __dirname + '/public/dist'
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [{
          loader: 'file-loader',
          options: {
            name (file) {
              return '[path][name].[ext]'
            },
            publicPath: function(url) {
                return url.replace('../', '/assets/')
            },
          }  
        }, 
        {
          loader: 'image-webpack-loader',
        },
      ],
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery"
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: "static"
    }),
    new WebpackPwaManifest({
      name: "Budget Tracker",
      short_name: "Foodies",
      description: "An app that allows you to track your budget.",
      start_url: "../index.html",
      background_color: "#dddddd",
      theme_color: "#6666ff",
      fingerprints: false,
      inject: false,
      icons: [{
        src: path.resolve("public/icons/icon-512x512.png"),
        sizes: [72, 96, 128, 144, 152, 192, 3854, 512],
        destination: path.join("assets", "icons")
      }]
    })
],
  mode: "development"
};

module.exports = config;
