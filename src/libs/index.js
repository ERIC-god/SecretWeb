/**
 *  vite 通用组件的 全局自动化注册
 */

import { defineAsyncComponent } from 'vue'
export { confirm } from './confirm/index'

export default {
  install(app) {
    // app.component("m-svg-icon", svgIcon);
    // app.component("m-popup", popUp);

    // 1. 获取 当前路径下 所有文件夹下的 index.vue
    const components = import.meta.glob('./*/index.vue')
    console.log(components)
    // 2. 遍历 获取到的 组件模块
    for (let [fullPath, fn] of Object.entries(components)) {
      // console.log(fn)
      // 获取路径'./button/index.vue' 中的 'button'
      const componentName = 'm-' + fullPath.replace('./', '').split('/')[0]

      // 3. 利用 app的 component方法 注册组件
      app.component(componentName, defineAsyncComponent(fn))
    }
  },
}
