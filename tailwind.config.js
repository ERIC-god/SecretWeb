/** @type {import('tailwindcss').Config} */
export default {
  // 手动切换暗黑模式
  darkMode: "class",
  // tailwind应用
  content: ["./index.html", "./src/**/*.{vue,js}"],
  theme: {
    extend: {
      // 设置对应的大小和行高
      fontSize: {
        xs: ["0.25rem", "0.35rem"],
        xm: ["0.35rem", "0.45rem"],
        base: ["0.42rem", "0.52rem"],
        lg: ["0.52rem", "0.62rem"],
        xl: ["0.65rem", "0.75rem"],
      },
      boxShadow: {
        "l-white": "-10px 0 10px white",
        "l-zinc": "-10px 0 10px #18181b",
      },
      height: {
        header: "72px",
        main: "calc(100vh - 72px)",
      },
      colors: {
        main: "#f44c58",
        "hover-main": "$f32836",
      },
    },
  },
  plugins: [],
};
