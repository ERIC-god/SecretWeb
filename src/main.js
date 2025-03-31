import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from '@/router/index.js'
import { useREM } from './utils/flexible'
import useTheme from './utils/theme'
import mLibs from '@/libs/index.js'
import { initWebVitals } from './utils/performance'
import './style/index.scss'

// 注册svg-icons
import 'virtual:svg-icons-register'

const pinia = createPinia()
const app = createApp(App)
app.use(pinia)

pinia.use(piniaPluginPersistedstate)
app.use(router)
app.use(mLibs)
useREM()
useTheme()

// console.log(import.meta.env.MODE) // 'development' 或 'production'
// console.log(import.meta.env.DEV) // 是否是开发模式
// console.log(import.meta.env.PROD) // 是否是生产模式

document.title = import.meta.env.VITE_APP_TITLE

initWebVitals((metric) => {
  console.log(metric.name, metric.value)
})

app.mount('#app')
