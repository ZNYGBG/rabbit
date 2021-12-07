/*
 * @Author: your name
 * @Date: 2021-12-06 23:03:37
 * @LastEditTime: 2021-12-06 23:03:37
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \项目完整源码\rabbit\eribbit\src\store\modules\cart.js
 */
// 购物车模块
export default {
  namespaced: true,
  state () {
    return {
      // 购物车商品列表
      list: []
    }
  }
}
