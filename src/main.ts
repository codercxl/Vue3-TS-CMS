import { createApp } from 'vue'
// import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'normalize.css'
import './assets/css/index.less'
import App from './App.vue' // 默认不能识别为组件 需配置：env.d.ts 也有volar插件的影响
import router from './router'
import store from './store'
import registerIcons from '@/global/register-icons';

const app = createApp(App)




app.use(registerIcons)
app.use(store)
app.use(router)
app.mount('#app')

// 0.针对Elmessage和Elloading等组件引入单独的样式
// 方式一：全局引入样式(element所有样式将被引入)
// import 'element-plus/dist/index.css'
// 方式二：单独组件样式引入
// import 'element-plus/theme-chalk/el-message.css'
// 方式三：使用 vite-plugin-style-import 插件
// npm install vite-plugin-style-import consola -D
// 在 vite.config.ts 中配置

// 1.全局注册
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
// app.use(ElementPlus)

// 2.按需引入
// import { ElButton } from 'element-plus'
// app.component(ElButton.name, ElButton)

// 3.全局注册Icon图标
// for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
//   app.component(key, component) // 全局注册Icon图标
// }
