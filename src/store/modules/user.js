/*
 * @Author: your name
 * @Date: 2021-12-06 23:03:31
 * @LastEditTime: 2021-12-07 17:20:59
 * @LastEditors: Please set LastEditors
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
                mobile: '',
                token: ''
            }

        }
    },
    mutations: {
        // 修改用户信息，payload是用户信息对象
        setUser(state, payload) {
            state.profile = payload
        }
    }
}