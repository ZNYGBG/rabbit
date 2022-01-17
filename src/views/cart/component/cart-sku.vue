<!--
 * @Author: your name
 * @Date: 2022-01-05 14:12:57
 * @LastEditTime: 2022-01-05 15:45:25
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \项目完整源码\rabbit\eribbit\src\views\cart\component\cart-sku.vue
-->
<template>
 <div class="cart-sku" ref="target">
    <div class="attrs" @click="toggle()">
      <span class="ellipsis">{{attrsText}}</span>
      <i class="iconfont icon-angle-down"></i>
    </div>
      <div class="layer" v-if="visible">
      <div v-if="!goods" class="loading"></div>
      <GoodsSku @change="changeSku" v-if="goods" :skuId="skuId" :goods="goods" />
      <XtxButton @click="submit" v-if="goods" type="primary" size="mini" style="margin-left:60px">确认</XtxButton>
    </div>
  </div>
</template>
<script>
import { ref } from 'vue-demi'
import GoodsSku from '@/views/goods/component/goods-sku'
import { onClickOutside } from '@vueuse/core'
import {getSpecsAndSkus} from '@/api/cart'
export default {
  name: 'CartSku',
  components:{
      GoodsSku,
  },
  props:{
      attrsText:{type:String,
      default:''},
      skuId:{
          type:String,
          default:''
      }
  },
  setup(props,{emit}){
      const visible=ref(false)
      const goods=ref(null)
      const currSku=ref(null)
      const changeSku=(sku)=>{
          currSku.value=sku
      }
      const submit=()=>{
          if(currSku.value&&currSku.value.skuId&&currSku.value!==props.skuId){
              emit('change',currSku.value)
              hide()
          }
      }
      const show=()=>{
                     visible.value=true
           getSpecsAndSkus(props.skuId).then( data=> goods.value=data.result)
           }
      const hide=()=>{visible.value=false
      goods.value=null}
      const toggle=()=>{visible.value?hide():show()}
      const target=ref(null)
      onClickOutside(target,()=>{hide()})
      return {toggle,visible,target,goods,changeSku,submit}
  }
}
</script>
<style scoped lang="less">
.cart-sku {
  height: 28px;
  border: 1px solid #f5f5f5;
  padding: 0 6px;
  position: relative;
  margin-top: 10px;
  display:inline-block;
  .attrs {
    line-height: 24px;
    display: flex;
    span {
      max-width: 230px;
      font-size: 14px;
      color: #999;
    }
    i {
      margin-left: 5px;
      font-size: 14px;
    }
  }
  .layer {
    position: absolute;
    left: -1px;
    top: 40px;
    z-index: 10;
    width: 400px;
    border: 1px solid @xtxColor;
    box-shadow: 2px 2px 4px lighten(@xtxColor,50%);
    background: #fff;
    border-radius: 4px;
    font-size: 14px;
    padding: 20px;
    &::before {
      content: "";
      width: 12px;
      height: 12px;
      border-left: 1px solid @xtxColor;
      border-top: 1px solid @xtxColor;
      position: absolute;
      left: 12px;
      top: -8px;
      background: #fff;
      transform: scale(.8,1) rotate(45deg);
    }
    .loading {
      height: 224px;
      background: url(../../../assets/images/loading.gif) no-repeat center;
    }
  }
}
</style>