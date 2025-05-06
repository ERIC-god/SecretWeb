// Vite 会自动以 CommonJS 方式处理 vite.config.js
// 即使你使用 ES 模块语法，Vite 也会正确处理这个配置文件
// 配置文件会在 Node.js 环境中运行，而不是在浏览器环境
// Vite 会自动处理配置文件中的 CommonJS 和 ES 模块混用情况

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path, { join } from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

// https://vite.dev/config/
export default defineConfig({
  publicPath: process.env.NODE_ENV === 'production' ? '/SecretWeb' : '',
  plugins: [
    vue(),
    // 配置 vite-plugin-svg-icons 在 vite.config.js 中的配置插件
    createSvgIconsPlugin({
      //指定 需要缓存的 图标文件夹
      iconDirs: [path.resolve(__dirname, 'src/assets/icons')], // process.cwd()
      // 指定 symbolId 格式
      symbolId: 'icon-[name]',
    }),
  ],
  // 配置软链接reslove.alias
  resolve: {
    alias: {
      '@': join(__dirname, '/src'),
    },
  },
  // 配置代理服务器
  server: {
    proxy: {
      '/api': {
        target: 'https://api.imooc-front.lgdsunday.club',
        changeOrigin: true,
      },
    },
  },
})
