<template>
  <div class="goodsList">
    <ul>
      <li class="goods" v-for="item in goodsList" :key="item.id">
        <img
          :src="item.img_url"
          class="goods-img"
        />
        <h3>{{item.title}}</h3>
        <div class="goodsInfo">
          <p class="goodsInfo-price">
            <span>￥{{item.sell_price}}</span>
            <del>￥{{item.market_price}}</del>
          </p>
          <p class="goodsInfo-number">
            <span>热卖中</span>
            <span>剩{{item.stock_quantity}}件</span>
          </p>
        </div>
      </li>
      <!-- <li class="goods">
        <img
          src="http://img1.imgtn.bdimg.com/it/u=3942498888,3731518763&fm=26&gp=0.jpg"
          class="goods-img"
        />
        <h3>华为 荣耀6Plus 16G双4G版vsddsssssssssssss</h3>
        <div class="goodsInfo">
          <p class="goodsInfo-price">
            <span>￥2195</span>
            <del>￥2499</del>
          </p>
          <p class="goodsInfo-number">
            <span>热卖中</span>
            <span>剩60件</span>
          </p>
        </div>
      </li>
      <li class="goods">
        <img
          src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1938482571,2420691429&fm=27&gp=0.jpg"
          class="goods-img"
        />
        <h3>华为 荣耀6Plus 16G双4G版vsddsssssssssssss</h3>
        <div class="goodsInfo">
          <p class="goodsInfo-price">
            <span>￥2195</span>
            <del>￥2499</del>
          </p>
          <p class="goodsInfo-number">
            <span>热卖中</span>
            <span>剩60件</span>
          </p>
        </div>
      </li> -->
    </ul>
    <mt-button type="primary" size="large" @click="getMoreGoods()" id="butt">{{pageindex == 2 ? "没有更多数据了" : "点击加载"}}</mt-button>
  </div>
</template>

<script>
export default {
    data() {
        return {
            goodsList: [],
            pageindex: 1
        }
    },
    created() {
        this.getGoodsList()
    },
    // mounted() {
    // },
    methods: {
        getGoodsList() {
            
            this.$http.get("http://www.liulongbin.top:3005/api/getgoods?pageindex=" + this.pageindex)
            .then(res => {
                console.log(res.body);
                if(res.body.status == 0) {
                    this.goodsList = res.body.message
                    
                } else {
                    Toast("获取失败!");
                }
                
            })
        },
        getMoreGoods() {
            this.pageindex++

            if(this.pageindex>2) this.pageindex=2
                
            
            this.getGoodsList()
            
        }
    }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.goodsList {
  margin-top: 10px;
}
.goodsList ul {
  display: flex;
  margin: 0 10px;
  flex-wrap: wrap;
  justify-content: space-between;
}
.goodsList li {
  list-style: none;
  margin-bottom: 10px;
  width: 48%;
  box-shadow: 0 0 8px #ccc;
  /* height: 200px; */
  /* background-color: pink; */
  border: 1px solid #ccc;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.goodsList li .goods-img {
  width: 100%;
}
.goodsList li h3 {
  font-size: 14px;
  padding: 5px;
}
.goodsList li .goodsInfo {
  background-color: #eee;
  padding: 8px;
}

.goodsList li .goodsInfo .goodsInfo-price span {
  color: red;
  font-size: 16px;
  font-weight: 500;
}
.goodsList li .goodsInfo .goodsInfo-price del {
  color: #8f8f94;
  font-size: 12px;
  margin-left: 15px;
  font-weight: 500;
}
.goodsList li .goodsInfo .goodsInfo-number {
  display: flex;
  justify-content: space-between;
}
.goodsList li .goodsInfo .goodsInfo-number span {
  color: #8f8f94;
  font-size: 12px;
}
</style>