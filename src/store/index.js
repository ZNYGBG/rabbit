/*
 * @Author: your name
 * @Date: 2021-12-06 19:45:06
 * @LastEditTime: 2021-12-06 19:54:37
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \项目完整源码\rabbit\eribbit\src\store\index.js
 */
import { createStore } from 'vuex'
const moduleA = {
  state: {
    username: 'moduleA'
  },
  mutations: {
    updateName (state) {
      state.username = 'ModuleAAAAAA!!!'
    }
  },
  getters: {
    newName (state) {
      return state.username + '!'
    }
  }
}
const moduleB = {
  namespaced: true,
  state: {
    username: 'moduleB'
  },
  mutations: {
    updateName (state) {
      state.username = 'ModuleBBBBBB!!!'
    }
  },
  getters: {
    newName (state) {
      return state.username + '!'
    }
  }
}

export default createStore({
  modules: {
    moduleA,
    moduleB
  }
})
