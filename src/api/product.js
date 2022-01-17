/*
 * @Author: your name
 * @Date: 2021-12-15 18:14:57
 * @LastEditTime: 2021-12-15 18:14:57
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \项目完整源码\rabbit\eribbit\src\api\product.js
 */
//提供商品相关的API
import request from "@/utils/request";
export function findGoods(id) {
    return request('/goods', 'get', { id })
}
/**
 * 获取商品同类推荐-未传入ID为猜喜欢
 * @param {String} id - 商品ID
 * @param {Number} limit - 获取条数
 */
export const findRelGoods = (id, limit = 16) => {
    return request('/goods/relevant', 'get', { id, limit })
}
export const findGoodsHot = ({ id, limit = 3, type = 1 }) => {
        return request('/goods/hot', 'get', { id, type, limit })
    }
    /**
     * 获取商品的评价统计信息
     * @param {String} id - 商品ID
     */
export const findGoodsCommentInfo = (id) => {
        //axios遇见https开头的地址，不会加入基准地址
        return request(`https://mock.boxuegu.com/mock/1175/goods/${id}/evaluate`, 'get')
    }
    //评价列表
export const findGoodsCommentList = (id, params) => {
    //axios遇见https开头的地址，不会加入基准地址
    return request(`https://mock.boxuegu.com/mock/1175/goods/${id}/evaluate/page`, 'get', params)
}