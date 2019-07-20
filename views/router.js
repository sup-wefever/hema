// 导入路由模块
import VueRouter from "vue-router"

// 导入tabar组件
import HomeContainer from "./components/tabar/HomeContainer.vue"
import MemberContainer from "./components/tabar/MemberContainer.vue"
import SearchContainer from "./components/tabar/SearchContainer.vue"
import ShopcarContainer from "./components/tabar/ShopcarContainer.vue"


import newsList from "./components/news/newsList.vue"
import newsInfo from "./components/news/newsinfo.vue"
import photoList from "./components/photos/photoList.vue"
// 创建路由实例
var router = new VueRouter({
    routes: [
        {path:"/", redirect: "/home"},
        {path: "/home", component: HomeContainer},
        {path: "/member", component: MemberContainer},
        {path: "/shopcar", component: ShopcarContainer},
        {path: "/search", component: SearchContainer},
        {path: "/home/newsList", component: newsList},
        {path: "/home/newsInfo:id", component: newsInfo},
        {path: "/home/photoList", component: photoList}
    ],
    linkActiveClass: "mui-active"
})

// 暴露路由文件
export default router