<template>
  <div class="cart">
    <van-popup v-model="show" position="bottom" custom-style="height: 20%;" bind:close="onClose">
      <div class="wd_top">
        <img class="img1" :src="cart.s_pic" alt />
        <div class="wd_top_right">
          <i>
            <img @click="close" src="../assets/img/close.png" alt />
          </i>
          <h4>
            活动价￥
            <span>{{cart.price*cart.num}}</span>&nbsp;
            <span>￥{{cart.old_price}}</span>
          </h4>
          <p>春夏焕新.2件85折</p>
          <p>已选择 白色-24-26cm（均码）</p>
        </div>
      </div>
      <div class="wd_num">
        <span>购买数量</span>
        <div>
          <button @click="jian">-</button>
          <input type="text" v-model="num" />
          <button @click="jia">+</button>
        </div>
      </div>
      <div>
        <button @click="sure" class="wd_btn">确认</button>
      </div>
    </van-popup>

    <!-- 加入购物车成功提示 -->
    <div class="wd_box" v-show="show1">加入购物车成功</div>
  </div>
</template>

<script>
import { Popup } from "vant";
import Bus from "../Bus";

export default {
  name: "Cart",
  data() {
    return {
      show: false,
      show1: false,
      cart: {},
      num: 1
    };
  },
  created() {
    Bus.$on("openCart", data => {
      this.show = true;

      this.cart = data;
      this.cart.num = this.num;
    });
  },
  components: {
    [Popup.name]: Popup
  },
  methods: {
    //数量加
    jia() {
      this.num++;
      this.cart.num = this.num;
    },

    //数量减
    jian() {
      if (this.cart.num > 1) {
        this.num--;
        this.cart.num = this.num;
      } else {
        return;
      }
    },

    //点击确定按钮
    sure() {
      this.show1 = true;
      setTimeout(() => {
        this.show1 = false;
      }, 2000);

      this.show = false;
      console.log(
        "商品名称：" +
          this.cart.title +
          "，商品价格：" +
          this.cart.price * this.cart.num +
          "元" +
          "，商品数量：" +
          this.cart.num
      );
    },

    //关闭弹出页面
    close() {
      this.show = false;
    }
  }
};
</script>

<style>
.van-popup {
  width: 100%;
  height: 5rem;
  bottom: 0.8rem;
}
</style>
<style lang="scss" scoped>
.wd_top {
  position: relative;
  .img1 {
    width: 1.6rem;
    height: 1.6rem;
    border: 1px #ccc solid;
    margin: 0.2rem 0 0 0.2rem;
  }
  .wd_top_right {
    width: 60%;
    float: right;
    i {
      width: 0.3rem;
      height: 0.3rem;
      position: absolute;
      right: 0.3rem;
      top: 0.2rem;
      img {
        width: 0.3rem;
        height: 0.3rem;
      }
    }
    h4 {
      margin-top: 0.2rem;
      font-size: 0.2rem;
      color: firebrick;
      span:nth-of-type(1) {
        font-size: 0.3rem;
      }
      span:nth-of-type(2) {
        color: #ccc;
      }
    }
    p {
      font-size: 0.2rem;
      height: 0.4rem;
      line-height: 0.4rem;
    }
  }
}
.wd_num {
  width: 90%;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  margin-top: 1.6rem;
  button {
    width: 0.4rem;
    height: 0.4rem;
    border: none;
    background-color: #f1f1f1;
  }
  input {
    width: 0.4rem;
    height: 0.4rem;
    border: none;
    text-align: center;
  }
}
.wd_btn {
  margin-top: 0.4rem;
  width: 100%;
  height: 0.6rem;
  background-color: firebrick;
  color: #fff;
  text-align: center;
  line-height: 0.6rem;
  font-size: 0.26rem;
  border: none;
}
.wd_box {
  color: #fff;
  font-size: 0.3rem;
  width: 2.2rem;
  height: 2.2rem;
  line-height: 2.2rem;
  text-align: center;
  position: absolute;
  left: 33%;
  top: 40%;
  margin: auto;
  background-color: rgba($color: #000000, $alpha: 0.6);
  border-radius: 20px;
  z-index: 4000;
}
</style>