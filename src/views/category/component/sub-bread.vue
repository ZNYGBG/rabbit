<!--
 * @Author: your name
 * @Date: 2021-12-13 14:58:01
 * @LastEditTime: 2021-12-13 15:43:07
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \项目完整源码\rabbit\eribbit\src\views\category\component\sub-bread.vue
-->
<template>
 <XtxBread>
          <XtxBreadItem to="/">首页</XtxBreadItem>
          <Transition name="fade-right" mode="out-in">
          <XtxBreadItem :key="category.top.id" v-if="category.top" :to="`/category/${category.top.id}`">{{category.top.name}}</XtxBreadItem>
          </Transition>
          <Transition name="fade-right" mode="out-in">
          <XtxBreadItem :key="category.sub.id" v-if="category.sub">{{category.sub.name}}</XtxBreadItem>
          </Transition>
        </XtxBread>
</template>

<script>
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { computed } from 'vue-demi'
export default {
    name:'SubBread',
    setup(){
        const route=useRoute()
        const store=useStore()
        const category=computed(()=>{
            const cate={}
            store.state.category.list.forEach(top=>{
            if(top.children){
                const sub=top.children.find(sub=>
                    sub.id===route.params.id
                )
                if(sub){
                    cate.top={id:top.id,name:top.name}
                    cate.sub={id:sub.id,name:sub.name}
                }
            }    
            })
            return cate
        })
        return {category}
    }
}
</script>

<style>

</style>