/*
 * @Author: your name
 * @Date: 2021-12-06 19:45:06
 * @LastEditTime: 2021-12-06 20:24:23
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \项目完整源码\rabbit\eribbit\src\main.js
 */
import { createApp } from 'vue'
import App from '@/App.vue'
import router from './router'
import store from './store'
createApp(App).use(store).use(router).mount('#app')
