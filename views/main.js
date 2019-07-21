import Vue from "vue"

// 导入路由模块
import VueRouter from "vue-router"
Vue.use(VueRouter)

// 导入mint-ui模块
import Mint from "mint-ui"
import "mint-ui/lib/style.css"
Vue.use(Mint)

// 选择mint-ui中的header头部组件
// import { Header,Swipe, SwipeItem,Button,Lazyload,Toast } from 'mint-ui';
// Vue.use(Lazyload);
// Vue.component(Header.name, Header);
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
// Vue.component(Button.name, Button);

// 导入mui库，字体库
import "../lib/mui-master/dist/css/mui.css"
import "../lib/mui-master/dist/css/icons-extra.css"

// 导入app组件
import app from "./app.vue"

// 引入路由
import router from "./router.js"

import VueResource from "vue-resource"
Vue.use(VueResource)

import VuePreview from 'vue-preview'
// defalut install
Vue.use(VuePreview)
// 创建vue实例
var vm = new Vue({
    el: "#app",
    render: c => c(app), // 渲染页面
    router 
})