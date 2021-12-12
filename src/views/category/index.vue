<!--
 * @Author: your name
 * @Date: 2021-12-07 21:52:24
 * @LastEditTime: 2021-12-12 20:02:44
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \项目完整源码\rabbit\eribbit\src\views\category\index.vue
-->
<template>
  <div class="top-category">
      <div class="container">
        <!-- 面包屑  -->
        <XtxBread>
          <XtxBreadItem :to="{path:'/'}">首页</XtxBreadItem>
          <XtxBreadItem :to="{path:'/category/100501'}">电器</XtxBreadItem>
          <XtxBreadItem>空调</XtxBreadItem>
        </XtxBread>
        <!-- 轮播图  -->
        <!-- 全部分类  -->
        <!-- 各个分类推荐商品  -->
      </div>
  </div>
</template>

<script> 
export default {
  name:'TopCategory'
}
</script>

<style>

</style>