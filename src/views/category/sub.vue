<!--
 * @Author: your name
 * @Date: 2021-12-07 21:51:57
 * @LastEditTime: 2021-12-15 00:38:57
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \项目完整源码\rabbit\eribbit\src\views\category\sub.vue
-->
<!--
 * @Author: your name
 * @Date: 2021-12-07 21:52:24
 * @LastEditTime: 2021-12-07 21:55:21
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \项目完整源码\rabbit\eribbit\src\views\category\index.vue
-->
<template>
  <div class="sub-category">
    <div class="container">
      <!-- 面包屑 -->
      <SubBread></SubBread>
      <!-- 筛选区 -->
      <SubFilter @filter-change="filterChange"></SubFilter>
      <!-- 商品面板 （排序加列表） -->
      <div class="goods-list">
        <!-- 排序 -->
        <SubSort @sort-change="sortChange"/>
        <!-- 列表 -->
        <ul>
          <li v-for="item in goodsList" :key="item.id" >
            <GoodsItem :goods="item" />
          </li>
        </ul>
        <!-- 无限加载组件 -->
        <XtxInfiniteLoading :loading="loading" :finished="finished" @infinite="getData"/>
      </div>
    </div>  
  </div>
</template>

<script>
import SubBread from './component/sub-bread.vue'
import SubFilter from './component/sub-filter.vue'
import SubSort from './component/sub-sort.vue'
import GoodsItem from './component/goods-item.vue'
import {ref, watch} from 'vue'
import {findSubCategoryGoods}from '@/api/category'
import { useRoute } from 'vue-router'
export default {
  name:'SubCategory',
  components:{
    SubBread,
    SubFilter,
    SubSort,
    GoodsItem,
  },
  setup(){
    const loading=ref(false)
    const finished=ref(false)
    let reqParams={
      page:1,
      pageSize:20,
      categoryId:null
    }
    const route=useRoute()
    const goodsList=ref([])
    const getData=()=>{
      loading.value=true
      reqParams.categoryId=route.params.id
      findSubCategoryGoods(reqParams).then((data)=>{
       if(data.result.items.length){
       goodsList.value.push(...data.result.items)
       reqParams.page++
      }
      else{
       finished.value=true
      }
       loading.value=false
      })
    }
    //切换二级分类
    watch(()=>route.params.id,(newVal)=>{
      if(newVal&&route.path===`/category/sub/${route.params.id}`)
      {
        reqParams.params={
          page:1,
      pageSize:20,
      categoryId:null
        }
        finished.value=false
        goodsList.value=[]
      }
    })
    //1排序发起，重新发请求啊
    //2.更改选项，重新发起请求
    const sortChange=(sortParams)=>{
      finished.value=false
      //合并参数
      reqParams={...reqParams,...sortParams}
      reqParams.page=1
      goodsList.value=[]

    }
    //更改筛选数据重新请求
    const filterChange=(filterParams)=>{
      //和并请求参数，保留之前参数
      reqParams={...reqParams,...filterParams}
      reqParams.page=1
      goodsList.value=[]
      finished.value=false
    }
    return {loading,finished,goodsList,getData,sortChange,filterChange}
  }
}
</script>

<style scoped lang='less'>
.goods-list {
  background: #fff;
  padding: 0 25px;
  margin-top: 25px;
  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0 5px;
    li {
      margin-right: 20px;
      margin-bottom: 20px;
      &:nth-child(5n) {
        margin-right: 0;
      }
    }
  }
}
</style>