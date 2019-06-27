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
        <div class="weui-cell__bd">
          <p>农户姓名</p>
        </div>
        <div class="weui-cell__ft">说明文字</div>
      </div>
       <div class="weui-cell">
        <div class="weui-cell__bd">
          <p>作业类型</p>
        </div>
        <div class="weui-cell__ft">说明文字</div>
      </div>
       <div class="weui-cell">
        <div class="weui-cell__bd">
          <p>农户备注</p>
        </div>
        <div class="weui-cell__ft">说明文字</div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <p>作业地点</p>
        </div>
        <div class="weui-cell__ft">说明文字</div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <p>作业亩数</p>
        </div>
        <div class="weui-cell__ft">说明文字</div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <p>作业地块数</p>
        </div>
        <div class="weui-cell__ft">说明文字</div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <p>每亩期望价格</p>
        </div>
        <div class="weui-cell__ft">说明文字</div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <p>需要机器数量</p>
        </div>
        <div class="weui-cell__ft">说明文字</div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <p>作业时间</p>
        </div>
        <div class="weui-cell__ft">说明文字</div>
      </div>
    </div>

     <template slot="sku-actions" slot-scope="props">
    <div class="van-sku-actions">
      <van-button
        square
        size="large"
        type="warning"
        @click="onPointClicked"
      >
        积分兑换
      </van-button>
      <!-- 直接触发 sku 内部事件，通过内部事件执行 onBuyClicked 回调 -->
      <van-button
        square
        size="large"
        type="danger"
        @click="props.skuEventBus.$emit('sku:buy')"
      >
        买买买
      </van-button>
    </div>
  </template>
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
</style>



