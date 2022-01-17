<!--
 * @Author: your name
 * @Date: 2021-12-12 23:03:43
 * @LastEditTime: 2021-12-21 14:58:20
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \项目完整源码\rabbit\eribbit\src\views\category\component\goods-item.vue
--><template>
  <RouterLink :to="path" class='goods-item'>
    <img :src="goods.picture" alt="">
    <p class="name ellipsis">{{goods.name}}</p>
    <p class="desc ellipsis">{{goods.desc}}</p>
    <p class="price">&yen;{{goods.price}}</p>
  </RouterLink>
</template>

<script>
export default {
  name: 'GoodsItem',
  props:{
      goods:{
          type:Object,
          default: ()=>({})
      },
      path:{
        type:String,
        default:'/'
      }
  }
}
</script>

<style scoped lang='less'>
.goods-item {
  display: block;
  width: 220px;
  padding: 20px 30px;
  text-align: center;
  .hoverShadow();
  img {
    width: 160px;
    height: 160px;
  }
  p {
    padding-top: 10px;
  }
  .name {
    font-size: 16px;
  }
  .desc {
    color: #999;
    height: 29px;
  }
  .price {
    color: @priceColor;
    font-size: 20px;
  }
}
</style>

