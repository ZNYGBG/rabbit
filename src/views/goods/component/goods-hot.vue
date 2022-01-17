<!--
 * @Author: your name
 * @Date: 2021-12-22 20:47:03
 * @LastEditTime: 2021-12-22 23:42:30
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \项目完整源码\rabbit\eribbit\src\views\goods\component\goods-hot.vue
-->
<template>
  <div class="goods-hot">
    <h3>{{title}}</h3>
    <div v-if="goodsList">
        <GoodsItem v-for="item in goodsList" :key="item.id" :goods="item"></GoodsItem>
    </div>
  </div>
</template>
<script>
import GoodsItem from '@/views/category/component/goods-item'
import { computed, ref } from 'vue'
import {findGoodsHot}from '@/api/product'
import { useRoute } from 'vue-router'
export default {
  name: 'GoodsHot',
  components:{
   GoodsItem
  },
  props:{
      type:{
          type:Number,
          default:1
      }
  },
  setup (props) {
    const types = { 1: '24小时热销榜', 2: '周热销榜', 3: '总热销榜' }
    const title = computed(()=>{
        return types[props.type]
    })
    //发送请求获取数据
    const goodsList=ref([])
    const route=useRoute()
    findGoodsHot({id:route.params.id,type:props.type}).then(data=>{
        goodsList.value=data.result
    })
    return { title,goodsList }
  }
}
</script>
<style scoped lang="less">
.goods-hot {
  h3 {
    height: 70px;
    background: @helpColor;
    color: #fff;
    font-size: 18px;
    line-height: 70px;
    padding-left: 25px;
    margin-bottom: 10px;
    font-weight: normal;
  }
  :deep(.goods-item) {
    background: #fff;
    width: 100%;
    margin-bottom: 10px;
    img {
      width: 200px;
      height: 200px;
    }
    p {
      margin: 0 10px;
    }
    &:hover {
      transform: none;
      box-shadow: none;
    }
  }
}</style>