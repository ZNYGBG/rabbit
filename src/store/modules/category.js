/*
 * @Author: your name
 * @Date: 2021-12-06 23:03:43
 * @LastEditTime: 2021-12-07 22:41:02
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \项目完整源码\rabbit\eribbit\src\store\modules\category.js
 */
// 分类信息
import { topCategory } from '@/api/constants'
import { findAllCategory } from '@/api/category'
export default {
    namespaced: true,
    state() {
        return {
            // 分类信息集合
            list: topCategory.map(item => ({ name: item }))
        }
    },
    mutations: {
        setList(state, payload) {
            state.list = payload
        },
        //定义show和hide函数控制当前分类的耳机分类显示隐藏
        show(state, id) {
            const currentCategory = state.list.find(item => item.id === id)
            currentCategory.open = true
        },
        hide(state, id) {
            const currentCategory = state.list.find(item => item.id === id)
            currentCategory.open = false
        }
    },
    actions: {
        async getList({ commit }) {
            const res = await findAllCategory()
            res.result.forEach(top => {
                top.open = false
            })
            commit('setList', res.result)
        }
    }
}