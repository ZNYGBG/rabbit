<!--
 * @Author: your name
 * @Date: 2021-12-14 19:32:32
 * @LastEditTime: 2021-12-14 19:47:56
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \项目完整源码\rabbit\eribbit\src\components\library\xtx-infinite-loading.vue
-->
<template>
  <div class="xtx-infinite-loading" ref="target">
    <div class="loading" v-if="loading" >
      <span class="img"></span>
      <span class="text">正在加载...</span>
    </div>
    <div class="none" v-if="finished">
      <span class="img"></span>
      <span class="text">亲，没有更多了</span>
    </div>
  </div>
</template>
<script>
import {ref} from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
export default {
  name: 'XtxInfiniteLoading',
  props:{
    loading:{
      type:Boolean,
      default:false
    },
    finished:{
      type:Boolean,
      default:false
    }
  },
  setup(props,{emit}){
    const target=ref(null)
    //监听target是否进入可是去
    useIntersectionObserver(target,([{isIntersecting}])=>{
      if(isIntersecting){
        if(props.loading===false&&props.finished===false)
        emit("infinite")
      }
    },{
      threshold:0
    })
    return {target}
  }
}
</script>

<style scoped lang='less'>
.xtx-infinite-loading {
  .loading {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200px;
    .img {
      width: 50px;
      height: 50px;
      background: url(../../assets/images/load.gif) no-repeat center / contain;
    }
    .text {
      color: #999;
      font-size: 16px;
    }
  }
  .none {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200px;
    .img {
      width: 200px;
      height: 134px;
      background: url(../../assets/images/none.png) no-repeat center / contain;
    }
    .text {
      color: #999;
      font-size: 16px;
    }
  }
}
</style>
