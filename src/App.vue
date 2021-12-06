<template>
  <div class="container">
   {{$store.getters.newName}}
   {{$store.getters["moduleB/newName"]}}
   <button @click="mutationsFn">mutationsFn</button>
   <button @click="actionsFn()">actionsFn</button>
  </div>
</template>

<script>
import { useStore } from 'vuex'
export default {
  name: 'Vue',
  setup () {
    const store = useStore()
    const mutationsFn = () => {
      store.commit('moduleB/updateName')
    }
    const actionsFn = () => {

    }
    return { mutationsFn, actionsFn }
  }
}
</script>

<style>

</style>
