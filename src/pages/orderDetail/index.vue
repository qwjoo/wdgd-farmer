<template>
  <div>
    <div class="detail-top">
      <div class="row-item">
        <div style="width:200rpx;">订单编号</div>
        <div class="">00010190101</div>
      </div>
      <div class="row-item">
        <div style="width:200rpx;">创建时间</div>
        <div class="">2019-1-1 10:12:32</div>
      </div>
    </div>
    <div class="weui-cells">
      <div class="weui-cell">
        <div class="weui-cell__b">
          <p class="tit">农户姓名</p>
        </div>
        <div class="weui-cell__ft">说明文字</div>
      </div>
       <div class="weui-cell">
        <div class="weui-cell__b">
          <p class="tit">作业类型</p>
        </div>
        <div class="weui-cell__ft">说明文字</div>
      </div>
       <div class="weui-cell">
        <div class="weui-cell__b">
          <p class="tit">农户备注</p>
        </div>
        <div class="weui-cell__ft">说明文字</div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__b">
          <p class="tit">作业地点</p>
        </div>
        <div class="weui-cell__ft">说明文字</div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__b">
          <p class="tit">作业亩数</p>
        </div>
        <div class="weui-cell__ft">说明文字</div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__b">
          <p class="tit">作业地块数</p>
        </div>
        <div class="weui-cell__ft">说明文字</div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__b">
          <p class="tit">每亩期望价格</p>
        </div>
        <div class="weui-cell__ft">说明文字</div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__b">
          <p class="tit">需要机器数量</p>
        </div>
        <div class="weui-cell__ft">说明文字</div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__b">
          <p class="tit">作业时间</p>
        </div>
        <div class="weui-cell__ft">说明文字</div>
      </div>
       <div class="weui-cell">
        <div class="weui-cell__b">
          <p class="tit">作业时间</p>
        </div>
        <div class="weui-cell__ft">说明文字</div>
      </div>
       <div class="weui-cell">
        <div class="weui-cell__b">
          <p class="tit">作业时间</p>
        </div>
        <div class="weui-cell__ft">说明文字</div>
      </div>
       <div class="weui-cell">
        <div class="weui-cell__b">
          <p class="tit">作业时间</p>
        </div>
        <div class="weui-cell__ft">说明文字</div>
      </div>
    </div>

      <!-- <div class="weui-footer">
  <p class="weui-footer__text">Copyright © 2008-2016 weui.io</p>
</div> -->
<div class="weui-form-preview__ft">
    <button class="weui-form-preview__btn weui-form-preview__btn_default" style="background:#fff;color:#F15B48;width:30%;flex:none;" @click="closeOrder()">关闭订单</button>
    <button type="submit" class="weui-form-preview__btn weui-form-preview__btn_primary" style="background:#F15B48;color:#fff;width:70%;flex:none;">选择中标机手（23人报价）</button>
  </div>


  <van-dialog
  v-model="show"
  title="标题"
  show-cancel-button
  :beforeClose="beforeClose"
  id="van-dialog"
>
<div>123</div>
  <!-- <img src="https://img.yzcdn.cn/1.jpg"> -->
</van-dialog>
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
      list: [],
      show:false,
    };
  },
  created() {
    this.list.push(
      {
        title: "水稻全喂入收货",
        mu: 5000,
        ground: 20,
        isSigning: true,
        phone: "18361230720"
      },
      {
        title: "水稻全喂入收货3",
        mu: 5000,
        ground: 20,
        isSigning: false,
        phone: "18344717034"
      }
    );
  },
  onLoad() {},
  onShow() {},
  methods: {
    /**
     * 编辑头像图片
     */
    call(phone) {
      Dialog.confirm({
        title: "提示",
        message: `拨打电话${phone}`,
        confirmButtonText: "是",
        cancelButtonText: "否"
      })
        .then(() => {
          wx.makePhoneCall({
            phoneNumber: phone
          });
        })
        .catch(() => {
          // on cancel
        });
    },
    closeOrder() {
      
      this.show = !this.show;
      console.log(this.show);
     
    }
  }
};
</script>
<style lang="scss" scoped>
.detail-top{
  background: #F15B48;
  color: #ffffff;
  padding: 4%;
}
.row-item {
  flex: 1;
  display: flex;
  flex-direction: row;
  margin-bottom: 30rpx;
}
/deep/ .weui-cells{
  margin-top: .5em;
}
.ft{
  position: fixed;
  bottom: 0;
  width: 100%;
}
.tit{
  width: 250rpx;
}
</style>



