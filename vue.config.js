/*
 * @Author: your name
 * @Date: 2021-12-07 16:19:38
 * @LastEditTime: 2021-12-07 17:44:57
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \项目完整源码\rabbit\eribbit\vue.config.js
 */
const path = require('path')
module.exports = {
    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'less',
            patterns: [
                path.join(__dirname, './src/assets/styles/variables.less'),
                path.join(__dirname, './src/assets/styles/mixins.less')
            ]
        }
    },
    chainWebpack: config => {
        config.module
            .rule('images')
            .use('url-loader')
            .loader('url-loader')
            .tap(options => Object.assign(options, { limit: 10000 }))
        config.devServer.disableHostCheck(true)
    },
    //# 这个是设置外部扩展，模块为qc变量名为QC，导入qc将不做打包。
    configureWebpack: {
        externals: {
            qc: 'QC'
        }
    },
    // 这个是给webpack-dev-server开启可IP和域名访问权限。
}