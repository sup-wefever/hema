<template>
  <div>
    <ul class="mui-table-view">
      <li class="mui-table-view-cell mui-media" v-for="item in lists" :key="item.id">
        <router-link :to="'/home/newsInfo' + item.id">
          <img
            class="mui-media-object mui-pull-left"
            :src="item.img_url"
          />
          <div class="mui-media-body">
            <h1>{{item.title}}</h1>
            <p class="mui-ellipsis">
              <span>发表日期：{{item.add_time}}</span>
              <span>点击次数：{{item.click}}次</span>
            </p>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import {Toast} from "mint-ui"
export default {
    data() {
        return {
            lists: []
        }
    },
    created() {
        this.getNewsList()
    },
    methods: {
        getNewsList() {
            this.$http.get("http://www.liulongbin.top:3005/api/getnewslist")
            .then(res => {
                console.log(res.body);
                if(res.body.status === 0) {
                    this.lists = res.body.message
                } else {
                    Toast("获取失败!")
                }
            })
        }
    }
};
</script>

<style>

    .mui-media-body h1 {
        font-size: 14px;
    }

    .mui-media-body .mui-ellipsis {
        display: flex;
        justify-content: space-between
    }

    .mui-media-body .mui-ellipsis span {
        font-size: 10px;
    }
</style>