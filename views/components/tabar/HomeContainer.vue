<template>
  <div>
    <mt-swipe :auto="4000" class="mt-swipe">
      <mt-swipe-item v-for="item in sliderList" :key=item.id>
          <img :src="item.img" alt="">
      </mt-swipe-item>
    </mt-swipe>
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/newsList">
          <img src="../../images/menu1.png" alt="">
          <div class="mui-media-body">新闻资讯</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/photoList">
          <img src="../../images/menu2.png" alt="">
          <div class="mui-media-body">图片分享</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/goodsList">
          <img src="../../images/menu3.png" alt="">
          <div class="mui-media-body">商品购买</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../images/menu4.png" alt="">
          <div class="mui-media-body">留言反馈</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../images/menu5.png" alt="">
          <div class="mui-media-body">视频专区</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../images/menu6.png" alt="">
          <div class="mui-media-body">联系我们</div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import {Toast} from "mint-ui"
export default {
  data() {
      return {
          sliderList: []
      }
  },
  created() {
      this.getSliderAll()
  },
  methods: {
      getSliderAll() {
          this.$http.get("http://www.liulongbin.top:3005/api/getlunbo")
          .then(res => {
              if(res.body.status === 0) {
                  console.log(res);
                  this.sliderList = res.body.message
              } else {
                  Toast("错误")
              }
          })
      }
  }
};
</script>

<style scope>
.mt-swipe {
  height: 200px;
  /* width: 100%; */
}

.mt-swipe img {
    width: 100%;
    height: 100%;
}

.mui-grid-9 {
    border: none!important;
}

.mui-grid-9 .mui-table-view-cell {
    background: #fff!important;
    border: none!important;
}

.mui-grid-9 li {
  width: 33.333%;
}

.mui-grid-9 li img {
    width: 60px;
    height: 60px;
    
}
</style>