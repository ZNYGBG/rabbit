/*
 * @Author: your name
 * @Date: 2021-12-11 20:49:09
 * @LastEditTime: 2021-12-12 00:29:40
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \项目完整源码\rabbit\eribbit\src\hooks\index.js
 */
//提供复用逻辑钩子 target得是一个dom对象
import { useIntersectionObserver } from '@vueuse/core'
import { ref } from 'vue'
export const useLazyData = (apiFn) => {
    const target = ref(null)
    const result = ref([])
        // stop 是停止观察是否进入或移出可视区域的行为    
    const { stop } = useIntersectionObserver(
        // target 是观察的目标dom容器，必须是dom容器，而且是vue3.0方式绑定的dom对象
        target,
        // isIntersecting 是否进入可视区域，true是进入 false是移出
        // observerElement 被观察的dom
        ([{ isIntersecting }], observerElement) => {
            // 在此处可根据isIntersecting来判断，然后做业务
            if (isIntersecting) {
                stop()
                    //调用API获取数据
                apiFn().then(data => {
                    result.value = data.result
                })
            }
        },
        //配置选项 只要相交就触发了
        {
            threshold: 0
        }
    )
    return { target, result }
}