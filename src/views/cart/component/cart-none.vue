<!--
 * @Author: your name
 * @Date: 2022-01-04 18:04:35
 * @LastEditTime: 2022-01-04 18:04:35
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \项目完整源码\rabbit\eribbit\src\views\cart\component\cart-none.vue
-->
<template>
  <div class="cart-none">
    <img src="@/assets/images/none.png" alt="" />
    <p>购物车内暂时没有商品</p>
    <div class="btn">
      <XtxButton type="primary" @click="$router.push('/')">继续逛逛</XtxButton>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CartNone'
}
</script>
<style scoped lang="less">
.cart-none {
  text-align: center;
  padding: 150px 0;
  background: #fff;
  img {
    width: 180px;
  }
  p {
    color: #999999;
    padding: 20px 0;
  }
}
</style>