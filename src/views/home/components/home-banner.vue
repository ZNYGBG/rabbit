<!--
 * @Author: your name
 * @Date: 2021-12-09 19:50:39
 * @LastEditTime: 2021-12-09 21:04:14
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \项目完整源码\rabbit\eribbit\src\views\home\components\home-banner.vue
-->
<template>
  <div class="home-banner">
    <XtxCarousel  :sliders="sliders" autoPlay ></XtxCarousel>
  </div>
</template>
<script>
import {ref} from 'vue'
import {findBanner} from '@/api/home'
export default {
  name: 'HomeBanner',
   setup () {
    const sliders = ref([])
    findBanner().then(data => {
      sliders.value = data.result
    })
    return { sliders }
  }
}
</script>
<style scoped lang="less">
.home-banner {
  width: 1240px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98
}
.xtx-carousel {
  ::v-deep .carousel-btn.prev {
    left: 270px;
  }
  ::v-deep .carousel-indicator {
    padding-left: 250px;
  }
}
</style>