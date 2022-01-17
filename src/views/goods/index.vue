<!--
 * @Author: your name
 * @Date: 2021-12-15 18:03:21
 * @LastEditTime: 2022-01-18 00:58:44
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \项目完整源码\rabbit\eribbit\src\views\goods\index.vue
-->
<template>
  <div class='xtx-goods-page'>
    <div class="container">
      <!-- 面包屑 -->
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <XtxBreadItem v-if="goods" :to="`/category/${goods.categories[1].id}`">{{goods.categories[1].name}}</XtxBreadItem>
        <XtxBreadItem v-if="goods" :to="`/category/sub/${goods.categories[0].id}`">{{goods.categories[0].name}}</XtxBreadItem>
        <XtxBreadItem v-if="goods">{{goods.name }}</XtxBreadItem>
      </XtxBread>
      <!-- 商品信息 -->
      <div class="goods-info">
        <div class="media">
          <GoodsImage v-if="goods" :images="goods.mainPictures"></GoodsImage>
          <GoodsSales></GoodsSales>
        </div>
        <div class="spec">
          <!-- 名字区组件 -->
          <GoodsName v-if="goods" :goods="goods"/>
          <!-- 规格组件 -->
          <GoodsSku v-if="goods" :goods="goods" skuId="300270667" @change="changeSku"></GoodsSku>
          <XtxNumbox v-if="goods" v-model="num" label="数量" :max="goods.inventory"></XtxNumbox>
          <XtxButton @click="insert" type="primary" style="margin-top:20px;margin-left:10px">加入购物车</XtxButton>
        </div>
      </div>
      <!-- 商品推荐 -->
      <GoodsRelevant v-if="goods" :goodsId="goods.id"/>
      <!-- 商品详情 -->
      <div class="goods-footer">
        <div class="goods-article">
          <!-- 商品+评价 -->
          <div class="goods-tabs">
            <GoodsTabs :goods="goods"></GoodsTabs>
          </div>
          <!-- 注意事项 -->
          <div class="goods-warn">
            <GoodsWarn></GoodsWarn>
          </div>
        </div>
        <!-- 24热榜+专题推荐 -->
        <div class="goods-aside">
         <GoodsHot  :type="2" />
          </div> 
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import GoodsRelevant from './component/goods-relevant.vue'
import GoodsImage from './component/goods-image.vue'
import GoodsSales from './component/goods-sales.vue'
import GoodsName from './component/goods-name.vue'
import GoodsSku from './component/goods-sku.vue'
import GoodsTabs from './component/goods-tabs.vue'
import GoodsHot from './component/goods-hot.vue'
import {findGoods} from '@/api/product'
import { watch, ref, nextTick, provide } from 'vue'
import GoodsWarn from './component/goods-warn'
import { useStore } from 'vuex'
import Message from '@/components/library/message'
export default {
  name: 'XtxGoodsPage',
  components: { 
  GoodsRelevant,
  GoodsImage,
  GoodsSales,
  GoodsName,
  GoodsSku,
  GoodsTabs,
  GoodsHot,
  GoodsWarn
  },
  setup(){
   //1。获取商品详情，进行渲染
   const goods=useGoods()
   const changeSku=(sku)=>{
     //修改商品的现价原价库存信息
     if (sku.skuId){
       goods.value.price=sku.price
       goods.value.oldPrice=sku.oldPrice
       goods.value.inventory=sku.inventory
     }
     currSku.value=sku
   }
   //提供goods给后代组件
   provide('goods',goods)
   //商品数量
   const num=ref(1)
   const store=useStore() 
   const currSku=ref(null)
   const insert=()=>{
     if(currSku.value&&currSku.value.skuId){
       const {skuId,specsText:attrsText,inventory:stock}=currSku.value
       const {id,name,price,mainPictures} =goods.value
       store.dispatch('cart/insertCart',{
        skuId,
        attrsText,
        stock,
        id,
        name,
        nowPrice:price,
        picture:mainPictures[0],
        selected:true,
        isEffective:true,
        count:num.value
       })
       Message({type:'success',text:'加入购物车成功'})
     }
     else{
       Message({type:'error',text:'请选择完整规格'})
     }
   }
   return {goods,changeSku,num,insert}
  }
}
//获取商品详情
const useGoods=()=>{
   const goods=ref(null)
    const route=useRoute()
    watch(()=>route.params.id,(newVal)=>{
    if(newVal&&`/product/${newVal}`===route.path){
      findGoods(route.params.id).then(data=>{
        //让商品数据为null然后v-if组件可以重新销毁创建
      goods.value=null
      nextTick(()=>goods.value=data.result)
    })
    }
    },{immediate:true})
    
    return goods
}
</script>

<style scoped lang='less'>
.goods-info {
  min-height: 600px;
  background: #fff;
  display: flex;
  .media {
    width: 580px;
    height: 600px;
    padding: 30px 50px;
  }
  .spec {
    flex: 1;
    padding: 30px 30px 30px 0;
  }
}
.goods-footer {
  display: flex;
  margin-top: 20px;
  .goods-article {
    width: 940px;
    margin-right: 20px;
  }
  .goods-aside {
    width: 280px;
    min-height: 1000px;
  }
}
.goods-tabs {
  min-height: 600px;
  background: #fff;
}
.goods-warn {
  min-height: 600px;
  background: #fff;
  margin-top: 20px;
}
</style>