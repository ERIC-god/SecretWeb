import { computed } from 'vue'
import { PC_DEVICE_WIDTH } from '@/constants'
import { useWindowSize } from '@vueuse/core'

/**
 * 判断当前是否为移动设备，判断依据为屏幕宽度是否小于一个指定宽度(1280)
 */
// export const isMobileTerminal = computed(() => {
//   const { width } = useWindowSize()
//   return width.value < PC_DEVICE_WIDTH
// })

/**
 * 实际开发中更建议以下代码
 */

export const isMobileTerminal = computed(() => {
  console.log(navigator.userAgent)

  // 1. 通过用户代理检测
  const userAgentCheck =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Windows Phone|Kindle|Silk/i.test(
      navigator.userAgent
    )

  // 2. 通过屏幕宽度检测（小于768px通常认为是移动设备）
  const screenCheck = window.innerWidth < 768

  // 3. 触摸设备检测
  const touchCheck = 'ontouchstart' in window || navigator.maxTouchPoints > 0
  console.log('ontouchstart' in window)

  // 主要依靠用户代理和屏幕宽度，其他作为辅助判断
  // 可以根据具体需求调整逻辑组合
  return userAgentCheck || (screenCheck && touchCheck)
})

/**
 * 动态指定rem基准， 最大为40px
 */

export const useREM = () => {
  // 定义最大的 fontSize
  const MAX_FONT_SIZE = 40

  // 设置 rem
  const setREM = () => {
    const html = document.querySelector('html')
    // 计算fontSize，根据 屏幕宽度 / 10
    let fontSize = window.innerWidth / 10
    fontSize = fontSize > MAX_FONT_SIZE ? MAX_FONT_SIZE : fontSize
    // 赋值给 html
    html.style.fontSize = fontSize + 'px'
  }

  // 首次加载立即执行
  setREM()

  // 监听 resize 事件
  window.addEventListener('resize', setREM)

  // 监听 pageshow 事件
  window.addEventListener('pageshow', (e) => {
    if (e.persisted) {
      setREM()
    }
  })
}
