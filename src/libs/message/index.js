import { h, render } from 'vue'
import messageComponent from './index.vue'

export const message = (type, content, duration = 3000) => {
  /**
   *  动画结束时的回调
   */
  const onDestroy = () => {
    // 3. 销毁message
    render(null, document.body)
  }

  // 1.返回vnode
  const vnode = h(messageComponent, {
    type,
    content,
    duration,
    destroy: onDestroy,
  })

  // 2.render函数渲染
  render(vnode, document.body)
}
