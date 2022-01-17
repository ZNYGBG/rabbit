<!--
 * @Author: your name
 * @Date: 2021-12-25 15:40:13
 * @LastEditTime: 2022-01-05 16:30:22
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \项目完整源码\rabbit\eribbit\src\views\login\component\login-form.vue
-->
<template>
  <div class="account-box">
    <div class="toggle">
      <a @click="isMsgLogin=false" href="javascript:;" v-if="isMsgLogin">
        <i class="iconfont icon-user"></i> 使用账号登录
      </a>
      <a @click="isMsgLogin=true" href="javascript:;" v-else>
        <i class="iconfont icon-msg"></i> 使用短信登录
      </a>
    </div>
    <Form ref="formCom" :validation-schema="schema" v-slot="{errors}"  class="form" autocomplete="off">
      <template v-if="!isMsgLogin">
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-user"></i>
            <Field :class="{error:errors.account}" v-model="form.account" name="account" type="text" placeholder="请输入用户名" />
          </div>
          <div v-if="errors.account" class="error"><i class="iconfont icon-warning" />{{errors.account}}</div>
        </div>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-lock"></i>
            <Field v-model="form.password" name="password" type="password" placeholder="请输入密码" />
          </div>
          <div v-if="errors.password" class="error"><i class="iconfont icon-warning" />{{errors.password}}</div>
        </div>
      </template>
      <template v-else>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-user"></i>
            <Field v-model="form.mobile" name="mobile" type="text" placeholder="请输入手机号" />
          </div>
          <div v-if="errors.mobile" class="error"><i class="iconfont icon-warning" />{{errors.mobile}}</div>
        </div>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-code"></i>
            <Field v-model="form.code" type="password" name="code" placeholder="请输入验证码" />
            <span class="code" @click="send">{{time===0?'发送验证码':`${time}`}}</span>
          </div>
          <div v-if="errors.code" class="error"><i class="iconfont icon-warning" />{{errors.code}}</div>
        </div>
      </template>
      <div class="form-item">
        <div class="agree">
          <Field as="XtxCheckbox" name="isAgree" v-model="form.isAgree" />
          <span>我已同意</span>
          <a href="javascript:;">《隐私条款》</a>
          <span>和</span>
          <a href="javascript:;">《服务条款》</a>
        </div>
        <div v-if="errors.isAgree" class="error"><i class="iconfont icon-warning" />{{errors.isAgree}}</div>
      </div>
      <a @click="login" href="javascript:;" class="btn">登录</a>
    </Form>
    <div class="action">
      <a href="https://graph.qq.com/oauth2.0/authorize?client_id=100556005&response_type=token&scope=all&redirect_uri=http%3A%2F%2Fwww.corho.com%3A8080%2F%23%2Flogin%2Fcallback">
            <img src="https://qzonestyle.gtimg.cn/qzone/vas/opensns/res/img/Connect_logo_7.png" alt="">
          </a>
      <div class="url">
        <a href="javascript:;">忘记密码</a>
        <a href="javascript:;">免费注册</a>
      </div>
    </div>
  </div>
</template>

<script>
import { onUnmounted, reactive, ref, watch} from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import {Form,Field} from 'vee-validate'
import myschema from '@/utils/vee-validate-schema'
import Message from '@/components/library/message'
import {userAccountLogin} from '@/api/user'
import {userMobileLogin,userMobileLoginMsg}from '@/api/user'
import { useIntervalFn } from '@vueuse/core'
export default {
  name:'LoginForm',
  components:{
    Form,
    Field
  },
  setup(){

      const isMsgLogin=ref(false)
      const form=reactive({
          isAgree:true,
          account:null,
          password:null,
          mobile:null,
          code:null
          })
      const schema={
        account:myschema.account,
        password:myschema.password,
        mobile:myschema.mobile,
        code:myschema.code,
        isAgree:myschema.isAgree
      }
      const formCom=ref(null)
      watch(isMsgLogin,()=>{
          //充值数据  清楚校验结果
          form.isAgree=true
          form.account=null
          form.password=null
          form.mobile=null
          form.code=null
          //如果没有销毁field组件，之前校验果果不会消失
          formCom.value.resetForm()
      })
                  // 使用store
    const store = useStore()
    // 使用router
    const router = useRouter()
    // 使用route
    const route = useRoute()
      const login=async ()=>{
      //Form组件提供validate整体校验 返回的是promise
         /* Message({type:'error',text:'用户名或密码错误'}) */
          //1.准备一个API做账号登陆
          //2.调用API函数
          //3.成功：跳转来源页或者首页
          //4.失败：消息提示
          const valid=await formCom.value.validate()
          if(valid){
            try{
              let data=null
                if(isMsgLogin.value)
            {
                const {mobile,code}=form
                data=await userMobileLogin({mobile,code})
            }else{ const {account,password} =form
          data=await userAccountLogin({account,password})
          }
           const {id,account,avatar,mobile,nickname,token}=data.result
           console.log({id,account,avatar,mobile,nickname,token});
          store.commit('user/setUser', { id, account, avatar, mobile, nickname, token })
          store.dispatch('cart/mergeLocalCart').then(()=>{
                      router.push(route.query.redirectUrl ||'/')
          Message({type:'success',text:'登陆成功'})
          })
            }
           catch(e){
             if(e.response.data)
             Message({type:'error',text:e.response.data.message||'登陆失败'})
           }
      }}
      const time=ref(0)
      const {pause,resume}=useIntervalFn(()=>{
       time.value--
       if(time.value<=0)
       pause()
      },1000,false)
      onUnmounted(()=>{
        pause()
      })
      const send=async()=>{
        const valid=myschema.mobile(form.mobile)
        if(valid===true){
          //通过
          if(time.value===0){
              await userMobileLoginMsg(form.mobile)
          Message({type:'success',text:'获取成功'})
          time.value=60
          resume()
          }
        }else{
        //失败 vee函数所带 setFieldError(字段，错误信息)
        formCom.value.setFieldError('mobile',valid)
        }
      }
      //vee-validate 校验基本步骤
      //导入 from field 将form和input替换加上name
      //field需要数据绑定
      //定义name属性指定的校验规则函数 Form 的validation-shcema
      //自定义组件需要先支持v-model然后Field as绑定组件名称
      // onMounted(()=>{
      //    QC.Login({
      //      btnId:"qqLoginBtn"
      //    })
      // })
      return {isMsgLogin,form,schema,send,formCom,login,time}
  }
}
</script>

<style scoped lang="less">
.account-box {
  .toggle {
    padding: 15px 40px;
    text-align: right;
    a {
      color: @xtxColor;
      i {
        font-size: 14px;
      }
    }
  }
  .form {
    padding: 0 40px;
    &-item {
      margin-bottom: 28px;
      .input {
        position: relative;
        height: 36px;
        > i {
          width: 34px;
          height: 34px;
          background: #cfcdcd;
          color: #fff;
          position: absolute;
          left: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 18px;
        }
        input {
          padding-left: 44px;
          border: 1px solid #cfcdcd;
          height: 36px;
          line-height: 36px;
          width: 100%;
          &.error {
            border-color: @priceColor;
          }
          &.active,&:focus {
            border-color: @xtxColor;
          }
        }
        .code {
          position: absolute;
          right: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 14px;
          background: #f5f5f5;
          color: #666;
          width: 90px;
          height: 34px;
          cursor: pointer;
        }
      }
      > .error {
        position: absolute;
        font-size: 12px;
        line-height: 28px;
        color: @priceColor;
        i {
          font-size: 14px;
          margin-right: 2px;
        }
      }
    }
    .agree {
      a {
        color: #069;
      }
    }
    .btn {
      display: block;
      width: 100%;
      height: 40px;
      color: #fff;
      text-align: center;
      line-height: 40px;
      background: @xtxColor;
      &.disabled {
        background: #cfcdcd;
      }
    }
  }
  .action {
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .url {
      a {
        color: #999;
        margin-left: 10px;
      }
    }
  }
}
</style>