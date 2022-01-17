/*
 * @Author: your name
 * @Date: 2021-12-06 23:03:37
 * @LastEditTime: 2022-01-08 17:17:23
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \项目完整源码\rabbit\eribbit\src\store\modules\cart.js
 */
// 购物车模块
// 本地：id skuId name picture price nowPrice count attrsText selected stock isEffective

import { getNewCartGoods, mergeLocalCart, findCartList, insertCart, deleteCart, updateCart, checkAllCart } from '@/api/cart'
// 线上：比上面多 isCollect 有用 discount 无用 两项项信息
export default {
    namespaced: true,
    state() {
        return {
            // 购物车商品列表
            list: []
        }
    },
    //库存大于0 有效标识   
    getters: {
        //有效商品列表
        validList(state) {
            return state.list.filter(goods => goods.stock > 0 && goods.isEffective)
        },
        //有效商品总数
        validTotal(state, getters) {
            return getters.validList.reduce((p, c) => p + c.count, 0)
        },
        //有效商品总金额
        validAmount(state, getters) {
            return getters.validList.reduce((p, c) => p + c.nowPrice * 100 * c.count, 0) / 100
        },
        // 无效商品列表
        invalidList(state) {
            return state.list.filter(item => !(item.stock > 0 && item.isEffective))
        },
        // 选中商品列表
        selectedList(state, getters) {
            return getters.validList.filter(item => item.selected)
        },
        // 选中商品件数
        selectedTotal(state, getters) {
            return getters.selectedList.reduce((p, c) => p + c.count, 0)
        },
        // 选中商品总金额
        selectedAmount(state, getters) {
            return getters.selectedList.reduce((p, c) => p + c.nowPrice * 100 * c.count, 0) / 100
        },
        // 是否全选
        isCheckAll(state, getters) {
            return getters.validList.length === getters.selectedList.length && getters.selectedList.length !== 0
        }
    },
    mutations: {
        insertCart(state, payload) {
            const sameIndex = state.list.findIndex(goods => goods.skuId === payload.skuId)
            if (sameIndex > -1) {
                payload.count += state.list[sameIndex].count
                state.list.splice(sameIndex, 1)
            }
            state.list.unshift(payload)
        },
        updateCart(state, goods) {
            const updateGoods = state.list.find(item => item.skuId === goods.skuId)
            for (const key in goods) {
                if (goods[key] !== undefined && goods[key] !== null && goods[key] !== '')
                    updateGoods[key] = goods[key]
            }
        },
        deleteCart(state, skuId) {
            const index = state.list.findIndex(item => item.skuId === skuId)
            state.list.splice(index, 1)
        },
        setCartList(state, payload) {
            state.list = payload
        }
    },
    actions: {
        insertCart(context, payload) {
            return new Promise((resolve, reject) => {
                if (context.rootState.user.profile.token) {
                    //以登录
                    insertCart(payload).then(() => { return findCartList() }).then(data =>
                        context.commit('setCartList', data.result))
                } else {
                    context.commit('insertCart', payload)
                    resolve()
                }
            })
        },
        findCartList(context) {
            return new Promise((resolve, reject) => {
                if (context.rootState.user.profile.token) {
                    //登录
                    findCartList().then(data =>
                        context.commit('setCartList', data.result))
                    resolve()
                } else {
                    const promiseArr = context.state.list.map(item => {
                        return getNewCartGoods(item.skuId)
                    })
                    Promise.all(promiseArr).then(dataArr => {
                        dataArr.forEach((data, i) => {
                            context.commit('updateCart', { skuId: context.state.list[i].skuId, ...data.result })
                        })
                        resolve()
                    }).catch(e => {
                        reject(e)
                    })
                }
            })
        },
        // 修改购物车商品
        updateCart(context, payload) {
            return new Promise((resolve, reject) => {
                if (context.rootState.user.profile.token) {
                    // 登录 TODO
                    updateCart(payload).then(() => { return findCartList() })
                        .then(data => {
                            context.commit('setCartList', data.result)
                            resolve()
                        })
                } else {
                    // 本地
                    context.commit('updateCart', payload)
                    resolve()
                }
            })
        },
        // 删除购物车商品
        deleteCart(context, skuId) {
            return new Promise((resolve, reject) => {
                if (context.rootState.user.profile.token) {
                    // 登录 TODO
                    deleteCart([skuId]).then(() => { return findCartList() })
                        .then(data => {
                            context.commit('setCartList', data.result)
                            resolve()
                        })
                } else {
                    // 本地
                    context.commit('deleteCart', skuId)
                    resolve()
                }
            })
        },
        //全选
        checkAllCart(context, selected) {
            return new Promise((resolve, reject) => {
                if (context.rootState.user.profile.token) {
                    // 登录 TODO
                    const ids = context.getters.validList.map(item => item.skuId)
                    checkAllCart({ selected, ids }).then(() => { return findCartList() })
                        .then(data => {
                            context.commit('setCartList', data.result)
                            resolve()
                        })
                } else {
                    // 本地
                    context.getters.validList.forEach(item => {
                        context.commit('updateCart', { skuId: item.skuId, selected })
                    })
                    resolve()
                }
            })
        },
        //删除选中
        batchDeleteCart(context, isClear) {
            return new Promise((resolve, reject) => {
                if (context.rootState.user.profile.token) {
                    // 登录 TODO
                    // 登录 TODO
                    // 得到需要删除的商品列表（失效，选中）的skuId集合 中括号取对象加引号
                    const ids = context.getters[isClear ? 'invalidList' : 'selectedList'].map(item => item.skuId)
                    deleteCart(ids).then(() => {
                        return findCartList()
                    }).then((data) => {
                        context.commit('setCartList', data.result)
                        resolve()
                    })
                } else {
                    // 本地
                    context.getters[isClear ? 'invalidList' : 'selectedList'].forEach(item => {
                        context.commit('deleteCart', item.skuId)
                    })
                    resolve()
                }
            })
        },
        updateCartSku(context, { oldSkuId, newSku }) {
            return new Promise((resolve, reject) => {
                if (context.rootState.user.profile.token) {
                    // 登录 TODO
                    const oldGoods = context.state.list.find(item => item.skuId === oldSkuId)
                    deleteCart([oldSkuId]).then(() => { return insertCart({ skuId: newSku.skuId, count: oldGoods.count }) })
                        .then(() => { return findCartList() })
                        .then(data => {
                            context.commit('setCartList', data.result)
                        })
                    resolve()
                } else {
                    // 本地
                    console.log(oldSkuId);
                    const oldGoods = context.state.list.find(item => item.skuId === oldSkuId)
                    context.commit('deleteCart', oldSkuId)
                    const { skuId, price: nowPrice, inventory: stock, specsText: attrsText } = newSku
                    const newGoods = {...oldGoods, skuId, nowPrice, stock, attrsText }
                    console.log(newGoods);
                    context.commit('insertCart', newGoods)
                }
            })
        },
        // 合并本地购物车
        async mergeLocalCart(context) {
            const cartList = context.getters.validList.map(goods => {
                return {
                    skuId: goods.skuId,
                    selected: goods.selected,
                    count: goods.count
                }
            })
            await mergeLocalCart(cartList)
            context.commit('setCartList', [])
        }
    }
}