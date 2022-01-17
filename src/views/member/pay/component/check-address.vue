<!--
 * @Author: your name
 * @Date: 2022-01-13 14:21:01
 * @LastEditTime: 2022-01-17 16:11:18
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \项目完整源码\rabbit\eribbit\src\views\member\pay\component.vue\check-address.vue
-->
<template>
  <div class="checkout-address">
       <div class="text">
      <div v-if="!showAddress" class="none">您需要先添加收货地址才可提交订单。</div>
      <ul v-if="showAddress">
        <li><span>收<i/>货<i/>人：</span>{{showAddress.receiver}}</li>
        <li><span>联系方式：</span>{{showAddress&&showAddress.contact.replace(/^(\d{3})\d(\d{4})/,'$1****$2')}}</li>
        <li><span>收货地址：</span>{{showAddress&&showAddress.fullLocation+showAddress.address}}</li>
      </ul>
      <a @click="openAddressEdit(showAddress)" v-if="showAddress" href="javascript:;">修改地址</a>
    </div>
    <div class="action">
      <XtxButton @click="openDialog()" class="btn">切换地址</XtxButton>
      <XtxButton class="btn" @click="openAddressEdit()">添加地址</XtxButton>
    </div>
  </div>
   <XtxDialog title="切换收货地址" v-model:visible="visibleDialog">
      <div @click="selectedAddress=item" :class="{active:selectedAddress&&selectedAddress.id===item.id}" class="text item" v-for="item in list" :key="item.id">
        <ul>
          <li><span>收<i/>货<i/>人：</span>{{item.receiver}}</li>
          <li><span>联系方式：</span>{{item.contact}}</li>
          <li><span>收货地址：</span>{{item.fullLocation+item.address}}</li>
        </ul>
      </div>
      <!-- vue3.0 仅支持v-slot+template写法 -->  
      <template v-slot:footer>
        <XtxButton @click="visibleDialog=false" type="gray" style="margin-right:20px">取消</XtxButton>
        <XtxButton @click="confirmAddress()" type="primary">确认</XtxButton>
      </template>
    </XtxDialog>
    <AddressEdit @on-success="successHandler" ref="addressEditCom"></AddressEdit>
</template>
<script>
import { ref, watch } from 'vue'
import AddressEdit from './address-edit'
export default {
  name: 'CheckoutAddress',
  components:{
    AddressEdit,
  },
    props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  emits:['change'],
   setup (props,{emit}) {
    // 显示的地址
        const selectedAddress=ref(null)
    const showAddress = ref(null)
    if (props.list.length) {
      const defaultAddress = props.list.find(item => item.isDefault === 1)
      if (defaultAddress) {
        showAddress.value = defaultAddress
      } else {
        // eslint-disable-next-line vue/no-setup-props-destructure
        showAddress.value = props.list[0]
      }
    }
    const openDialog=()=>{
      visibleDialog.value=true
      selectedAddress.value=null
    }
    const confirmAddress=()=>{
            visibleDialog.value=false
            showAddress.value=selectedAddress.value
            emit('change',showAddress.value&&showAddress.value.id)
    }
    const visibleDialog=ref(false)
    const addressEditCom=ref(null)
    const openAddressEdit=(address)=>{
      addressEditCom.value.open(address)
    }
    const successHandler=(formData)=>{
      const editAddress=props.list.find(item=>item.id===formData.id)
      if(editAddress){
         for(const key in editAddress){
           editAddress[key]=formData[key]
         }
      }else{
         const josnStr=JSON.stringify(formData)
      // eslint-disable-next-line vue/no-mutating-props
         props.list.unshift(JSON.parse(josnStr))
      }
    }
    return { showAddress,successHandler,visibleDialog,openDialog,confirmAddress,selectedAddress,openAddressEdit,addressEditCom }
  }
}
</script>
<style scoped lang="less">
.xtx-dialog {
              overflow: auto;
  .text {
    flex: 1;
    min-height: 90px;
    display: flex;
    align-items: center;
    &.item {
      border: 1px solid #f5f5f5;
      margin-bottom: 10px;
      cursor: pointer;
      &.active,&:hover {
        border-color: @xtxColor;
        background: lighten(@xtxColor,50%);
      }
      > ul {
        padding: 10px;
        font-size: 14px;
        line-height: 30px;
      }
    }
  }
}
.checkout-address {
  border: 1px solid #f5f5f5;
  display: flex;
  align-items: center;
  .text {
    flex: 1;
    min-height: 90px;
    display: flex;
    align-items: center;
    .none {
      line-height: 90px;
      color: #999;
      text-align: center;
      width: 100%;
    }
    > ul {
      flex: 1;
      padding: 20px;
      li {
        line-height: 30px;
        span {
          color: #999;
          margin-right: 5px;
          > i {
            width: 0.5em;
            display: inline-block;
          }
        }
      }
    }
    > a {
      color: @xtxColor;
      width: 160px;
      text-align: center;
      height: 90px;
      line-height: 90px;
      border-right: 1px solid #f5f5f5;
    }
  }
  .action {
    width: 420px;
    text-align: center;
    .btn {
      width: 140px;
      height: 46px;
      line-height: 44px;
      font-size: 14px;
      &:first-child {
        margin-right: 10px;
      }
    }
  }
}
</style>