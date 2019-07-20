<template>
  <div class="cmt-container">
    <h3>发表评论</h3>
    <hr />
    <textarea placeholder="请输入要BB的内容（做多吐槽120字）" maxlength="120" v-model="msg"></textarea>

    <mt-button type="primary" size="large" @click='postComments'>发表评论</mt-button>

    <div class="cmt-list" v-for="(item,i) in comment" :key="i">
      <div class="cmt-item">
        <div class="cmt-title">第{{i+1}}楼&nbsp;&nbsp;用户：{{item.user_name}}&nbsp;&nbsp;发表时间：{{item.add_time}}</div>
        <div class="cmt-body">{{item.content == "undefined" ? "此用户很懒，没有添加任何评论" : item.content}}</div>
      </div>
    </div>

    <mt-button type="danger" size="large" plain @click=getMore>加载更多</mt-button>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      pageindex: 1,
      comment: [],
      msg: ""
    };
  },
  created() {
    this.getComments();
  },
  methods: {
    getComments() {
      this.$http
        .get(
          "http://www.liulongbin.top:3005/api/getcomments/" +
            this.id +
            "?pageindex=" +
            this.pageindex
        )
        .then(res => {
          if (res.body.status === 0) {
            console.log(res.body);
            this.comment = this.comment.concat(res.body.message);
          } else {
            Toast("错误");
          }
        });
    },
    getMore() {
        this.pageindex++
        this.getComments()
    },
    postComments() {
        if(this.msg.trim() == "") {
            return Toast("输入的内容不能为空")
        }
        this.$http.post("http://www.liulongbin.top:3005/api/postcomment/" + this.id,{
            content:this.msg.trim()
        })
        .then(res => {
            if(res.body.status == 0) {
                // console.log(res.body);
                var cmt = {
                    user_name: "Q同学",
                    add_time: Date.now(),
                    content: this.msg.trim()
                };
                this.comment.unshift(cmt);
                this.msg = ""
            } 
        })
    }
  },
  props: ["id"]
};
</script>

<style>
.cmt-container h3 {
  font-size: 18px;
}
.cmt-container textarea {
  font-size: 14px;
  height: 85px;
  margin: 0;
}
.cmt-container .cmt-list {
  margin: 5px 0;
}
.cmt-container .cmt-list .cmt-item {
  font-size: 13px;
}
.cmt-container .cmt-list .cmt-title {
  line-height: 30px;
  background-color: #ccc;
}
.cmt-container .cmt-list .cmt-body {
  line-height: 35px;
  text-indent: 2em;
}
</style>