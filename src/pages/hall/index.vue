<!--
 * @Description: 大厅 
 * @Author: chenchen
 * @Date: 2019-06-25 15:53:43
 * @LastEditTime: 2019-06-27 13:39:20
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
      <i
       class="iconfont iconicon-test12"
      />
      <span>推荐机手</span>
    </div>
    <!-- 列表 -->
    <div class="list-c">
      <div
        v-for="(item, index) in items"
        :key="index"
        class="item-b"
      >
        <header class="hall-item-header">
            
          <image
            :src="item.avatar"
            class="avatar"
          />

          <div class="header-right">
            <div class="h-r-t">{{item.title}}</div>
            <div class="h-r-b">
              <div>{{item.man}}</div>
              <div class="price-b">
                <span class="price">{{item.price}}</span>
                <span class="unit">元/亩</span>
              </div>
            </div>
          </div>
        </header>

        <section class="desc">
            <div>
                {{item.desc}}
            </div>
        </section>
        <footer class="location-b">
            <div class="location">
                
            </div>
            <div>
                <span>{{item.distance}}</span>
                <span>公里</span>
            </div>
        </footer>
      </div>
    </div>
  </div>
</template>
<script>
import api from "@/http/api/api.js";
import store from "../../store";

export default {
  data() {
    return {
      items: [
        {
          avatar: "/static/images/iconDefault.png",
          title: "水稻全喂入收获",
          man: "机手王",
          isVertify: true,
          price: 65.0,
          desc:
            "本社有10台先进收割机麦豆玉米高粱水稻等收，寻求种植大户，欢迎各位老板合作",
          distance: "292.75",
          province: "安徽",
          city: "阜阳",
          region: "xxx"
        }
      ]
    };
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
.recommend {
  background: #eee;
  height: 35px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.icon {
  height: 17px;
  width: 17px;
  margin-left: 16px;
  margin-right: 9px;
  color: #333333;
}

.list-c {
  .item-b {
      background-color: #fff;
    .hall-item-header {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding: 12.3px 16px 11.3px;
      .avatar {
        height: 40px;
        width: 40px;
        // margin-left: 16px;
        margin-right: 9px;
        color: #333333;
      }
      .header-right {
          display: flex;
          flex-direction: column;
          flex: 1;
          .h-r-b{
              display: flex;
              justify-content: space-between;
              align-items: center;
              .price-b{
                //   margin-right: 16px;
                  .price{
                      color: #EC2323;
                      font-size: 15px;
                  }
                  .unit{

                  }
              }
          }
      }
    }
    .desc{
        margin: 0px 16px 10.7px;
    }
    .location-b{
        border-top: 1px solid #999
    }
  }
}
</style>

