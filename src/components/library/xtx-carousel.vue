<!--
 * @Author: your name
 * @Date: 2021-12-09 19:47:52
 * @LastEditTime: 2021-12-09 21:32:50
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \项目完整源码\rabbit\eribbit\src\components\library\xtx-carousel.vue
-->
<template>
  <div class='xtx-carousel' @mouseenter="stop()" @mouseleave="start()">
    <ul class="carousel-body">
      <li class="carousel-item " v-for="(item,i) in sliders" :key="i" :class="{fade:index===i}">
        <RouterLink to="/">
          <img :src="item.imgUrl" alt="">
        </RouterLink>
      </li>
    </ul>
    <a @click="toggle(-1)" href="javascript:;" class="carousel-btn prev"><i class="iconfont icon-angle-left"></i></a>
    <a @click="toggle(1)" href="javascript:;" class="carousel-btn next"><i class="iconfont icon-angle-right"></i></a>
    <div class="carousel-indicator">
      <span @click="index=i" v-for="(item,i) in sliders" :key="i" :class="{active:index===i}"></span>
    </div>
  </div>
</template>

<script>
import {onUnmounted, ref, watch} from 'vue'
export default {
  name: 'XtxCarousel',
  props:{
    sliders:{type:Array,
         default:()=>[]
           },
           //是否自动轮播
           autoPlay:{
                type:Boolean,
                default :false
           },
           //间隔时间
           duration:{
             type:Number,
             default:3000
           }
  },
  setup(props){
    //默认显示索引
    const index=ref(0)
    let timer=null
    const autoPlayFn=()=>{
      //自动播放逻辑
      clearInterval(timer)
      timer=setInterval(()=>{
        index.value++
        if(index.value>=props.sliders.length){
          index.value=0
        }
      },props.duration)
    }
    //需要监听sliders数据变化，判断若果有数据且autoPlay是true
    watch(() => props.sliders, (newVal) => {
     // 有数据&开启自动播放，才调用自动播放函数
      if (newVal.length && props.autoPlay) {
        index.value = 0
        autoPlayFn()
      }
    },{immediate:true})
    //鼠标进入暂停 离开自动播放
    const stop=()=>{
      if(timer) {clearInterval(timer)}
    }
    const start=()=>{
      if(props.sliders.length&&props.autoPlay)
      {
        autoPlayFn()
      }
    }
    const toggle=(step)=>{
      const newIndex=index.value+step
      if(newIndex>=props.sliders.length){
        index.value=0
        return
      }
      if(newIndex<0){
        index.value=props.sliders.length-1
        return
      }
      index.value=newIndex
    }
    onUnmounted(()=>{
      clearInterval(timer)
    })
     return {index,stop,start,toggle}
    }
  }
</script>
<style scoped lang="less">
.xtx-carousel{
  width: 100%;
  height: 100%;
  min-width: 300px;
  min-height: 150px;
  position: relative;
  .carousel{
    &-body {
      width: 100%;
      height: 100%;
    }
    &-item {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
      transition: opacity 0.5s linear;
      &.fade {
        opacity: 1;
        z-index: 1;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
    &-indicator {
      position: absolute;
      left: 0;
      bottom: 20px;
      z-index: 2;
      width: 100%;
      text-align: center;
      span {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: rgba(0,0,0,0.2);
        border-radius: 50%;
        cursor: pointer;
        ~ span {
          margin-left: 12px;
        }
        &.active {
          background:  #fff;
        }
      }
    }
    &-btn {
      width: 44px;
      height: 44px;
      background: rgba(0,0,0,.2);
      color: #fff;
      border-radius: 50%;
      position: absolute;
      top: 228px;
      z-index: 2;
      text-align: center;
      line-height: 44px;
      opacity: 0;
      transition: all 0.5s;
      &.prev{
        left: 20px;
      }
      &.next{
        right: 20px;
      }
    }
  }
  &:hover {
    .carousel-btn {
      opacity: 1;
    }
  }
}
</style>
