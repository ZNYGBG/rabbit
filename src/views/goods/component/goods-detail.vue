<!--
 * @Author: your name
 * @Date: 2021-12-22 20:27:28
 * @LastEditTime: 2021-12-23 00:03:32
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \项目完整源码\rabbit\eribbit\src\views\goods\component\goods-detail.vue
-->
<template>
  <div class="goods-detail" v-if="goods">
    <!-- 属性 -->
    <ul class="attrs">
      <li v-for="item in goods.details.properties" :key="item.value">
        <span class="dt">{{item.name}}</span>
        <span class="dd">{{item.value}}</span>
      </li>
    </ul>
    <!-- 图片 -->
    <img v-for="item in goods.details.pictures" :key="item" :src="item" alt="">
  </div>
</template>
<script>
import { inject } from 'vue'
export default {
  name: 'GoodsDetail',
  setup(){
    const goods=inject('goods')
    return{goods}
  }
}
</script>
<style scoped lang="less">
.goods-detail {
  padding: 40px;
  .attrs {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 30px;
    li {
      display: flex;
      margin-bottom: 10px;
      width: 50%;
      .dt {
        width: 100px;
        color: #999;
      }
      .dd {
        flex: 1;
        color: #666;
      }
    }
  }
  > img {
    width: 100%;
  }
}
</style>