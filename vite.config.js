import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path, { join } from "path";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    createSvgIconsPlugin({
      //指定 需要缓存的 图标文件夹
      iconDirs: [path.resolve(__dirname, "src/assets/icons")], // process.cwd()
      symbolId: "icon-[name]",
    }),
  ],
  // 配置软链接reslove.alias
  resolve: {
    alias: {
      "@": join(__dirname, "/src"),
    },
  },
  // 配置代理服务器
  server: {
    proxy: {
      "/api": {
        target: "https://api.imooc-front.lgdsunday.club",
        changeOrigin: true,
      },
    },
  },
});
