<!--
 * @Author: your name
 * @Date: 2021-12-30 19:22:00
 * @LastEditTime: 2022-01-05 16:38:31
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \项目完整源码\rabbit\eribbit\src\views\login\callback.vue
-->
<template>
  <LoginHeader>联合登录</LoginHeader>
  <section class="container" v-if="isBind">
    <div class="unbind">
      <div class="loading"></div>
    </div>
  </section>
  <section class="container" v-else>
    <nav class="tab">
      <a @click="hasAccount=true" :class="{active:hasAccount===true}" href="javascript:;">
        <i class="iconfont icon-bind" />
 <span>已有小兔鲜账号，请绑定手机</span>
      </a>
      <a @click="hasAccount=false" :class="{active:!hasAccount}" href="javascript:;">
        <i class="iconfont icon-edit" />
        <span>没有小兔鲜账号，请完善资料</span>
      </a>
    </nav>
    <div class="tab-content" v-if="hasAccount">
      <CallbackBind :unionId="unionId" />
    </div>
    <div class="tab-content" v-else>
      <CallbackPatch :unionId="unionId" />
    </div>
  </section>
  <LoginFooter />
</template>

<script>
import LoginHeader from './component/login-header'
import LoginFooter from './component/login-footer.vue'
import CallbackBind from './component/callback-bind.vue'
import CallbackPatch from './component/callback-patch.vue'
import Message from  '@/components/library/message'
import QC from 'qc'
import {ref} from 'vue'
import { userQQLogin } from '@/api/user'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
export default {
  name:'LoginCallback',
  components:{
    LoginHeader,
    LoginFooter,
    CallbackBind,
    CallbackPatch
  },
  setup(){
    const unionId=ref(null)
    const isBind=ref(true)
    const store=useStore()
    const router=useRouter()
    const hasAccount=ref(true)
    if(QC.Login.check()){
      QC.Login.getMe((openId)=>{
        unionId.value=openId
        userQQLogin(openId).then(data=>{
        const { id, account, avatar, mobile, nickname, token}=data.result
        store.commit('user/setUser',{ id, account, avatar, mobile, nickname, token})
         store.dispatch('cart/mergeLocalCart').then(()=>{
                   router.push(store.state.user.redirectUrl)
        Message({type:'success',text:'QQ登陆成功'})})
        }).catch(e=>{
        isBind.value=false
      })
      })
    }
    return{hasAccount,isBind,unionId}
  }
}
</script>

<style scoped lang='less'>
.container {
  padding: 25px 0;
  position: relative;
  height: 730px;  
 .unbind {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    padding: 25px 0;
    z-index: 99;
    .loading {
      height: 100%;
      background: #fff url(../../assets/images/load.gif) no-repeat center / 100px 100px;
    }
  }
}
.tab {
  background: #fff;
  height: 80px;
  padding-top: 40px;
  font-size: 18px;
  text-align: center;
  a {
    color: #666;
    display: inline-block;
    width: 350px;
    line-height: 40px;
    border-bottom: 2px solid #e4e4e4;
    i {
      font-size: 22px;
      vertical-align: middle;
    }
    span {
      vertical-align: middle;
      margin-left: 4px;
    }
    &.active {
      color: @xtxColor;
      border-color: @xtxColor;
    }
  }
}
.tab-content {
  min-height: 600px;
  background: #fff;
}
</style>