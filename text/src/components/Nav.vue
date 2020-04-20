<template>
  <div class="nav">
    <van-tabs @click="gotoList">
      <van-tab :name="item._id" v-for="(item,index) in nav" :title="item.title" :key="index"></van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { Tab, Tabs } from "vant";
import Bus from "../Bus";

export default {
  name: "Nav",
  data() {
    return {
      nav: []
    };
  },
  mounted() {
    this.$axios.get("../../static/json/fenlei.json").then(res => {
      // console.log(res.data.result);
      if (res.status == 200) {
        this.nav = res.data.result;
      }
    });
  },
  methods: {
    gotoList(name) {
      this.$router.push("/list");
      Bus.$emit("item", name);

      Bus.$emit("scroll");
    }
  },
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs
  }
};
</script>

<style lang="scss" scoped>
</style>
<style>
.van-tabs__line {
  background-color: #666;
  bottom: 20px;
}
.van-search {
  padding: 0 10px;
}
</style>