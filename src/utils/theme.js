import { useThemeStore } from "../store";
import { watch } from "vue";
/**
 *  监听系统主题变更
 */
let matchMedia;
const watchSystemThemeChange = () => {
  // 仅需一次 初始化
  if (matchMedia) {
    return;
  } else {
    matchMedia = window.matchMedia("(prefers-color-scheme:dark)");
  }
  // 监听主题变化
  matchMedia.onchange = () => {
    changeTheme("theme-system");
  };
};

/**
 *  变更主题
 *  @param theme 主题的标记
 */

const changeTheme = (theme) => {
  let themeClassName = "";
  switch (theme) {
    case "theme-light":
      themeClassName = "light";
      break;
    case "theme-dark":
      themeClassName = "dark";
      break;
    case "theme-system":
      watchSystemThemeChange();
      themeClassName = matchMedia.matches ? "dark" : "light";
      break;
  }
  document.querySelector("html").className = themeClassName;
};

/**
 *  初始化主题
 */
export default () => {
  /**
   *   在此初始化 useThemeStore ，避免 在外面初始化 引起报错, store 的初始化必须在 pinia 安装之后
   */
  const themestore = useThemeStore();

  /**
   *   当主题改变时候 ，或进入系统时 ，可以进行 html 的class配置
   */
  watch(
    () => themestore.themeType,
    (newVal) => {
      changeTheme(newVal);
    },
    { immediate: true }
  );
};
