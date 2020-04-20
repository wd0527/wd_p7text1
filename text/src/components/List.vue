<template>
  <div class="list">
    <div class="wd_top">
      <ol>
        <li>综合</li>
        <li>销量</li>
        <li>新品</li>
        <li class="li" @click="listSort">
          价格&nbsp;
          <span>
            <img v-if="priceSort==1" src="../assets/img/sort1.png" alt />
            <img v-else src="../assets/img/sort2.png" alt />
          </span>
        </li>
      </ol>
    </div>

    <!-- 滚动部分 -->
    <div class="wrapper" ref="wrapper">
      <ul class="wd_con">
        <li v-for="(item,index) in list" :key="index">
          <img :src="item.pic" alt />
          <h5>{{item.title}}</h5>
          <div class="wd_bottom">
            <p>
              <span>￥</span>
              {{item.price}}
              <span class="span">￥{{item.old_price}}</span>
            </p>
            <img @click="openCart(item)" class="img" src="../assets/img/shop.png" alt />
          </div>
        </li>
      </ul>
    </div>
    <!-- <p class="p" v-if="list.length==0">暂无数据...</p> -->

    <!-- 返回顶部 -->
    <div class="wd_back" v-show="show">
      <img @click="gotoTop" src="../assets/img/top.png" alt />
    </div>
  </div>
</template>

<script>
import Bus from "../Bus";
import BScroll from "better-scroll";

export default {
  name: "List",
  data() {
    return {
      list: [],
      priceSort: 1,
      show: false
    };
  },
  mounted() {
    Bus.$on("item", data => {
      console.log(data);
      this.getList(data);
    });

    Bus.$on("scroll", () => {
      setTimeout(() => {
        this.scroll.refresh();
      }, 1000);
    });

    setTimeout(() => {
      this.scrollFn();
    }, 1000);
  },
  created() {
    this.getList("59f1e4919bfd8f3bd030eed6");
  },
  methods: {
    scrollFn() {
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(".wrapper", {
            click: true,
            scrollY: true,
            probeType: 3
          });
        } else {
          this.scroll.refresh();
        }
        this.scroll.on("scroll", pos => {
          console.log(pos.y, this.show);
          //如果下拉超过50px 就显示下拉刷新的文字
          if (pos.y <= -50) {
            this.show = true;
          } else {
            this.show = false;
          }
        });
      });
    },
    //获取数据
    getList(id) {
      this.$axios.get("../../static/json/list.json").then(res => {
        console.log(res.data.result);
        if (res.status == 200) {
          this.list = res.data.result.filter(item => {
            return item.cid == id;
          });
        }
      });
    },
    //点击显示Cart组件
    openCart(data) {
      Bus.$emit("openCart", data);
    },

    //排序
    listSort() {
      if (this.priceSort == 1) {
        this.priceSort = 2;
      } else {
        this.priceSort = 1;
      }

      this.list.sort((a, b) => {
        if (this.priceSort == 1) {
          return a.price - b.price;
        } else {
          return b.price - a.price;
        }
      });
    },

    //返回顶部
    gotoTop() {
      this.scroll.scrollTo(0, 0, 2000);
    }
  }
};
</script>
 

<style  lang="scss" scoped>
.list {
  height: 100%;
  width: 100%;
  background-color: #f1f1f1;
  .wd_top {
    background-color: #fff;
    ol {
      margin-top: 0.1rem;
      width: 60%;
      height: 0.5rem;
      display: flex;
      justify-content: space-between;
      margin-left: 0.2rem;
      .li {
        display: flex;
        img {
          display: block;
          width: 0.13rem;
          height: 0.13rem;
        }
      }
    }
  }
  .wrapper {
    // position: absolute;
    // top: 2.4rem;
    // bottom: 0.8rem;
    overflow: hidden;
    z-index: 1;
    height: 100%;
    .wd_con {
      min-height: 101%;
      display: flex;
      flex-wrap: wrap;
      li {
        width: 45%;
        background-color: #fff;
        margin-top: 0.2rem;
        margin-left: 0.2rem;
        padding: 0.1rem 0;
        img {
          width: 2rem;
          height: 2rem;
          display: block;
          margin: 0 auto;
          margin-bottom: 0.2rem;
        }
        h5 {
          width: 90%;
          font-size: 0.2rem;
          height: 0.8rem;
          margin: 0 auto;
        }
        .wd_bottom {
          width: 90%;
          height: 0.4rem;
          align-items: center;
          display: flex;
          justify-content: space-between;
          margin: 0 auto;
          p {
            width: 85%;
            color: maroon;
            font-weight: bold;
            font-size: 0.2rem;
            span :nth-of-type(1) {
              font-size: 0.12rem;
            }
            .span {
              color: #ccc;
              font-size: 0.16rem;
            }
          }
          .img {
            width: 0.22rem;
            height: 0.22rem;
            margin-top: 0.2rem;
          }
        }
      }
    }

    .p {
      padding-left: 0.2rem;
    }
  }
}
.wd_back {
  position: fixed;
  right: 0.2rem;
  top: 9rem;
  z-index: 5000;
  img {
    width: 0.5rem;
    height: 0.5rem;
  }
}
</style>
