/*
 * @Author: your name
 * @Date: 2022-01-04 20:01:41
 * @LastEditTime: 2022-01-04 20:01:42
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \项目完整源码\rabbit\eribbit\src\components\library\confirm.js
 */
import XtxConfirm from '@/components/library/xtx-confirm'
import { createVNode, render } from 'vue'
const div = document.createElement('div')
div.setAttribute('class', 'xtx-confirm-container')
document.body.appendChild(div)

export default ({ title, text }) => {
    return new Promise((resolve, reject) => {
        const submitCallback = () => {
            render(null, div)
            resolve()
        }
        const cancelCallback = () => {
            render(null, div)
            reject(new Error('点击取消'))
        }
        const vnode = createVNode(XtxConfirm, { title, text, submitCallback, cancelCallback })
        render(vnode, div)
    })
}