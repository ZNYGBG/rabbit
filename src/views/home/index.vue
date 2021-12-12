<!--
 * @Author: your name
 * @Date: 2021-12-07 15:32:20
 * @LastEditTime: 2021-12-12 00:37:00
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \项目完整源码\rabbit\eribbit\src\views\home\index.vue
-->
<template>
  <div class="page-home">
    <div class="home-entry">
      <div class="container">
        <!-- 左侧分类 -->
        <HomeCategory />
<!-- //轮播图 -->
      <HomeBanner />
            </div>  
    </div>
    <!-- 新鲜好物 -->
    <HomeNew></HomeNew>
    <!-- 人气推荐 -->
    <HomeHot></HomeHot>
    <!-- 品牌组件 -->
    <HomeBrand></HomeBrand>
    <!-- 商品区域 -->
    <HomeProduct></HomeProduct>
    <!-- 最新专题 -->
    <HomeSpecial></HomeSpecial>
  </div>
  
</template>

<script>

import HomeCategory from './components/home-category.vue'
import HomeBanner from './components/home-banner'
import HomeNew from './components/home-new'
import HomeHot from './components/home-hot'
import HomeBrand from './components/home-brand'
import HomeProduct from './components/home-product'
import HomeSpecial from './components/home-special'
export default {
  name: 'HomePage',

  components:{
    HomeCategory,
    HomeBanner,
    HomeNew,
    HomeHot,
    HomeBrand,
    HomeProduct,
    HomeSpecial
  },
}
</script>

<style scoped lang="less">

</style>
