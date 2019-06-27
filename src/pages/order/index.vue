<template>
  <div>
    <van-tabs v-model="active">
      <van-tab title="已发布">
        <!--列表-->
        <div class="page__bd">
          <div class="weui-panel weui-panel_access">
            <!--<div class="weui-panel__hd">列表</div>-->
            <div class="weui-panel__bd">
              <block v-for="(item,index) in list" :key="index">
                <div
                  @click="jump"
                  :data-item="item"
                  class="weui-media-box weui-media-box_appmsg"
                  hover-class="weui-cell_active"
                  style="border-bottom: #F0F0F0 2px solid;"
                >
                  <div class="weui-media-box__bd weui-media-box__bd_in-appmsg">
                    <div style="flex:1;display: flex;flex-direction: column;">
                      <div class="row-item" style="line-height:34rpx;justify-content:space-between;">
                      <div class="weui-media-box__title">{{item.title}}</div>
                      <div class="weui-media-box__desc" v-if="item.isSigning">已报价：3</div>
                      </div>
                      <div class="row-item">
                        <div class="weui-media-box__desc" style="width: 300rpx;">{{item.mu}}亩 {{item.ground}}块地</div>
                        <div class="weui-media-box__desc">65.00元/亩</div>
                         <icon class="weui-icon-radio" type="success_no_circle" size="18" color="#BF0909"></icon>
                      </div>
                      <div class="height30"></div>
                      <div  class="row-item">
                        <div class="weui-media-box__desc">河北 | 唐山 | 乐亭县</div>
                       
                      </div>
                    </div>
                  </div>
                  <div class="weui-cell__ft weui-cell__ft_in-access"></div>
                </div>
              </block>

              <!--<block v-for="(item1,index1) in listArray" :key="index1" >-->
              <!--&lt;!&ndash;<navigator :url="/pages/scanCodeDetail/main">&ndash;&gt;-->
              <!--<div @click="jump" :data-item="item1" class="weui-media-box weui-media-box_appmsg" hover-class="weui-cell_active" style="border-bottom: #F0F0F0 2px solid;">-->
              <!--<div style="width: 200rpx;">-->
              <!--<div class="weui-media-box__bd weui-media-box__bd_in-appmsg">-->
              <!--<div class="weui-media-box__title">AAAA1905140002</div>-->
              <!--<div class="height30"></div>-->
              <!--&lt;!&ndash;<block  v-for="(itemNode,indexNode) in nodes" :key="indexNode">&ndash;&gt;-->
              <!--&lt;!&ndash;<div v-if='nodes[indexNode]==item1.node' class="weui-media-box__desc">AAAA1905140002</div>&ndash;&gt;-->
              <!--&lt;!&ndash;</block>&ndash;&gt;-->
              <!--&lt;!&ndash;<div class="weui-media-box__desc">{{item1.node}}</div>&ndash;&gt;-->
              <!--</div>-->
              <!--</div>-->
              <!--<div class="weui-media-box__bd weui-media-box__bd_in-appmsg">-->
              <!--<div class="weui-media-box__title">订单发起</div>-->
              <!--<div class="height30"></div>-->
              <!--<div class="weui-media-box__desc">2019-05-10 12：31：11</div>-->
              <!--</div>-->
              <!--<div class="weui-cell__ft weui-cell__ft_in-access"></div>-->
              <!--</div>-->
              <!--&lt;!&ndash;</navigator>&ndash;&gt;-->

              <!--</block>-->
            </div>
            <!--<div class="weui-panel__ft">-->
            <!--<div class="weui-cell weui-cell_access weui-cell_link">-->
            <!--<div class="weui-cell__bd">查看更多</div>-->
            <!--<div class="weui-cell__ft weui-cell__ft_in-access"></div>-->
            <!--</div>-->
            <!--</div>-->
          </div>
        </div>
      </van-tab>
      <van-tab title="已签约">内容 2</van-tab>
      <van-tab title="已完成">内容 3</van-tab>
      <van-tab title="已关闭">内容 4</van-tab>
    </van-tabs>
  </div>
</template>
<script>
import store from "../../store";
import * as types from "@/store/mutation-type";
import api from "@/http/api/api.js";
// import Tabs from '~/vant/tabs/tabs';
export default {
  data() {
    return {
      active: 1,
      list: []
    };
  },
  created() {
    this.list.push({
      title: "水稻全喂入收货",
      mu: 5000,
      ground:20,
      isSigning:true,
    },{
      title: "水稻全喂入收货3",
       mu: 5000,
      ground:20,
      isSigning:false,
    });
  },
  onLoad() {},
  onShow() {},
  methods: {
    /**
     * 获取用户信息
     */

    handleClick(e) {
      var that = this;
      const { index, title } = e.detail;
      console.log("点击了tab:" + index, title);
      that.setData({
        index1: 0
      });
      var status;
      if (index == 0) {
        that.hasorder();
      } else if (index == 1) {
        that.waitdeliever();
      } else if (index == 2) {
        that.hasdeliever();
      }
    },
    /**
     * 工种页面跳转判断
     */

    /**
     * 编辑头像图片
     */
    changeImg() {
      // const that = this;
      // wx.chooseImage({
      //     count: 1,
      //     sizeType: ['original', 'compressed'],
      //     sourceType: ['album', 'camera'],
      //     success(res) {
      //         var tempFilePaths = res.tempFilePaths;
      //         upLoad(tempFilePaths,res=>{
      //             // console.log('res',res)
      //             that.user.imgSrc = res[0];
      //         })
      //     }
      // })
    }
  }
};
</script>
<style lang="scss" scoped>
.row-item {
  flex: 1;
  display: flex;
  flex-direction: row;
  margin-top: 10rpx;
}
.height30{
  width: 100%;
  height: 1px;
  background: #eee;
  margin-top: 10rpx;
}
</style>



