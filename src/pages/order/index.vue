<template>
  <div>
    <van-tabs v-model="active">
      <van-tab title="已发布">
        <!--列表-->
        <div class="page__bd">
          <div class="weui-panel weui-panel_access">
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
                      <div
                        class="row-item"
                        style="line-height:34rpx;justify-content:space-between;"
                      >
                        <div class="weui-media-box__title">{{item.title}}</div>
                        <div class="weui-media-box__desc" v-if="item.isSigning">已报价：3</div>
                      </div>
                      <div class="row-item" style="justify-content:space-between;">
                        <div class="weui-media-box__desc" style="color:#333;">{{item.mu}}亩 {{item.ground}}块地</div>
                        <div class="weui-media-box__desc" style="color:#333;">65.00元/亩</div>
                        <span
                         
                          v-if="!item.isSigning"
                          @click="call(item.phone)"
                        ><img src="cloud://wdgd-bxkj5.7764-wdgd-bxkj5/wdgd-img/Group Copy 16.png" style="width:20px;height:20px;" alt=""> </span>
                      </div>
                      <div class="row-item">
                        <div class="weui-media-box__desc" style="display:flex;">
                          <i class="iconfont iconFillCopy" style="font-size:14px;color:#666666;"></i>
                          <span>河北 | 唐山 | 乐亭县</span>
                        </div>
                      </div>
                      <div class="height30"></div>
                      <div class="row-item" style="justify-content:space-between;">
                        <div class="weui-media-box__desc">2019-09-20 <span class="iconfont iconchufadaodaxiao" style="font-size:12rpx;color:#666;"></span> 2019-09-20</div>
                        <div class="weui-media-box__desc pending-bid" v-if="item.isSigning">待中标</div>
                        <div class="weui-media-box__desc pending-sign" v-if="!item.isSigning">等待农户签约</div>
                      </div>
                    </div>
                  </div>
                  <!-- <div class="weui-cell__ft weui-cell__ft_in-access"></div> -->
                </div>
              </block>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab title="已签约">
        <!--列表-->
        <div class="page__bd">
          <div class="weui-panel weui-panel_access">
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
                      <div
                        class="row-item"
                        style="line-height:34rpx;justify-content:space-between;"
                      >
                        <div class="weui-media-box__title">{{item.title}}</div>
                      </div>
                      <div class="row-item" style="justify-content:space-between;">
                        <div class="weui-media-box__desc" style="color:#333;">{{item.mu}}亩 {{item.ground}}块地</div>
                        <div class="weui-media-box__desc" style="color:#333;">65.00元/亩</div>
                        <span
                          @click="call(item.phone)"
                        ><img src="cloud://wdgd-bxkj5.7764-wdgd-bxkj5/wdgd-img/Group Copy 16.png" style="width:20px;height:20px;" alt=""> </span>
                      </div>
                      <div class="row-item">
                        <div class="weui-media-box__desc" style="display:flex;">
                          <i class="iconfont iconFillCopy" style="font-size:14px;color:#666666;"></i>
                          <span>河北 | 唐山 | 乐亭县</span>
                        </div>
                      </div>
                      <div class="height30"></div>
                      <div class="row-item" style="justify-content:space-between;">
                        <div class="weui-media-box__desc">2019-09-20 <span class="iconfont iconchufadaodaxiao" style="font-size:12rpx;color:#666;"></span> 2019-09-20</div>
                        <div class="weui-media-box__desc is-sign">已签约</div>
                      </div>
                    </div>
                  </div>
                  <!-- <div class="weui-cell__ft weui-cell__ft_in-access"></div> -->
                </div>
              </block>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab title="已完成">
        <!--列表-->
        <div class="page__bd">
          <div class="weui-panel weui-panel_access">
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
                      <div
                        class="row-item"
                        style="line-height:34rpx;justify-content:space-between;"
                      >
                        <div class="weui-media-box__title">{{item.title}}</div>
                    
                      </div>
                      <div class="row-item" style="justify-content:space-between;">
                        <div class="weui-media-box__desc" style="color:#333;">{{item.mu}}亩 {{item.ground}}块地</div>
                        <div class="weui-media-box__desc" style="color:#333;">65.00元/亩</div>
                        
                      </div>
                      <div class="row-item">
                        <div class="weui-media-box__desc" style="display:flex;">
                          <i class="iconfont iconFillCopy" style="font-size:14px;color:#666666;"></i>
                          <span>河北 | 唐山 | 乐亭县</span>
                        </div>
                      </div>
                      <div class="height30"></div>
                      <div class="row-item" style="justify-content:space-between;">
                        <div class="weui-media-box__desc">2019-09-20 <span class="iconfont iconchufadaodaxiao" style="font-size:12rpx;color:#666;"></span> 2019-09-20</div>
                        <div class="weui-media-box__desc pending-bid" v-if="item.isSigning">待评价</div>
                        <div class="weui-media-box__desc is-remark" v-if="!item.isSigning">已评价</div>
                      </div>
                    </div>
                  </div>
                  <!-- <div class="weui-cell__ft weui-cell__ft_in-access"></div> -->
                  <!-- <div class="weui-cell__ft weui-cell__ft_in-access"></div> -->
                </div>
              </block>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab title="已关闭">
        <!--列表-->
        <div class="page__bd">
          <div class="weui-panel weui-panel_access">
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
                      <div
                        class="row-item"
                        style="line-height:34rpx;justify-content:space-between;"
                      >
                        <div class="weui-media-box__title">{{item.title}}</div>
                      </div>
                      <div class="row-item" style="justify-content:space-between;">
                        <div class="weui-media-box__desc" style="color:#333;">{{item.mu}}亩 {{item.ground}}块地</div>
                        <div class="weui-media-box__desc" style="color:#333;">65.00元/亩</div>
                        
                      </div>
                      <div class="row-item">
                        <div class="weui-media-box__desc" style="display:flex;">
                          <i class="iconfont iconFillCopy" style="font-size:14px;color:#666666;"></i>
                          <span>河北 | 唐山 | 乐亭县</span>
                        </div>
                      </div>
                      <div class="height30"></div>
                      <div class="row-item" style="justify-content:space-between;">
                        <div class="weui-media-box__desc">2019-09-20 <span class="iconfont iconchufadaodaxiao" style="font-size:12rpx;color:#666;"></span> 2019-09-20</div>
                        <div class="weui-media-box__desc is-remark">待中标</div>
                      </div>
                    </div>
                  </div>
                  <!-- <div class="weui-cell__ft weui-cell__ft_in-access"></div> -->

                </div>
              </block>
            </div>
          </div>
        </div>
      </van-tab>
    </van-tabs>
    <van-dialog id="van-dialog" />
  </div>
</template>
<script>
import store from "../../store";
import * as types from "@/store/mutation-type";
import api from "@/http/api/api.js";
import Dialog from "~/vant/dialog/dialog";
export default {
  data() {
    return {
      active: 1,
      list: []
    };
  },
  created() {
      
  },
  onLoad() {
    this.getInfo();
  },
  onShow() {},
  // 下拉刷新事件
  onPullDownRefresh() {
    wx.hideNavigationBarLoading()
    wx.stopPullDownRefresh()
  },
  methods: {
    /**
     * 获取用户信息
     */
    getInfo() {
      wx.hideNavigationBarLoading()
      wx.stopPullDownRefresh()
      this.list.push(
      {
        title: "水稻全喂入收货",
        mu: 5000,
        ground: 20,
        isSigning: true,
        phone: "18361230720",
      },
      {
        title: "水稻全喂入收货3",
        mu: 5000,
        ground: 20,
        isSigning: false,
        phone: "18344717034",
      },{
        title: "水稻全喂入收货3",
        mu: 5000,
        ground: 20,
        isSigning: false,
        phone: "18344717034",
      },
      {
        title: "水稻全喂入收货3",
        mu: 5000,
        ground: 20,
        isSigning: false,
        phone: "18344717034",
      }
    )

    },
    jump(e){
        var item = e.currentTarget.dataset.item
        console.log(item)
        wx.navigateTo({
          url:'/pages/orderDetail/main?item='+JSON.stringify(item)
        })
      },

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
     * 编辑头像图片
     */
    call(phone) {
      Dialog.confirm({
        title: "提示",
        message: `拨打电话${phone}`,
        confirmButtonText: "是",
        cancelButtonText: "否",
      })
        .then(() => {
         wx.makePhoneCall({
                phoneNumber: phone,
            })
        })
        .catch(() => {
          // on cancel
        });
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
.height30 {
  width: 100%;
  height: 1px;
  background: #eee;
  margin: 10rpx 0;
}
.pending-bid {
  color: #f15b48;
  border: 1px solid#F15B48;
  padding: 1%;
  border-radius: 2px;
}
.pending-sign {
  color: #f9ab41;
  border: 1px solid#F9AB41;
  padding: 1%;
  border-radius: 2px;
}
.is-sign{
  color: #17A185;
  border: 1px solid#17A185;
  padding: 1%;
  border-radius: 2px;
}
.is-remark {
  color: #666;
  border: 1px solid#666;
  padding: 1%;
  border-radius: 2px;
}
</style>



