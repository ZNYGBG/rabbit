/*
 * @Author: your name
 * @Date: 2021-12-06 23:03:31
 * @LastEditTime: 2021-12-28 14:04:05
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \项目完整源码\rabbit\eribbit\src\store\modules\user.js
 */
// 用户模块
export default {
    namespaced: true,
    state() {
        return {
            // 用户信息
            profile: {
                id: '',
                avatar: '',
                nickname: '',
                account: '',
                mobile: '',
                token: ''
            },
            // 登录后回跳路径
            redirectUrl: '/'
        }
    },
    mutations: {
        // 修改用户信息，payload就是用户信息对象
        setUser(state, payload) {
            state.profile = payload
        },
        // 修改回跳地址
        setRedirectUrl(state, url) {
            state.redirectUrl = url
        }
    }
}