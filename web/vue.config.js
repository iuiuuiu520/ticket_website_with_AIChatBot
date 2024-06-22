const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

  devServer: {
    proxy: {
      "/adminapi": {
        target: "http://localhost:3000/",
        changeOrigin: true,
        pathRewrite: { "^/adminapi": "/adminapi" }
      },
      "/webapi": {
        target: "http://localhost:3000/",
        changeOrigin: true,
        pathRewrite: { "^/webapi": "/webapi" }
      },
      "/chatapi": {
        target: "http://localhost:5000/",
        changeOrigin: true,
        pathRewrite: { "^/chatapi": "/chatapi" }
      }
    },
    client: {
      overlay: false,
    }
  },
})

