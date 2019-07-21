<template>
  <div>
    <div id="slider" class="mui-slider">
      <div
        id="sliderSegmentedControl"
        class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
      >
        <div class="mui-scroll">
          <a
            :class="['mui-control-item' , item.id == 0 ? 'mui-active' : '']"
            v-for="item in categrot"
            :key="item.id"
            @click.prevent="getImages(item.id)"
          >{{ item.title }}</a>
        </div>
      </div>
    </div>

    <ul class="lazyclass">
      <li v-for="item in photolist" :key="item.id">
        <router-link :to="'/home/photoInfo' + item.id">
          <img v-lazy="item.img_url" />
          <div class="zhaiyao">
            <h1>{{ item.title }}</h1>
            <p>{{ item.zhaiyao }}</p>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import mui from "../../../lib/mui-master/dist/js/mui.js";
export default {
  data() {
    return {
      categrot: [],
      photolist: []
    };
  },
  created() {
    this.getCategroy();
    this.getImages(0);
  },
  mounted() {
    mui("header, nav").on("tap", "a", function() {
      mui.openWindow({ url: this.href });
    });
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  },
  methods: {
    getCategroy() {
      this.$http
        .get("http://www.liulongbin.top:3005/api/getimgcategory")
        .then(res => {
          if (res.body.status == 0) {
            // console.log(res.body);
            res.body.message.unshift({ title: "全部", id: 0 });
            this.categrot = res.body.message;
          } else {
            Toast("请求失败!");
          }
        });
    },
    getImages(cateId) {
      this.$http
        .get("http://www.liulongbin.top:3005/api/getimages/" + cateId)
        .then(res => {
          if (res.body.status == 0) {
            console.log(res.body);
            this.photolist = res.body.message;
          } else {
            Toast("请求失败!");
          }
        });
    }
  }
};
</script>

<style>
* {
  touch-action: pan-y;
}
.mui-slider {
  position: fixed;
  top: 40px;
  background-color: #fff;
}
.lazyclass {
  padding: 0;
  list-style: none;
  margin-top: 40px;
}
.lazyclass li {
  overflow: hidden;
  position: relative;
  margin: 5%;
  box-shadow: 0 0 15px #000;
  border-radius: 0 0 20px 20px;
  width: 90%;
  height: 100%;
}
.lazyclass li img {
  width: 100%;
  height: 100%;
  vertical-align: middle;
}
img[lazy="loading"] {
  width: 40px;
  height: 300px;
  margin: auto;
}

.lazyclass li .zhaiyao {
  position: absolute;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  max-height: 84px;
}
.lazyclass li .zhaiyao h1,
.lazyclass li .zhaiyao p {
  color: #eee;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0 10px;
  margin: 0 auto 10px;
}
.lazyclass li .zhaiyao h1 {
  font-size: 14px;
  line-height: 24px;
  white-space: nowrap;
}
.lazyclass li .zhaiyao p {
  font-size: 12px;
  line-height: 15px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
</style>