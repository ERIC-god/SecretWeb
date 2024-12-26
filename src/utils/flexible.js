import { computed } from "vue";
import { PC_DEVICE_WIDTH } from "@/constants";
import { useWindowSize } from "@vueuse/core";

/**
 * 判断当前是否为移动设备，判断依据为屏幕宽度是否小于一个指定宽度(1280)
 */
export const isMobileTerminal = computed(() => {
  const { width } = useWindowSize();
  return width.value < PC_DEVICE_WIDTH;
});

/**
 * 实际开发中更建议以下代码
 *
 * const isMobileTerminal=computed(()=>{
    return /Android|webOs|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent)
    })
 *
 */

/**
 * 动态指定rem基准， 最大为40px
 */

export const useREM = () => {
  // 定义最大的 fontSize
  const MAX_FONT_SIZE = 40;

  // 设置 rem
  const setREM = () => {
    const html = document.querySelector("html");
    // 计算fontSize，根据 屏幕宽度 / 10
    let fontSize = window.innerWidth / 10;
    fontSize = fontSize > MAX_FONT_SIZE ? MAX_FONT_SIZE : fontSize;
    // 赋值给 html
    html.style.fontSize = fontSize + "px";
  };

  // 首次加载立即执行
  setREM();

  // 监听 resize 事件
  window.addEventListener("resize", setREM);

  // 监听 pageshow 事件
  window.addEventListener("pageshow", (e) => {
    if (e.persisted) {
      setREM();
    }
  });
};
