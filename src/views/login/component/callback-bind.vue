<!--
 * @Author: your name
 * @Date: 2021-12-31 14:23:53
 * @LastEditTime: 2022-01-05 16:40:04
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \项目完整源码\rabbit\eribbit\src\views\login\component\callback-bind.vue
-->
<template>
  <Form ref="formCom" :validation-schema="mySchema" v-slot="{errors}" class="xtx-form" autocomplete="off">
    <div class="user-info">
      <img :src='avatar' alt="" />
      <p>Hi，{{nickName}} 欢迎来小兔鲜，完成绑定后可以QQ账号一键登录哦~</p>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-phone"></i>
        <Field :class="{err:errors.mobile}" name="mobile" v-model="form.mobile" class="input" type="text" placeholder="绑定的手机号" />
      </div>
      <div v-if="errors.code" class="error">{{errors.mobile}}</div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-code"></i>
        <Field :class="{err:errors.code}" name="code" v-model="form.code" class="input" type="text" placeholder="短信验证码" />
        <span @click="send" class="code">{{time===0?'发送验证码':`${time}秒后发送`}}</span>
      </div>
      <div v-if="errors.code" class="error">{{errors.code}}</div>
    </div>
    <a @click="submit()"  href="javascript:;" class="submit">立即绑定</a>
  </Form>
</template>

<script>
import QC from 'qc'
import {reactive, ref,onUnmounted} from 'vue'
import {Form,Field} from 'vee-validate'
import schema from '@/utils/vee-validate-schema'
import {userQQBindCode,userQQBindLogin} from '@/api/user'
import { useIntervalFn } from '@vueuse/core'
import Message from '@/components/library/message'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
export default {
  name: 'CallbackBind',
  props:{
    unionId:{
      type:String,
      default:''
    }
  },
  components:{
    Form,
    Field
  },
  setup(props){

    const nickName=ref(null)
    const avatar=ref(null)
    const form=reactive({
      mobile:'',
      code:''
    })
    const mySchema={
      mobile:schema.mobile,
      code:schema.code
    }
    if(QC.Login.check()){
      QC.api('get_user_info').success(res=>{
        avatar.value=res.data.figureurl_1
        nickName.value = res.data.nickname
      })
    }
    const formCom=ref(null)
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
        const valid=mySchema.mobile(form.mobile)
        if(valid===true){
          //通过
          if(time.value===0){
              await userQQBindCode(form.mobile)
          Message({type:'success',text:'获取成功'})
          time.value=60
          resume()
          }
        }else{
        //失败 vee函数所带 setFieldError(字段，错误信息)
        formCom.value.setFieldError('mobile',valid)
        }
      }
    const store=useStore()
    const router=useRouter()
      const submit = async () => {
      const valid=await formCom.value.validate()
      if (valid) {
        userQQBindLogin({
          unionId: props.unionId,
          ...form
        }).then(data => {
          // 实现和之前登录一样的逻辑
          // 1. 存储用户信息
          const { id, account, avatar, mobile, nickname, token } = data.result
          store.commit('user/setUser', { id, account, avatar, mobile, nickname, token })
           store.dispatch('cart/mergeLocalCart').then(()=>{
          // 2. 跳转到来源页或者首页
          router.push(store.state.user.redirectUrl)
          // 3. 成功提示
          Message({ type: 'success', text: 'QQ完善信息成功' })})
        }).catch(e => {
          Message({ type: 'error', text: '完善信息失败' })
        })
      }
    }
    return {nickName,avatar,form,mySchema,send,time,submit}
  }
}
</script>

<style scoped lang='less'>
.user-info {
    width: 320px;
    height: 70px;
    margin: 0 auto;
    display: flex;
    background: #f2f2f2;
    align-items: center;
    padding: 0 10px;
    margin-bottom: 25px;
    img {
      background: #f2f2f2;
      width: 50px;
      height: 50px;
    }
    p {
      padding-left: 10px;
    }
  }
  .code {
    position: absolute;
    right: 0;
    top: 0;
    line-height: 50px;
    width: 80px;
    color: #999;
    &:hover {
      cursor: pointer;
    }
  }
</style>