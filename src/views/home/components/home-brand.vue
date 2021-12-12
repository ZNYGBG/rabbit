<!--
 * @Author: your name
 * @Date: 2021-12-11 21:36:09
 * @LastEditTime: 2021-12-11 22:34:56
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \项目完整源码\rabbit\eribbit\src\views\home\components\home-brand.vue
-->
<template>
  <HomePanel title="热门品牌" sub-title="国际经典 品质保证">
    <template v-slot:right>
      <a @click="toggle(-1)" :class="{disabled:index===0}" href="javascript:;" class="iconfont icon-angle-left prev"></a>
      <a @click="toggle(1)" :class="{disabled:index===1}" href="javascript:;"  class="iconfont icon-angle-right next"></a>
    </template>
    <div class="box" ref="target">
      <Transition name="fade">
      <ul v-if="brands.length" class="list" :style="{transform:`translateX(${-index*1240}px)`}">
        <li v-for="item in brands" :key="item.id">
          <RouterLink to="/">
            <img :src="item.picture" alt="">
          </RouterLink>
        </li>
      </ul>
      <div v-else class="skeleton">
      <HomeSkeleton class="item" v-for="i in 5" :key="i" animated bg="#e4e4e4" width="240px" height="305px"/>
      </div>
      </Transition>
    </div>
  </HomePanel>
</template>

<script>
import {useLazyData} from '@/hooks'
import HomePanel from './home-panel'
import HomeSkeleton from './home-skeleton.vue'
import {ref} from 'vue'
import {findBrand} from '@/api/home'
export default {
  name: 'HomeBrand',
  components: { 
    HomePanel,
  HomeSkeleton },
  setup(){
    const index=ref(0)
   /*  findBrand(10).then(data=>{
      brands.value=data.result
    }) */
    const toggle=(step)=>{
      const newIndex=index.value+step
      if(newIndex<0||newIndex>1){
       return
      }
      else{
         index.value=newIndex
      }
    }
    const {target,result}=useLazyData(()=>findBrand(10))
     return {brands: result,target,toggle,index}
   /*  return {brands,toggle,index} */
  }
}
</script>

<style scoped lang='less'>
.home-panel {
  background:#f5f5f5
}
.iconfont {
  width: 20px;
  height: 20px;
  background: #ccc;
  color: #fff;
  display: inline-block;
  text-align: center;
  margin-left: 5px;
  background: @xtxColor;
  &::before {
    font-size: 12px;
    position: relative;
    top: -2px
  }
  &.disabled {
    background: #ccc;
    cursor: not-allowed;
  }
}
.box {
  display: flex;
  width: 100%;
  height: 345px;
  overflow: hidden;
  padding-bottom: 40px;
  .list {
    width: 200%;
    display: flex;
    transition: all 1s;
    li {
      margin-right: 10px;
      width: 240px;
      &:nth-child(5n) {
        margin-right: 0;
      }
      img {
        width: 240px;
        height: 305px;
      }
    }
  }
}
</style>