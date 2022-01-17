<!--
 * @Author: your name
 * @Date: 2021-12-17 16:50:35
 * @LastEditTime: 2021-12-22 15:20:52
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \项目完整源码\rabbit\eribbit\src\views\goods\component\goods-sku.vue
-->
<template>
  <div class="goods-sku">
    <dl v-for="item in goods.specs" :key="item.id">
      <dt>{{item.name}}</dt>
      <dd>
        <template v-for="val in item.values" :key="val.name">
        <img @click="clickSpecs(item,val)" v-if="val.picture" :class="{selected:val.selected,disabled:val.disabled}" :src="val.picture" :title="val.name">   
        <span  v-else @click="clickSpecs(item,val)" :class="{selected:val.selected,disabled:val.disabled}" > {{val.name}}</span>
          </template>
                  </dd>
    </dl>
  </div>
</template>
<script>
import powerSet from '@/vender/power-set'
const spliter='★'
//得到一个路径字典对象
const getPathMap=(skus)=>{
    //得到所有sku集和 props.goods.skus
    //从所有的sku中筛选出有效的sku
    //根据有效的sku使用power-set算法得到子集
    //根据子集路径字典对象中存储 key-value
    const pathMap={}
    skus.forEach(sku=>{
        if(sku.inventory>0){
            //计算当前有库存的sku子集
            //可选值数组
            const valueArr=sku.specs.map(val=>val.valueName)
            //可选值数组的子集
            const valueArrPowerSet=powerSet(valueArr)  
            //便利子集,往pathMap插入数据
            valueArrPowerSet.forEach(arr=>{
                //根据arr得到字符串key 约定 key是:['蓝色','美国']===>'蓝色★美国'
                const key=arr.join(spliter)
                //给pathMap加数据
                if(pathMap[key]){
                    pathMap[key].push(sku.id)
                }else{
                    pathMap[key]=[sku.id]
                }
            })
        }
    })
    return pathMap
}
const getSelectedValues=(specs)=>{
  const arr=[]
  specs.forEach(spec=>{
    //选出的按钮对象 find虽然只能查找第一个，但是每行只能点击一个，所以正好适用
    const selectedVal=spec.values.find(item=>item.selected)
    arr.push(selectedVal?selectedVal.name:undefined)
  })
  return arr
} 
//更新按钮禁用状态
const updateDisabledStatus=(specs,pathMap)=>{
  //约定每个按钮的状态有本身的disabled数据来控制
  specs.forEach((spec,i)=>{
    const selectedValues=getSelectedValues(specs)
    spec.values.forEach(val=>{
      //判断当前是否选中，是选中不用判断
      //当前的之按照顺序套入数组
      //剔除undefined
      //去路径字典中查找是否有数据，有可以点击，没有 禁用
      if(val.selected)return
      selectedValues[i]=val.name
      const key=selectedValues.filter(item=>item).join(spliter)
      val.disabled=!pathMap[key]
    })
  })
}
//默认选中
const initDefaultSelected=(goods,skuId)=>{
  //找出sku信息
  //便利每一个按钮，按钮的值和sku记录的相同则选中.
  const sku=goods.skus.find(sku=>sku.id===skuId)
  // if(sku){
  //  goods.specs.forEach((spec,i)=>{
  //   const value=sku.specs[i].valueName
  //   spec.values.forEach(item=>
  //   {  
  //     item.selected=item.name===value
  //     })
  // })
  // }
  goods.specs.forEach((item,i)=>{
    const val=item.values.find(val=>val.name===sku.specs[i].valueName)
    val.selected=true
  })
}
export default {
  name: 'GoodsSku',
  props:{
      goods:{
          type:Object,
          default:()=>({})
      },
      skuId:{
        type:String,
        default:''
      }
  },
  setup(props,{emit}){
    //组件初始化：更新按钮禁用
      const pathMap=getPathMap(props.goods.skus)
      //sku初始化选中
      initDefaultSelected(props.goods, props.skuId)
      updateDisabledStatus(props.goods.specs,pathMap)
      const clickSpecs=(item,val)=>{
        if(val.disabled)return
          if(val.selected){
              val.selected=false
          }
          else{
              item.values.forEach(res=>{
                  res.selected=false
              })
              val.selected=true
          }
          //点击按钮时：更新按钮禁用状态 
         updateDisabledStatus(props.goods.specs,pathMap)
         //选择的sku通知父组件
         const validSelectedValues=getSelectedValues(props.goods.specs).filter(v=>v)
        if(validSelectedValues.length===props.goods.specs.length){
            const skuIds=pathMap[validSelectedValues.join(spliter)]
            const sku=props.goods.skus.find(sku=>sku.id===skuIds[0])
            emit('change',{
              skuId:sku.id,
              price:sku.price,
              oldPrice:sku.oldPrice,
              inventory:sku.inventory,
              //属性名：属性值 属性名1：属性值1 后面是起始的值 p是上一个回调函数的值，c是当前的这项值 去除首尾空字符串
                specsText: sku.specs.reduce((p,c)=>`${p} ${c.name}: ${c.valueName}`,'').trim()
            })
        }
        else {
          //父组件需要根据规格判断是否完整,不完整不能加购物车
          emit('change',{})
        }
      }
      return {clickSpecs}
  }
}
</script>
<style scoped lang="less">
.sku-state-mixin () {
  border: 1px solid #e4e4e4;
  margin-right: 10px;
  cursor: pointer;
  &.selected {
    border-color: @xtxColor;
  }
  &.disabled {
    opacity: 0.6;
    border-style: dashed;
    cursor: not-allowed;
  }
}
.goods-sku {
  padding-left: 10px;
  padding-top: 20px;
  dl {
    display: flex;
    padding-bottom: 20px;
    align-items: center;
    dt {
      width: 50px;
      color: #999;
    }
    dd {
      flex: 1;
      color: #666;
      > img {
        width: 50px;
        height: 50px;
        .sku-state-mixin ();
      }
      > span {
        display: inline-block;
        height: 30px;
        line-height: 28px;
        padding: 0 20px;
        .sku-state-mixin ();
      }
    }
  }
}
</style>