<template>
  <div class="photoinfo-container">
    <!-- 大标题 -->
    <h3 class="title">{{ photoinfo.title }}</h3>
    <!-- 子标题 -->
    <p class="subtitles">
      <span>发表时间：{{ photoinfo.add_time }}</span>
      <span>点击：{{ photoinfo.click }}次</span>
    </p>
    <hr />
    <!-- 内容区域 -->
    <div class="thum-pic">
      <vue-preview :slides="images"></vue-preview>
    </div>
    <div class="content" v-html="photoinfo.content"></div>
    <!-- 评论子组件区域 -->
    <comment-box :id="this.id"></comment-box>
  </div>
</template>

<script>
import comment from "../subcomponents/comment.vue";

export default {
  data() {
    return {
      id: this.$route.params.id,
      photoinfo: [],
      images: []
    };
  },
  created() {
    this.getPhotoInfo();
    this.getImges()
  },
  methods: {
    getPhotoInfo() {
      this.$http
        .get("http://www.liulongbin.top:3005/api/getimageInfo/" + this.id)
        .then(res => {
          if (res.body.status == 0) {
            this.photoinfo = res.body.message[0];
            // console.log(this.photoinfo);
          }
        });
    },
    getImges() {
        this.$http.get("http://www.liulongbin.top:3005/api/getthumimages/" + this.id)
        .then(res => {
            if(res.body.status == 0) {
                this.images = res.body.message
                this.images.forEach(item => {
                    item.w = 600
                    item.h = 400
                    item.msrc = item.src
                })
            }
        })
    }
  },
  components: {
    "comment-box": comment
  }
};
</script>

<style scope>
.photoinfo-container {
  padding: 0 4px;
}
.photoinfo-container .title {
  font-size: 16px;
  text-align: center;
  margin: 15px 0;
  color: #26a2ff;
}
.photoinfo-container .subtitles {
  font-size: 13px;
  color: #226aff;
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
}
.photoinfo-container .content {
  font-size: 14px;
  text-indent: 2em;
  padding: 0 10px;
  color: #8f8f94;
}
.thum-pic .my-gallery {
    display: flex;
    flex-wrap: wrap
}
figure {
    margin: 0 5px 0 0;
    width: 31.9%;
}
.thum-pic .my-gallery img {
    width: 100%;
}
</style>