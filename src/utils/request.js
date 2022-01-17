/*
 * @Author: your name
 * @Date: 2021-12-06 23:32:03
 * @LastEditTime: 2022-01-08 14:57:12
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \项目完整源码\rabbit\eribbit\src\utils\request.js
 */
// 1创建axios实例
// 2请求拦截器，有yoken进行头部携带
// 3相应拦截器，1.剥离无效数据，2处理token失效
// 4导出一个函数，调用当前的axios，返回值为promise
import axios from 'axios'
import store from '@/store'
import router from '@/router'

// 导出基准地址，原因：其他不是axios请求地方需要基准地址
export const baseURL = 'http://pcapi-xiaotuxian-front-devtest.itheima.net/'
const instance = axios.create({
    /* axios的一些配置 */
    baseURL,
    timeout: 5000
})

instance.interceptors.request.use(config => {
        // 拦截的业务逻辑  进行请求配置的修改 如果本地有token就在头部携带
        const { profile } = store.state.user
            // 判断是否有token
        if (profile.token) {
            // 设置token
            config.headers.Authorization = `Bearer ${profile.token}`
        }
        return config
    }, err => {
        return Promise.reject(err)
    }) // 取出响应数据.
instance.interceptors.response.use(res => res.data, err => {
    // 有相应并且为401
    if (err.response && err.response.status === 401) {
        // 清空本地无效用户信息，跳转到登录页吗，跳转需要传参给登录页吗\参数是当前路由地址
        store.commit('user/setUser', {})
        const fullPath = encodeURIComponent(router.currentRoute.value.fullPath)
        router.push('/login?redirectUrl=' + fullPath)
            // 组件里是$route.fullPath js里是router.currentRoute.value.fullPath router.currentRoute是ref响应式，所以要加。value
    }
    return Promise.reject(err)
})
export default (url, method, submitData) => { // []动态插入属性 a.url === a['url'] a.params
    return instance({
        url,
        method,
        [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData
    })
}