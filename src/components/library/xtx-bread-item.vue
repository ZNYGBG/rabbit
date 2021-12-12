<!--
 * @Author: your name
 * @Date: 2021-12-12 19:50:45
 * @LastEditTime: 2021-12-12 21:50:06
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \项目完整源码\rabbit\eribbit\src\components\library\xtx-bread-item.vue
-->
<template>
  <div class="xtx-bread-item">
      <RouterLink v-if="to" :to="to"><slot  /></RouterLink>
      <span v-else><slot /></span>
    </div>
</template>

<script>
export default {
  name:'XtxBreadItem',
  props:{
      to:{
          type:[String,Object],
      }
  }
}
</script>

<style>

</style>