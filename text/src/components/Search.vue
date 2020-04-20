<template>
  <div class="search">
    <!-- 头部 -->
    <div class="wd_header">
      <h3>
        <img @click='gotoList' src="../assets/img/left.png" alt />搜索
      </h3>
      <p>
        <img src="../assets/img/much.png" alt />
        <img src="../assets/img/close1.png" alt />
      </p>
    </div>

    <!-- 搜索栏 -->
    <div class="wd_search">
      <img src="../assets/img/search.png" alt />
      <input type="text" placeholder="输入关键词" v-model="msg" @input="search" @keyup.13="add1" />
      <button>取消</button>
    </div>

    <hr />

    <!-- 搜索列表 -->
    <div class="wd_box" v-show="show">
      <ul>
        <li v-for="(item,index) in arr1" :key="index" @click="add(item)">{{item.title}}</li>
      </ul>
    </div>

    <!-- 历史记录 -->
    <div class="wd_history">
      <h5>
        历史记录
        <img @click="del" src="../assets/img/lajitong.png" alt />
      </h5>
      <ul>
        <li v-for="(item,index) in arr2" :key="index">{{item}}</li>
      </ul>
    </div>

    <div class="wd_bg"></div>

    <!-- 热门搜索 -->
    <div class="wd_history">
      <h5>热门搜索</h5>
      <ul>
        <li v-for="(item,index) in hot" :key="index">{{item}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { Search } from "vant";

export default {
  name: "Search",
  data() {
    return {
      hot: [
        "飞行员夹克",
        "牛仔下身",
        "印花长袖",
        "衬衫",
        "新品上新",
        "史努比系列",
        "裤装上新",
        "针织系列",
        "春夏外套",
        "卫衣全系列"
      ],
      arr: [],
      arr1: [],
      arr2: [],
      msg: "",
      show: false
    };
  },
  components: {
    [Search.name]: Search
  },

  mounted() {
    this.$axios.get("../../static/json/list.json").then(res => {
      console.log(res.data.result);
      this.arr = res.data.result;
    });
  },
  created() {
    this.arr2 = JSON.parse(localStorage.getItem("arr")) || [];
  },
  methods: {
    //模糊搜索
    search() {
      this.show = true;
      let reg = new RegExp(this.msg);
      this.arr1 = this.arr.filter(item => {
        return reg.test(item.title);
      });
    },

    add(item) {
      this.msg = item.title;
      this.show = false;
      this.arr2.unshift(this.msg);
      this.arr2 = this.arr2.splice(0, 6);

      localStorage.setItem("arr", JSON.stringify(this.arr2));
      this.msg = "";
    },

    add1() {
      this.show = false;
      this.arr2.unshift(this.msg);
      this.arr2 = this.arr2.splice(0, 6);

      localStorage.setItem("arr", JSON.stringify(this.arr2));
      this.msg = "";
    },

    //删除
    del() {
      localStorage.removeItem("arr");
    },
    
    //返回
    gotoList(){
      this.$router.push('/list')
    }
  }
};
</script>

<style lang="scss" scoped>
.wd_header {
  width: 100%;
  padding: 0.1rem 0.2rem;
  height: 0.6rem;
  align-items: center;
  display: flex;
  justify-content: space-between;
  h3 {
    font-size: 0.22rem;
    display: flex;
    img {
      width: 0.28rem;
      height: 0.28rem;
    }
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
  position: relative;
  display: flex;
  justify-content: space-around;
  img {
    width: 0.3rem;
    height: 0.3rem;
    position: absolute;
    top: 0.1rem;
    left: 0.3rem;
  }
  input {
    width: 4.8rem;
    height: 0.5rem;
    border: none;
    background-color: #f1f1f1;
    padding-left: 0.5rem;
  }
  button {
    border: none;
    background-color: transparent;
    font-size: 0.22rem;
  }
}
.wd_history {
  width: 100%;
  padding: 0.2rem 0.2rem;
  h5 {
    font-size: 0.22rem;
    color: #666;
    img {
      width: 0.2rem;
      height: 0.2rem;
      float: right;
    }
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    li {
      padding: 0.12rem 0.2rem;
      background-color: #f1f1f1;
      margin-left: 0.1rem;
      margin-right: 0.1rem;
      margin-top: 0.2rem;
      font-size: 0.2rem;
    }
  }
}
.wd_bg {
  width: 100%;
  height: 0.2rem;
  background-color: #f1f1f1;
}
.wd_box {
  width: 100%;
  height: 10rem;
  ul {
    li {
      padding: 0.2rem;
      border-bottom: 1px #ccc solid;
      font-size: 0.2rem;
    }
  }
}
</style>