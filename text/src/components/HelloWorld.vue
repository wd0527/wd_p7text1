<template>
  <div class="hello">
    <!-- 头部 -->
    <div class="wd_header">
      <h3>lativ诚衣</h3>
      <p>
        <img src="../assets/img/much.png" alt />
        <img src="../assets/img/close1.png" alt />
      </p>
    </div>

    <!-- 搜索栏 -->
    <div class="wd_search">
      <van-search placeholder="搜索商品" @click="gotoSearch" />
    </div>

    <!-- 头部导航 -->
    <Nav></Nav>

    <!-- 滚动部分内容 -->
    <div class="wd_con">
      <router-view />
    </div>

    <!-- 脚部 -->
    <div class="wd_footer">
      <van-tabbar>
        <van-tabbar-item icon="home-o">首页</van-tabbar-item>
        <van-tabbar-item icon="wap-nav">分类</van-tabbar-item>
        <van-tabbar-item icon="cart-o">购物车</van-tabbar-item>
        <van-tabbar-item icon="user-o">个人</van-tabbar-item>
      </van-tabbar>
    </div>

    <!-- 购物车弹框 -->
    <Cart></Cart>
  </div>
</template>

<script>
import { Search, Tabbar, TabbarItem } from "vant";
import Nav from "./Nav";
import Cart from "./Cart";

export default {
  name: "HelloWorld",
  data() {
    return {};
  },
  components: {
    [Search.name]: Search,
    Nav,
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    Cart
  },
  methods: {
    //进去搜索页面
    gotoSearch() {
      this.$router.push("/search");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
.hello {
  height: 100%;
  display: flex;
  flex-direction: column;
  .wd_con {
    flex-grow: 1;
    overflow: hidden;
  }
}

.wd_header {
  width: 100%;
  padding: 0.1rem 0.2rem;
  height: 0.6rem;
  align-items: center;
  display: flex;
  justify-content: space-between;
  h3 {
    font-size: 0.22rem;
  }
  p {
    display: flex;
    border-radius: 30px;
    border: 1px solid #ccc;
    padding: 0.08rem 0.1rem;
    img {
      width: 0.22rem;
      height: 0.22rem;
      margin-left: 0.1rem;
      margin-right: 0.1rem;
    }
  }
}
.wd_search {
  width: 100%;
  .van-search__content {
    border-radius: 40px;
  }
}
.wd_footer {
  position: relative;
  z-index: 4000;
}
.wd_top {
  position: fixed;
  right: 0.2rem;
  top: 9rem;
  img {
    width: 0.5rem;
    height: 0.5rem;
  }
}
</style>
