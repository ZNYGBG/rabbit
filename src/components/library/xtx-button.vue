<!--
 * @Author: your name
 * @Date: 2021-12-22 17:19:56
 * @LastEditTime: 2021-12-22 17:22:19
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \项目完整源码\rabbit\eribbit\src\components\library\xtx-button.vue
-->
<template>
  <button class="xtx-button ellipsis" :class="[size,type]">
    <slot></slot>
  </button>
</template>
<script>
export default {
  name: 'XtxButton',
  props: {
    size: {
      type: String,
      default: 'middle'
    },
    type: {
      type: String,
      default: 'default'
    }
  }
}
</script>
<style scoped lang="less">
.xtx-button {
  appearance: none;
  border: none;
  outline: none;
  background: #fff;
  text-align: center;
  border: 1px solid transparent;
  border-radius: 4px;
  cursor: pointer;
}
.large {
  width: 240px;
  height: 50px;
  font-size: 16px;
}
.middle {
  width: 180px;
  height: 50px;
  font-size: 16px;
}
.small {
  width: 100px;
  height: 32px;
  font-size: 14px;  
}
.mini {
  width: 60px;
  height: 32px;
  font-size: 14px;  
}
.default {
  border-color: #e4e4e4;
  color: #666;
}
.primary {
  border-color: @xtxColor;
  background: @xtxColor;
  color: #fff;
}
.plain {
  border-color: @xtxColor;
  color: @xtxColor;
  background: lighten(@xtxColor,50%);
}
.gray {
  border-color: #ccc;
  background: #ccc;;
  color: #fff;
}
</style>