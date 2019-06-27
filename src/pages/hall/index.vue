<!--
 * @Description: 大厅 
 * @Author: chenchen
 * @Date: 2019-06-25 15:53:43
 * @LastEditTime: 2019-06-27 09:35:31
 -->
<template>
  <div id="hall">
    <!-- banner -->
    <div class="banner">
      <image
        class="logo-img"
        src="/static/images/logo1.png"
      />
    </div>
    <!-- 地址 找机手 发需求 -->
    <div class="hall-o-c">
      <div class="hall-o-b">
        <div class="location">{{"镇江市京口区"}}</div>
        <div class="line"></div>
        <div>{{"找机手"}}</div>
        <div class="line"></div>
        <div>{{"发需求"}}</div>
      </div>
    </div>
    <!-- 推荐机手 -->
    <div class="recommend">
        <image class="icon" src="/static/images/iconDefault.png" />
    </div>
  </div>
</template>
<script>
import api from "@/http/api/api.js";
import store from "../../store";

export default {
  data() {
    return {};
  }
};
</script>

<style scoped lang="scss">
#hall {
  height: 100vh;
  font-family: PingFangSC-Medium;
  font-size: 14px;
  color: #333333;
}
.banner {
  height: 181px;
  background-color: aqua;
}
.hall-o-c {
  height: 50px;
  background: #fff;
}
.logo-img {
  height: 100%;
}
.hall-o-b {
  line-height: 50px;
  display: flex;
  justify-content: space-evenly;
}
.line {
  width: 1px;
  background: #999;
  margin: 10px 0px;
}
.recommend{
    background: #eee;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.icon{
    height: 17px;
    width: 17px;

}
</style>

