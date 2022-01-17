<!--
 * @Author: your name
 * @Date: 2021-12-22 15:32:24
 * @LastEditTime: 2021-12-22 16:12:26
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \项目完整源码\rabbit\eribbit\src\components\library\xtx-numbox.vue
-->
<template>
  <div class="xtx-numbox">
    <div class="label" v-if="label">{{label}}</div>
    <div class="numbox">
      <a href="javascript:;" @click="sum(-1)">-</a>
      <input type="text" readonly :value="modelValue">
      <a href="javascript:;" @click="sum(+1)">+</a>
    </div>
  </div>
</template>
<script>
import { useVModel } from '@vueuse/core'
export default {
  name: 'XtxNumbox',
  props:{
      label:{
        type:String,
        default:''  
      },
      modelValue:{
          type:Number,
          default:1
      },
      min:{
          type:Number,
          default:1
      },
      max:{
          type:Number,
          default:10
      }
  },
  setup(props,{emit}){
      const count=useVModel(props,'modelValue',emit)
      const sum=(val)=>{
          const newVal=count.value+val
          if(newVal<props.min||newVal>props.max)
          return      
               count.value=newVal
               emit('change',newVal)       
      }
      return {sum}
  }
}
</script>
<style scoped lang="less">
.xtx-numbox {
  display: flex;
  align-items: center;
  .label {
    width: 60px;
    color: #999;
    padding-left: 10px;
  }
  .numbox {
    width: 120px;
    height: 30px;
    border: 1px solid #e4e4e4;
    display: flex;
    > a {
      width: 29px;
      line-height: 28px;
      text-align: center;
      background: #f8f8f8;
      font-size: 16px;
      color: #666;
      &:first-of-type {
        border-right:1px solid #e4e4e4;
      }
      &:last-of-type {
        border-left:1px solid #e4e4e4;
      }
    }
    > input {
      width: 60px;
      padding: 0 5px;
      text-align: center;
      color: #666;
    }
  }
}
</style>