<!--
 * @Author: your name
 * @Date: 2021-12-24 15:12:38
 * @LastEditTime: 2021-12-24 16:36:39
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \项目完整源码\rabbit\eribbit\src\components\library\xtx-pagination.vue
-->
<template>
  <div class="xtx-pagination">
    <a v-if="myCurrentPage<=1" href="javascript:;" class="disabled">上一页</a>
    <a v-else @click="changePage(myCurrentPage-1)" href="javascript:;">上一页</a>
    <span v-if="pager.start>1">...</span>
    <a @click="changePage(item)" href="javascript:;" v-for="item in pager.btnArr" :key="item" :class="{active:myCurrentPage===item}">{{item}}</a>
    <span v-if="pager.end<pager.pageCount">...</span>
    <a v-if="myCurrentPage>=pager.pageCount" href="javascript:;" class="disabled">下一页</a>
    <a v-else @click="changePage(myCurrentPage+1)" href="javascript:;">下一页</a>
  </div>
</template>
<script>
import { computed, ref, watch } from 'vue'
export default {
  name: 'XtxPagination',
  props:{
    total:{
        type:Number,
        default:100
    },
     currentPage: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 10
    }
  },
  setup(props,{emit}){
      //约定按钮个数5个
      const count=5
      //显示当前显示页码
      const myCurrentPage=ref(1)
      //总页数
      const myTotal=ref(100)
      const myPageSize=ref(10) 
      //其他数据（总页数，起始按钮，结束按钮，按钮数组）依赖上面数据得到
      const pager=computed(()=>{
          const pageCount=Math.ceil(myTotal.value/myPageSize.value)
          //起始按钮，结束按钮，按钮数组
          let start=myCurrentPage.value-Math.floor(count/2)
          let end=start+count-1
          if(start<1)
          {start=1
           end=start+count-1>pageCount?pageCount:start+count-1
           }
           if(end>pageCount){
               end=pageCount
               start=pageCount-count<1?1:pageCount-count+1
           }
           const btnArr=[]
           for(let i=start;i<=end;i++)
           {
              btnArr.push(i)
           }
          return {
              pageCount,
              start,
              end,
              btnArr
          }
      })
      const changePage=(newValue)=>{
          if(myCurrentPage.value!==newValue){
          myCurrentPage.value=newValue
          emit('changeP',newValue)
          }
          
      }
      //监听props的变化，更新组件内部数据
      watch(props,()=>{
          myTotal.value=props.total
          myPageSize.value=props.pageSize
          myCurrentPage.value=props.currentPage
      },{immediate:true})
      return {myCurrentPage,pager,changePage}
  }
}
</script>
<style scoped lang="less">
.xtx-pagination {
  display: flex;
  justify-content: center;
  padding: 30px;
  > a {
    display: inline-block;
    padding: 5px 10px;
    border: 1px solid #e4e4e4;
    border-radius: 4px;
    margin-right: 10px;
    &:hover {
      color: @xtxColor;
    }
    &.active {
      background: @xtxColor;
      color: #fff;
      border-color: @xtxColor;
    }
    &.disabled {
      cursor: not-allowed;
      opacity: 0.4;
      &:hover {
        color: #333
      }
    }
  }
  > span {
    margin-right: 10px;
  }
}
</style>