<!--
 * @Author: your name
 * @Date: 2021-12-16 18:02:06
 * @LastEditTime: 2022-01-14 17:55:00
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \项目完整源码\rabbit\eribbit\src\views\goods\component\xtx-city.vue
-->
<template>
  <div class="xtx-city" ref="target">
    <div class="select" @click="changeVisible">
      <span v-if="!fullLocation" class="placeholder">{{placeholder}}</span>
      <span v-else class="value">{{fullLocation}}</span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <div class="option" v-show="visible">
      <div class="loading" v-if="loading"> </div>
         <template v-else>
         <span @click="changeItem(item)" class="ellipsis" v-for="item in currList" :key="item.code">{{item.name}}</span>
         </template>
    </div>
  </div>
</template>
<script>
import { computed, ref,reactive } from 'vue'
import axios  from 'axios'
import { onClickOutside } from '@vueuse/core'
export default {
  name: 'XtxCity',
  props:{
   fullLocation:{
     type:String,
     default:''   
   },
   placeholder: {
      type: String,
      default: '请选择配送地址'
    }
  },
  setup(props,{emit}){
    //显示隐藏数据
    const visible=ref(false)
    const allCityData=ref([])
    const loading=ref(false)
    const currList=computed(()=>{
      //默认省一级
      let list=allCityData.value
      //市
      if(changeResult.provinceCode&&changeResult.provinceName){
        list=list.find(p=>p.code===changeResult.provinceCode).areaList
      }
      //县地区  
      if(changeResult.cityCode&&changeResult.cityName){
        list=list.find(c=>c.code===changeResult.cityCode).areaList
      }
      return list
    })
    const show=()=>{
      visible.value=true
      loading.value=true
      getCityData().then(data=>{
          allCityData.value=data
          loading.value=false
      })
      for(const key in changeResult){
        changeResult[key]=''
      }
    }
    const hiden=()=>{
      visible.value=false
    }
    const changeVisible=()=>{
    if(visible.value){
      hiden()
    }
    else{
      show()
    }
    }
    const target=ref(null)
    onClickOutside(target,()=>{
      hiden()
    })
   // 获取城市数据
// 1. 数据在哪里？https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json
// 2. 何时获取？打开城市列表的时候，做个内存中缓存
// 3. 怎么使用数据？定义计算属性，根据点击的省份城市展示
const getCityData = () => {
  // 这个位置可能有异常操作，封装成promise
  return new Promise((resolve, reject) => {
    if (window.cityData) {
      // 有缓存  约定数据存储在wondow上的cityData
      resolve(window.cityData)
    } else {
      // 无缓存
      const url = 'https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json'
      axios.get(url).then(res => {
        window.cityData=res.data
        resolve(window.cityData)
})
    }
  })
}
    //定义选择的省市区数据
      const changeResult = reactive({
      provinceCode: '',
      provinceName: '',
      cityCode: '',
      cityName: '',
      countyCode: '',
      countyName: '',
      fullLocation: ''  
    })
    //点击按钮
    const changeItem=(item)=>{
      if(item.level===0){
        //省
        changeResult.provinceCode=item.code
        changeResult.provinceName=item.name
      }
       if(item.level===1){
        //市
        changeResult.cityCode=item.code
        changeResult.cityName=item.name
      }
       if(item.level===2){
        //区
        changeResult.countyCode=item.code
        changeResult.countyName=item.name
        changeResult.fullLocation=`${changeResult.provinceName} ${changeResult.cityName} ${changeResult.countyName}`
        //最后一集，关闭对话框，通知父组件
        hiden()
        emit('change',changeResult)
      }
    }
    return{visible,changeVisible,target,allCityData,loading,currList,changeItem}
  }
}
</script>
<style scoped lang="less">
.xtx-city {
  display: inline-block;
  position: relative;
  z-index: 400;  
  .select {
    border: 1px solid #e4e4e4;
    height: 30px;
    padding: 0 5px;
    line-height: 28px;
    cursor: pointer;
    &.active {
      background: #fff;
    }
    .placeholder {
      color: #999;
    }
    .value {
      color: #666;
      font-size: 12px;
    }
    i {
      font-size: 12px;
      margin-left: 5px;
    }
  }
  .option {
    width: 542px;
    border: 1px solid #e4e4e4;
    position: absolute;
    left: 0;
    top: 29px;
    background: #fff;
    min-height: 30px;
    line-height: 30px;
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    > span {
      width: 130px;
      text-align: center;
      cursor: pointer;
      border-radius: 4px;
      padding: 0 3px;
      &:hover {
        background: #f5f5f5;
      }
    }
     .loading {
      height: 290px;
      width: 100%;
      background: url(../../assets/images/loading.gif) no-repeat center;
    }
  }
}
</style>