/*
 * @Author: your name
 * @Date: 2021-12-25 21:20:12
 * @LastEditTime: 2021-12-25 21:20:12
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \项目完整源码\rabbit\eribbit\src\components\library\message.js
 */
//提供一个能够显示xtx-message组件的函数
//导入直接使用也可以挂载在vue实力原型上
//import Message from 'message.js' 使用 message（{type:'error,text:'提示文字'})
import { createVNode, render } from 'vue'
import XtxMessage from './xtx-message.vue'

const div = document.createElement('div')
div.setAttribute('class', 'xtx-message-container')
document.body.append(div)
    //定时器标识
let timer = null
export default ({ type, text }) => {
    const vnode = createVNode(XtxMessage, { type, text })
        //vnode相当于在内存中
    render(vnode, div)
    clearTimeout(timer)
    timer = setTimeout(() => {
        render(null, div)
    }, 3000)
}