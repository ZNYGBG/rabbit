<!--
 * @Author: your name
 * @Date: 2021-12-24 16:47:30
 * @LastEditTime: 2022-01-01 16:05:58
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \项目完整源码\rabbit\eribbit\src\views\login\index.vue
-->
<template>
  <LoginHeader>欢迎登录</LoginHeader>
  <section class="login-section">
     <div class="wrapper">
      <nav>
        <a @click="activeName='account'" :class="{active:activeName==='account'}" href="javascript:;">账户登录</a>
        <a @click="activeName='qrcode'" :class="{active:activeName==='qrcode'}" href="javascript:;">扫码登录</a>
      </nav>
      <!-- 表单 -->
      <div v-if="activeName==='account'" class="account-box"><LoginForm v-if="activeName==='account'"></LoginForm></div>
      <!-- 二维码 -->
      <div v-if="activeName==='qrcode'" class="qrcode-box">
        <img src="@/assets/images/qrcode.jpg" alt="">
        <p>打开 <a href="javascript:;">小兔鲜App</a> 扫码登录</p>
      </div>
    </div>
  </section>
  <LoginFooter />
</template>

<script>
import LoginHeader from './component/login-header'
import LoginFooter from './component/login-footer'
import LoginForm from './component/login-form.vue'
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
export default {
  name: 'Login',
  components: {
    LoginHeader,
    LoginFooter,
    LoginForm
  },
  setup(){
    const activeName=ref('account')
    const store=useStore()
    const route=useRoute()
    store.commit('user/setRedirectUrl',route.query.redirectUrl||'/')
    return {activeName}
  }
}
</script>

<style scoped lang='less'>
.login-section {
  background: url(../../assets/images/login-bg.png) no-repeat center / cover;
  height: 488px;
  position: relative;
  .wrapper {
    width: 380px;
    background: #fff;
    min-height: 400px;
    position: absolute;
    left: 50%;
    top: 54px;
    transform: translate3d(100px,0,0);
    box-shadow: 0 0 10px rgba(0,0,0,.15);
    nav {
      height: 55px;
      border-bottom: 1px solid #f5f5f5;
      display: flex;
      padding: 0 40px;
      text-align: right;
      align-items: center;  
      a {
        flex: 1;
        line-height: 1;
        display: inline-block;
        font-size: 18px;
        position: relative;
        &:first-child {
          border-right: 1px solid #f5f5f5;
          text-align: left;
        }
        &.active{
          color: @xtxColor;
          font-weight: bold;
        }
      }
    }
    // 二维码容器
.qrcode-box {
  text-align: center;
  padding-top: 40px;
  p {
    margin-top: 20px;
    a {
      color: @xtxColor;
      font-size: 16px;
    }
  }
}
  }
}
</style>