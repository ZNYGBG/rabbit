<!--
 * @Author: your name
 * @Date: 2021-12-09 22:05:51
 * @LastEditTime: 2021-12-09 23:11:37
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \项目完整源码\rabbit\eribbit\src\views\home\components\home-panel.vue
-->
<template>
  <div class="home-panel">
    <div class="container">
      <div class="head">
        <h3>{{ title }}<small>{{ subTitle }}</small></h3>
        <!-- 右上角插槽 -->
        <slot name="right"/>
      </div>
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name:'HomePanel',
    props:{
      //标题和副标题
      title:{
        type:String,
        default:''
      },
      subTitle:{
        type:String,
        default:''
      }
  },
}
</script>

<style scoped lang='less'>
.home-panel {
  background-color: #fff;
  .head {
    padding: 40px 0;
    display: flex;
    align-items: flex-end;
    h3 {
      flex: 1;
      font-size: 32px;
      font-weight: normal;
      margin-left: 6px;
      height: 35px;
      line-height: 35px;
      small {
        font-size: 16px;
        color: #999;
        margin-left: 20px;
      }
    }
  }
}
</style>

 