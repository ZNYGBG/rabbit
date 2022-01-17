<!--
 * @Author: your name
 * @Date: 2021-12-07 17:51:34
 * @LastEditTime: 2022-01-08 15:39:54
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \项目完整源码\rabbit\eribbit\src\components\app-navbar.vue
-->
<template>
  <nav class="app-topnav">
    <div class="container">
      <ul>
          <template v-if="profile.token">
              <li><a href="javascript:;"><i class="iconfont icon-user"></i>{{profile.account}}</a></li>
        <li><a href="javascript:;" @click="logOut">退出登录</a></li>
        </template>
         <template  v-else>
            <li><router-link to="/login">请先登录</router-link></li>
        <li><a href="javascript:;">免费注册</a></li>
        </template>
        <li><a href="javascript:;">我的订单</a></li>
        <li><a href="javascript:;">会员中心</a></li>
        <li><a href="javascript:;">帮助中心</a></li>
        <li><a href="javascript:;">关于我们</a></li>
        <li><a href="javascript:;"><i class="iconfont icon-phone"></i>手机版</a></li>
      </ul>
    </div>
  </nav>
</template>
<script>
import { computed } from '@vue/reactivity'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
export default {
  name: 'AppTopnav',
  setup(){
      const store=useStore()
      const router=useRouter()
      const profile=computed(()=>{
          return store.state.user.profile
      })
      const logOut=()=>{
        store.commit('user/setUser',{})
        store.commit('cart/setCartList',[])
        router.push('/login')
      }
      return {profile,logOut}
  }
}
</script>
<style scoped lang="less">
.app-topnav {
  background: #333;
  ul {
    display: flex;
    height: 53px;
    justify-content: flex-end;
    align-items: center;
    li {
      a {
        padding: 0 15px;
        color: #cdcdcd;
        line-height: 1;
        display: inline-block;
        i {
          font-size: 14px;
          margin-right: 2px;
        }
        &:hover {
          color: @xtxColor;
        }
      }
      ~ li {
        a {
          border-left: 2px solid #666;
        }/* 波浪线选择器作用:选择当前选择器后所有节点 */
      }
    }
  }
}
</style>