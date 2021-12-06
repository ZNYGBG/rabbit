<!--
 * @Author: your name
 * @Date: 2021-12-06 19:45:06
 * @LastEditTime: 2021-12-06 22:24:58
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \项目完整源码\rabbit\eribbit\src\App.vue
-->
<template>
  <div>
    App
    <div>
      {{$store.state.username}}
      {{$store.getters.newName}}
    </div>
          <button @click="mutationsFn">修改名字</button>
  </div>
</template>
<script>
import {useStore} from 'vuex'
export default {
  name:'App',
  setup() { 
    const store=useStore()
    console.log(store.getters.newName);
    const mutationsFn=()=>{ 
      store.dispatch('updateName')
    }
    return {mutationsFn}
  },
}
</script>