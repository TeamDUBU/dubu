const { defineConfig } = require("@vue/cli-service");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:true,
  configureWebpack: {
    plugins: [new NodePolyfillPlugin()],
    optimization: {
      splitChunks: {
        chunks: "all",
      }
    },
    resolve: {
      fallback: {
        fs: false,
        net: false,
        'stream': require.resolve('stream-browserify'),
        'crypto': require.resolve('crypto-browserify'),
        'http': require.resolve('stream-http'),
        'https': require.resolve('https-browserify'),
      }
    },
  }, 
});
