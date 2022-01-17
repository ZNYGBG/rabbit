<!--
 * @Author: your name
 * @Date: 2021-12-15 18:05:02
 * @LastEditTime: 2021-12-22 19:16:14
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \项目完整源码\rabbit\eribbit\src\views\goods\component\goods-relevant.vue
-->
<template>
  <div class="goods-relevant">
    <div class="header">
      <i class="icon" />
      <span class="title">{{goodsId?'同类商品推荐':'猜你喜欢'}}</span>
    </div>
    <!-- 此处使用改造后的xtx-carousel.vue -->
    <XtxCarousel :sliders="sliders" autoPlayx></XtxCarousel>
  </div>
</template>

<script>
import { findRelGoods } from '@/api/product'
import {ref} from 'vue'
export default {
  // 同类推荐，猜你喜欢
  name: 'GoodsRelevant',
  props:{
    goodsId:{
      type:String,
      default:''
    }
  },
  setup(props){
    //最终需要sliders提供给轮播图
      const sliders=ref([])
      findRelGoods({id:props.goodsId}).then(data=>{
        //data.result 商品列表，数据结构:[16ge]
        const pageSize=4
        const pageCount=Math.ceil(data.result.length/pageSize)
        for(let i=0;i<pageCount;i++){
          sliders.value.push(data.result.slice(i*pageSize,pageSize*(i+1)))
        }
      })
    return {sliders}
  }
}
</script>

<style scoped lang='less'>
.goods-relevant {
  background: #fff;
  min-height: 460px;
  margin-top: 20px;
  .header {
    height: 80px;
    line-height: 80px;
    padding: 0 20px;
    .title {
      font-size: 20px;
      padding-left: 10px;
    }
    .icon {
      width: 16px;
      height: 16px;
      display: inline-block;
      border-top: 4px solid @xtxColor;
      border-right: 4px solid @xtxColor;
      box-sizing: border-box;
      position: relative;
      transform: rotate(45deg);
      &::before {
        content: "";
        width: 10px;
        height: 10px;
        position: absolute;
        left: 0;
        top: 2px;
        background: lighten(@xtxColor, 40%);
      }
    }
  }
}
:deep(.xtx-carousel) {
  height: 380px;
  .carousel {
    &-indicator {
      bottom: 30px;
      span {
        &.active {
          background: @xtxColor;
        }
      }
    }
    &-btn {
      top: 110px;
      opacity: 1;
      background: rgba(0,0,0,0);
      color: #ddd;
      i {
        font-size: 30px;
      }
    }
  }
}
</style>