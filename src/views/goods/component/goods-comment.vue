<template>
  <div v-if="commentInfo" class="goods-comment">
    <div class="head">
      <div class="data">
        <p><span>{{commentInfo.salesCount}}</span><span>人购买</span></p>
        <p><span>{{commentInfo.praisePercent}}</span><span>好评率</span></p>
      </div>
      <div class="tags">
        <div class="dt">大家都在说：</div>
        <div class="dd">
          <a
           v-for="(item,i) in commentInfo.tags"
            :key="item.title" href="javascript:;"
             :class="{active:currentIndex===i}"
             @click="changeTag(i)">{{item.title}}（{{item.tagCount}}）</a>
        </div>
      </div>
    </div>
    <div class="sort" v-if="commentInfo">
      <span>排序：</span>
      <a @click="changeSort(null)" href="javascript:;" :class="{active:reqParams.sortField===null}">默认</a>
      <a @click="changeSort('createTime')" href="javascript:;" :class="{active:reqParams.sortField==='createTime'}">最新</a>
      <a @click="changeSort('praiseCount')" href="javascript:;" :class="{active:reqParams.sortField==='praiseCount'}">最热</a>
    </div>
       <!-- 列表 -->
    <div class="list" v-if="commentList">
      <div class="item" v-for="item in commentList" :key="item.id">
        <div class="user">
          <img :src="item.member.avatar">
          <span>{{formatNickName(item.member.nickname)}}</span>
        </div>
        <div class="body">
          <div class="score">
            <i v-for="i in item.score" :key="i+'s'" class="iconfont icon-wjx01"></i>
            <i v-for="i in 5-item.score" :key="i+'k'" class="iconfont icon-wjx02"></i>
            <span class="attr">{{formatSpecs(item.orderInfo.specs)}}</span>
          </div>
          <div class="text"> {{item.content}}</div>
          <!-- 评论图片组件 -->
          <GoodsCommentImage v-if="item.pictures.length" :pictures="item.pictures"></GoodsCommentImage>
          <div class="time">
            <span>{{item.createTime}}</span>
            <span class="zan"><i class="iconfont icon-dianzan"></i>{{item.praiseCount}}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 分页组件 -->
    <XtxPagination v-if="total>0" @changeP="changePage" :total="total" :page-size="reqParams.pageSize" :current-page="reqParams.page"></XtxPagination>
  </div>
</template>
<script>
import {inject, reactive, ref, watch} from 'vue'
import {findGoodsCommentInfo,findGoodsCommentList} from '@/api/product'
import GoodsCommentImage from './goods-comment-image.vue'
export default {
  name: 'GoodsComment',
  components:{
    GoodsCommentImage
  },
  setup(){
    //评价信息
    const commentInfo=ref(null)
    const currentIndex=ref(0)
    const goods=inject('goods')
    const changeTag=(i)=>{
      currentIndex.value=i
      //点击tag的时候改筛选条件
      //情况1 全部评价
      //情况2 有图
      //情况3 正常tag
      const tag=commentInfo.value.tags[i]
      if(tag.type==="all"){
        reqParams.hasPicture=null
        reqParams.tag=null
      }else if(tag.type==='img'){
        reqParams.hasPicture=true
        reqParams.tag=null
      }
      else{
        reqParams.hasPicture=null
        reqParams.tag=tag.title
      }
          //页码重置
    reqParams.page=1
    }
    //点击排序
    const changeSort=(sortField)=>{
      reqParams.sortField=sortField
      //页码重置
    reqParams.page=1
    }
    findGoodsCommentInfo(goods.value.id).then(data=>{
      data.result.tags.unshift({title:'有图',tagCount:data.result.hasPictureCount})
      data.result.tags.unshift({title:'全部评价',tagCount:data.result.evaluateCount})
      //设置数据之前，tags数组前追加 有图tag 全部评价tag
      commentInfo.value=data.result
    })
    //准备筛选条件数据
    const reqParams=reactive({
      page:1,
      pageSize:10,
      hasPicture:null,
      tag:null,
      //排序方法： praiseCount 热度  createTime 最新
      sortField:null
    })
    const commentList=ref([])
    const total=ref(0)
    watch(reqParams,()=>{
    findGoodsCommentList(goods.id,reqParams).then(data=>{
      commentList.value=data.result.items
      total.value=data.result.counts
    })
    },{immediate:true})
    //定义转换数据的函数
    const formatSpecs=(specs)=>{
     return specs.reduce((p,c)=>`${p} ${c.name}: ${c.nameValue}`,'').trim()
    }
    const formatNickName=(sub)=>{
      return sub.substr(0,1)+'******'+sub.substr(-1)
    }
    const changePage=(newVal)=>{
      reqParams.page=newVal
    }
    return {commentInfo,currentIndex,changeTag,reqParams,commentList,changeSort,formatSpecs,formatNickName,total,changePage}
  }
}
</script>
<style scoped lang="less">
.goods-comment {
  .head {
    display: flex;
    padding: 30px 0;
    .data {
      width: 340px;
      display: flex;
      padding: 20px;
      p {
        flex: 1;
        text-align: center;
        span {
          display: block;
          &:first-child {
            font-size: 32px;
            color: @priceColor;
          }
          &:last-child {
            color: #999;
          }
        }
      }
    }
    .tags {
      flex: 1;
      display: flex;
      border-left: 1px solid #f5f5f5;
      .dt {
        font-weight: bold;
        width: 100px;
        text-align: right;
        line-height: 42px;
      }
      .dd {
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        > a {
          width: 132px;
          height: 42px;
          margin-left: 20px;
          margin-bottom: 20px;
          border-radius: 4px;
          border: 1px solid #e4e4e4;
          background: #f5f5f5;
          color: #999;
          text-align: center;
          line-height: 40px;
          &:hover {
            border-color: @xtxColor;
            background: lighten(@xtxColor,50%);
            color: @xtxColor;
          }
          &.active {
            border-color: @xtxColor;
            background: @xtxColor;
            color: #fff;
          }
        }
      }
    }
  }
  .sort {
    height: 60px;
    line-height: 60px;
    border-top: 1px solid #f5f5f5;
    border-bottom: 1px solid #f5f5f5;
    margin: 0 20px;
    color: #666;
    > span {
      margin-left: 20px;
    }
    > a {
      margin-left: 30px;
      &.active,&:hover {
        color: @xtxColor;
      }
    }
  }
    .list {
    padding: 0 20px;
    .item {
      display: flex;
      padding: 25px 10px;
      border-bottom: 1px solid #f5f5f5;
      .user {
        width: 160px;
        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          overflow: hidden;
        }
        span {
          padding-left: 10px;
          color: #666;
        }
      }
      .body {
        flex: 1;
        .score {
          line-height: 40px;
          .iconfont {
            color: #ff9240;
            padding-right: 3px;
          }
          .attr {
            padding-left: 10px;
            color: #666;
          }
        }
      }
      .text {
        color: #666;
        line-height: 24px;
      }
      .time {
        color: #999;
        display: flex;
        justify-content: space-between;
        margin-top: 5px;
      }
    }
  }
}
</style>