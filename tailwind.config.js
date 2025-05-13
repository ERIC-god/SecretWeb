// 使用 tailwind 插件 （Tailwind CSS IntelliSense）
// 将 Tailwind CSS 安装为 PostCSS 插件是将其与 webpack、Rollup、Vite 和 Parcel 等构建工具集成的最无缝方式。
// 1. npm install -D tailwindcss postcss autoprefixer    2. npx tailwindcss init

/** @type {import('tailwindcss').Config} */
export default {
  // 手动切换暗黑模式
  darkMode: 'class',
  // tailwind应用, 配置模板文件的路径
  content: ['./index.html', './src/**/*.{vue,js}'],
  theme: {
    extend: {
      // 设置对应的大小和行高
      fontSize: {
        xs: ['0.25rem', '0.35rem'],
        xm: ['0.35rem', '0.45rem'],
        base: ['0.42rem', '0.52rem'],
        lg: ['0.52rem', '0.62rem'],
        xl: ['0.65rem', '0.75rem'],
      },
      boxShadow: {
        'l-white': '-10px 0 10px white',
        'l-zinc': '-10px 0 10px #18181b',
      },
      height: {
        header: '72px',
        main: 'calc(100vh - 72px)',
      },
      colors: {
        main: '#f44c58',
        'hover-main': '$f32836',
        'success-100': '#F2F9EC',
        'success-200': '#E4F2DB',
        'success-300': '#7EC050',
        'warn-100': '#FCF6ED',
        'warn-200': '#F8ECDA',
        'warn-300': '#DCA550',
        'error-100': '#ED7456',
        'error-200': '#f3471c',
        'error-300': '#ffffff',
      },
      variants: {
        scrollBar: ['dark'],
      },
    },
  },

  plugins: [
    require('tailwind-scrollbar'),
    require('./src/plugins/tailwind-vw-plugin/index'),
  ],
}
