<!--
 * @Author: your name
 * @Date: 2021-12-16 11:30:51
 * @LastEditTime: 2021-12-16 14:38:34
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \项目完整源码\rabbit\eribbit\src\views\goods\component\goods-image.vue
-->
<template>
  <div class="goods-image">
      <!-- 大图 -->
      <div v-show="show" class="large" :style="[{backgroundImage:`url(${images[currIndex]})`},largePosition]"></div>
      <!-- 中图 -->
    <div class="middle" ref="target">
      <img :src="images[currIndex]" alt="">
      <!-- 遮罩层容器 -->
      <div v-show="show" class="layer" :style="layerPosition"></div>
    </div>    
    <!-- 小图 -->
    <ul class="small">
      <li v-for="(img,i) in images" :key="img" :class="{active:i===currIndex}">
        <img @mouseenter="currIndex=i" :src="img" alt="">
      </li>
    </ul>
  </div>
</template>
<script>
import { reactive, ref, watch } from 'vue'
import { useMouseInElement } from '@vueuse/core'
export default {
  name: 'GoodsImage',
  props: {
    images: {
      type: Array,
      default: () => []
    }
  },
  setup (props) {
    const currIndex = ref(0)
    //1.是否显示遮罩和大图
    const show=ref(false)
    //遮罩的坐标
    const layerPosition=reactive({
        left:0,
        top:0
    })
    //3大图
    const largePosition=reactive({
        backgroundPositionX:0,
        backgroundPositionY:0
    })
    //4基于useMouseInElement得到基于元素左上角的坐标和是否离开元素数据
    const target=ref(null)
    const {elementX,elementY,isOutside} =useMouseInElement(target)
    watch([elementX,elementY,isOutside],()=>{
        //根据数据设置样式数据和显示数据
        show.value=!isOutside.value
        const position={x:0,y:0}
        if(elementX.value<100)
        position.x=0
        else if(elementX.value>300)
        position.x=200
        else position.x=elementX.value-100
        if(elementY.value<100)
        position.y=0
        else if(elementY.value>300)
        position.y=200
        else position.y=elementY.value-100
        layerPosition.left=position.x+'px'
        layerPosition.top=position.y+'px'
        largePosition.backgroundPositionX=-2*position.x+'px'
        largePosition.backgroundPositionY=-2*position.y+'px'
    })
    return { currIndex,show,layerPosition,largePosition,target }
  }
}
</script>
<style scoped lang="less">
.goods-image {
  width: 480px;
  height: 400px;
  position: relative;
  display: flex;
  z-index: 500;
  .large {
    position: absolute;
    top: 0;
    left: 412px;
    width: 400px;
    height: 400px;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
    background-repeat: no-repeat;
    background-size: 800px 800px;
    background-color: #f8f8f8;
  }
  .middle {
    width: 400px;
    height: 400px;
    background: #f5f5f5;
    position: relative;
    cursor: move;
   .layer {
      width: 200px;
      height: 200px;
      background: rgba(0,0,0,.2);
      left: 0;
      top: 0;
      position: absolute;
    }
  }
  .small {
    width: 80px;
    li {
      width: 68px;
      height: 68px;
      margin-left: 12px;
      margin-bottom: 15px;
      cursor: pointer;
      &:hover,&.active {
        border: 2px solid @xtxColor;
      }
    }
  }
}
</style>