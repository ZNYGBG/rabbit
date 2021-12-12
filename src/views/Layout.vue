<!--
 * @Author: your name
 * @Date: 2021-12-06 20:14:50
 * @LastEditTime: 2021-12-07 23:02:37
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \项目完整源码\rabbit\eribbit\src\views\pay\Layout.vue
-->
<template>
  <!-- 顶部 -->
  <AppNavbar />
  <!-- 吸顶头部 -->
  <AppHeaderSticky></AppHeaderSticky>
  <!-- 头部 -->
  <AppHeader />
  <!-- 内容 -->
  <div class="app-body">
      <RouterView />
  </div>
  <!-- 底部 -->
  <AppFooter />
</template>

<script>
import AppNavbar from '@/components/app-navbar'
import AppHeader from '@/components/app-header'
import AppFooter from '@/components/app-footer'
import AppHeaderSticky from '@/components/app-header-sticky'
import { useStore } from 'vuex'
export default {
 name:'Layout', 
 components:{
   AppNavbar,
   AppHeader,
   AppFooter,
   AppHeaderSticky
 },
 setup(){
   const store=useStore()
   store.dispatch('category/getList')
 }
}
</script>

<style scoped lang="less" >
.app-body{
  min-height: 600px;
}
</style>
