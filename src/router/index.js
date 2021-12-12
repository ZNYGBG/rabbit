/*
 * @Author: your name
 * @Date: 2021-12-06 19:45:06
 * @LastEditTime: 2021-12-07 22:02:38
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \项目完整源码\rabbit\eribbit\src\router\index.js
 */
import { createRouter, createWebHashHistory } from 'vue-router'

const Layout = () =>
    import ('@/views/Layout')
const Home = () =>
    import ('@/views/home')
const TopCategory = () =>
    import ('@/views/category')
const SubCategory = () =>
    import ('@/views/category/sub')
const routes = [
    // 一级路由
    {
        path: '/',
        component: Layout,
        children: [{
                path: '/',
                component: Home
            },
            {
                path: '/category/:id',
                component: TopCategory
            },
            {
                path: '/category/sub/:id',
                component: SubCategory
            }
        ]
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router