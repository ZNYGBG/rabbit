<!--
 * @Author: your name
 * @Date: 2021-12-12 17:45:44
 * @LastEditTime: 2021-12-12 22:26:26
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \项目完整源码\rabbit\eribbit\src\components\library\xtx-bread.vue
-->
<script>
import {h} from 'vue'
export default {
  name: 'XtxBread',
  //h第一个参数 标签名字  第二个 标签属性对象 第三个参数 子节点
  //创建xtx父容器
  //获取slot插槽内容
  //去除I标签，应该有render函数创建
  //便利插槽中的item，得到动态创建的节点,最后一个item不加i标签
  //拿到所有插槽
  render(){
        const items=this.$slots.default()
        const dynamicItems=[]
        items.forEach((item,i)=>{
            dynamicItems.push(item)
              if(i<(items.length-1)){
            dynamicItems.push(h('i', { class: 'iconfont icon-angle-right' }))
              }
        })
        return h('div',{class:'xtx-bread'},dynamicItems)
  }
}
</script>

<style lang='less'>
//去除scoped使其作用到item组件
.xtx-bread{
  display: flex;
  padding: 25px 10px;
  &-item {
    a {
      color: #666;
      transition: all .4s;
      &:hover {
        color: @xtxColor;
      }
    }
  }
  i {
    font-size: 12px;
    margin-left: 5px;
    margin-right: 5px;
    line-height: 22px;
   /*  &:last-child{ 不合理
       display: none;
    }     */
  }
}
</style>