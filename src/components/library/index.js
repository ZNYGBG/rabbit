/*
 * @Author: your name
 * @Date: 2021-12-09 17:46:43
 * @LastEditTime: 2021-12-09 22:04:13
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \项目完整源码\rabbit\eribbit\src\components\library\index.js
 */
//扩展vue原有功能：全局组件，自定义指令，挂在原型方法。
/* import XtxSkeleton from './xtx-skeleton.vue'
import XtxCarousel from './xtx-carousel.vue'
import XtxMore from './xtx-more.vue'
import XtxBread from './xtx-bread.vue'
import XtxBreadItem from './xtx-bread-item.vue' */
//目录 是否加载子目录 正则
const importFn = require.context('./', false, /\.vue$/)
export default {
    install(app) {
        //在app上进行扩展，component directive
        //挂在原型，app.config,gkibakOrioertues 方式.
        /*     app.component(XtxSkeleton.name, XtxSkeleton)
            app.component(XtxCarousel.name, XtxCarousel)
            app.component(XtxMore.name, XtxMore)
            app.component(XtxBread.name, XtxBread)
            app.component(XtxBreadItem.name, XtxBreadItem) */
        importFn.keys().forEach((path) => {
                //导入组件
                const component = importFn(path).default
                app.component(component.name, component)
            })
            //定义指令
        defineDirective(app)
    }
}
//定义指令
import defaultImg from '@/assets/images/201.png'
const defineDirective = (app) => {
    //图片懒加载 v-lazy
    app.directive('lazy', {
        //配置选项
        //原理：先存储地址，当图片进入可视区，才将图片存储地址设置给src
        //vue2中 inserted vue3中mounted
        mounted(el, binding) {
            const observe = new IntersectionObserver(([{ isIntersecting }]) => {
                if (isIntersecting) {
                    //停止观察 binding.value就是指令的值
                    observe.unobserve(el)
                    el.onerror = () => {
                        el.src = defaultImg
                    }
                    el.src = binding.value
                }
            }, {
                threshold: 0
            })
            observe.observe(el)
        }
    })
}