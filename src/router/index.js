/*
 * @Author: your name
 * @Date: 2021-12-06 19:45:06
 * @LastEditTime: 2022-01-13 14:15:30
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \项目完整源码\rabbit\eribbit\src\router\index.js
 */
import { createRouter, createWebHashHistory } from 'vue-router'
import store from '@/store'

const Layout = () =>
    import ('@/views/Layout')
const Home = () =>
    import ('@/views/home')
const TopCategory = () =>
    import ('@/views/category')
const SubCategory = () =>
    import ('@/views/category/sub')
const Goods = () =>
    import ('@/views/goods')
const Login = () =>
    import ('@/views/login')
const Cart = () =>
    import ('@/views/cart')
const LoginCallback = () =>
    import ('@/views/login/callback')
const PayCheckout = () =>
    import ('@/views/member/pay/checkout')
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
            },
            {
                path: '/product/:id',
                component: Goods
            },
            {
                path: '/cart',
                component: Cart
            },
            {
                path: '/member/checkout',
                component: PayCheckout
            }
        ]
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/login/callback',
        component: LoginCallback
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
    //每次切换路由滚动到页面顶部
    scrollBehavior() {
        //vue2.0 x y 控制   3.0 left top
        return { left: 0, top: 0 }
    }
})
router.beforeEach((to, from, next) => {
    const { token } = store.state.user.profile
    if (to.path.startsWith('/member') && !token) {
        return next('/login?redirectUrl=' + encodeURIComponent(to.fullPath))
    }
    next()
})

export default router