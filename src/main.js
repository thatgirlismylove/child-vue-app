import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import routes from './router'

function handleMicroData() {
    //  返回主应用下发的data数据
    console.log('child-vite getData:', window.microApp?.getData())

    // 监听基座下发的数据变化
    window.microApp?.addDataListener((data) => {
        console.log('child-vite addDataListener:', data)
    })

    // 向基座发送数据
    setTimeout(() => {
        window.microApp?.dispatch({ myname: 'child-vite' }, (res) => {
            console.log('基座的返回值：', res);
        })
    }, 1000)
}

/* ----------------------分割线-umd模式--------------------- */
let app = null
let router = null
let history = null
// 将渲染操作放入 mount 函数
window.mount = (data) => {
    history = createWebHistory(window.__MICRO_APP_BASE_ROUTE__ || import.meta.env.BASE_URL)
    router = createRouter({
        history,
        routes,
    })

    app = createApp(App)
    app.use(router)
    // app.use(ElementPlus)
    // app.use(Antd)
    // app.use(ArcoVue)
    app.mount('#app')
    // 获取来自 基座应用的初始化数据
    console.log('微应用vite渲染了 -- UMD模式', data);

    handleMicroData()
}

// 将卸载操作放入 unmount 函数
window.unmount = () => {
    app && app.unmount()
    history && history.destroy()
    app = null
    router = null
    history = null
    console.log('微应用vite卸载了 -- UMD模式');
}

// 判断是否在微前端环境中 非微前端环境直接渲染
if (!window.__MICRO_APP_ENVIRONMENT__) {
    mount()
}

// <micro-app>标签的name值
console.log(
    '子应用名称：',
    window.__MICRO_APP_NAME__
);

/* ---------------------- micro-app 自定义全局事件 --------------------- */

window.onmount = (data) => {
    // throw new Error('sfsdfsf')
    console.log('子应用 window.onmount 事件', data)
}

window.onunmount = () => {
    // throw new Error('sfsdfsf')
    console.log('子应用 window.onunmount 事件')
}

// 监听keep-alive模式下的app状态
window.addEventListener('appstate-change', function (e) {
    console.log(`子应用${window.__MICRO_APP_NAME__}内部事件 keep-alive 状态：`, e.detail.appState)
})

window.addEventListener('unmount', function (e) {
    console.log(`子应用${window.__MICRO_APP_NAME__}内部unmount事件`)
})