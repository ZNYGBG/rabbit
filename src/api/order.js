/*
 * @Author: your name
 * @Date: 2022-01-13 14:25:07
 * @LastEditTime: 2022-01-14 18:00:28
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \项目完整源码\rabbit\eribbit\src\api\order.js
 */
import request from '@/utils/request'

/**
 * 获取结算信息
 */
export const findCheckoutInfo = () => {
        return request('/member/order/pre', 'get')
    }
    /**
     * 添加收货地址信息
     * @param {Object} address - 地址对象
     */
export const addAddress = (address) => {
        return request('/member/address', 'post', address)
    }
    /**
     * 编辑收货地址信息
     * @param {Object} address - 地址对象
     */
export const editAddress = (form) => {
        return request(`/member/address/${form.id}`, 'put', form)
    }
    /**
     * 提交订单
     * @param {Object} order - 订单信息对象
     */
export const createOrder = (order) => {
    return request('/member/order', 'post', order)
}