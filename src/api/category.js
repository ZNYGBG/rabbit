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
export function findAllCategory() {
    return request('/home/category/head', 'get')
}