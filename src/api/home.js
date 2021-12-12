/*
 * @Author: your name
 * @Date: 2021-12-09 14:20:50
 * @LastEditTime: 2021-12-12 00:37:29
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \项目完整源码\rabbit\eribbit\src\api\home.js
 */
import request from '@/utils/request'
export const findBrand = (limit = 6) => {
    return request('home/brand', 'get', { limit })
}
export const findBanner = () => {
        return request('home/banner', 'get')
    }
    //获取新鲜好物
export const findNew = () => {
        return request('home/new', 'get')
    }
    //获取人气推荐
export const findHot = () => {
        return request('home/hot', 'get')
    }
    //获取商品
export const findGoods = () => {
    return request('home/goods', 'get')
}
export const findSpecial = () => {
    return request('home/special', 'get')
}