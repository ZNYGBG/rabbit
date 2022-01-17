/*
 * @Author: your name
 * @Date: 2021-12-07 21:02:56
 * @LastEditTime: 2021-12-07 21:05:51
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \项目完整源码\rabbit\eribbit\src\api\category.js
 */
/* 获取所有分类 */
import request from '@/utils/request'
/* export function findAllCategory() {
    return request('/home/category/head', 'get')
} */
export const findAllCategory = () => {
        return request('/home/category/head', 'get')
    }
    /**
     * 获取单个顶级分类信息
     * @param {String} id - 顶级分类ID
     */
export const findTopCategory = (id) => {
    return request('/category', 'get', { id })
}
export const findSubCategoryFilter = (id) => {
        return request('/category/sub/filter', 'get', { id })
    }
    /**
     * 获取分类下的商品（带筛选条件）
     * @param {Object} params - 可参考接口文档
     */
export const findSubCategoryGoods = (params) => {
    return request('/category/goods/temporary', 'post', params)
}