<template>
  <div class="page">
    <!--head-->
    <view class="top">
      <image class="top scanDetailBg" src="../../static/images/scanDetailBg.png"></image>
      <div style="width: 690rpx;margin: 0 auto;">
        <view class="page__title" style="color:#fff;font-size: 36rpx;">{{item.nodeName}}</view>
        <view class="page__desc" style="color:#fff;font-size: 30rpx;">{{item.handleTime}}</view>
      </div>
    </view>
    <div class="line20"></div>
    <van-cell-group>
      <view class="title-top">
        <view class="title-h">
          <view class="title flex1">基本信息</view>
          <view class="content"></view>
        </view>
      </view>
      <van-field
        :value="item.orderInfo.identificationCode"
        placeholder-style="color:#000;"
        label="标识码"
        disabled
        :border="border"
      />
      <van-field
        :value="item.orderInfo.number"
        placeholder-style="color:#000;"
        label="订单编号"
        disabled
        :border="border"
      />
      <van-field
        :value="address1"
        placeholder-style="color:#000;"
        label="始发地"
        disabled
        :border="border"
      />
      <van-field
        :value="address2"
        placeholder-style="color:#000;"
        label="目的地"
        disabled
        :border="border"
      />
    </van-cell-group>

    <div class="line20" v-if='listArray.length>0'></div>

    <div>
      <view v-if='listArray.length>0' class='order_process v'>
        <block  v-for="(item1,index) in listArray" :key="index">
          <view class='h'>
            <view class='process v'>
              <!-- <image wx:if='{{index==0}}' class='process_icon' src="../../images/point.png"></image> -->

              <view v-if='index==0' class='process_line1Head'></view>
              <view v-if='index>0' class='process_line1'></view>
              <!--<image v-if='index==0' class='process_icon' src="../../static/images/deliveryOn.png"></image>-->
              <!--<image v-if='index>0' class='process_icon' src="../../static/images/deliveryOff.png"></image>-->
              <image v-if='index==0' class='process_icon' src="../../static/images/pointHead.png"></image>
              <view v-if='index>0' class='process_icon_point'></view>
              <view v-if='(index+1)<listArray.length' class='process_line2'></view>
              <view v-if='(index+1)==listArray.length' class='process_line2End'></view>

            </view>
            <view v-if="index==0" class='v' style="flex: 1">
              <text class='process_name_title '>{{item1.nodeName}}{{item1.skip}}</text>
              <text class='process_name_content '>{{item1.explain}}</text>
              <text class='process_name_content ' v-if="item.handleName">{{item1.handleName}} {{item1.handleTime}}</text>
              <text class='process_name_content ' v-else>{{item1.handleTime}}</text>
              <view style='height:20rpx;'></view>
            </view>
            <view v-if="index>0" class='v process_color3' style="flex: 1">
              <text class='process_name_title '>{{item1.nodeName}}{{item1.skip}}</text>
              <text class='process_name_content '>{{item1.explain}}</text>
              <text class='process_name_content ' v-if="item1.handleName">{{item1.handleName}} {{item1.handleTime}}</text>
              <text class='process_name_content ' v-else>{{item1.handleTime}}</text>
              <view style='height:20rpx;'></view>
            </view>

          </view>

        </block>
      </view>
    </div>

  </div>
</template>

<script>
  import api from '@/http/api/api.js'
  import store from '../../store'
  export default {
    data() {
      return{
        border:false,
        date:'',
        item:null,
        states:null,
        // userInfo:null,
        userId:'',
        nodeList:[]
      }
    },
    onLoad(){
      this.item = JSON.parse(this.$root.$mp.query.item)
      // this.userInfo=wx.getStorageSync('userInfo')
      this.userId=store.state.id
      this.getNodeLogListInfoList(this.item.orderId)
    },
    onShow(){

    },
    computed: {
      listArray(){
        var that = this
        var list = that.nodeList
        var listArr=[]
        for (var i in list) {
          var item = list[i]
          item.handleTime=item.handleTime.replace(/T/g, ' ')
          if (item.isSkip) {
            item.skip='(已跳过)'
          }else {
            item.skip=''
          }
          listArr.push(item)
        }
        return listArr.reverse()
        // return that.list
      },
      address1(){
        var item=this.item
        return item.orderInfo.originProvince+item.orderInfo.originCity+item.orderInfo.originCounty
      },
      address2(){
        var item=this.item
        return item.orderInfo.destinationProvince+item.orderInfo.destinationCity+item.orderInfo.destinationCounty
      },
    },
    methods: {
      //获取扫码节点
      getNodeLogListInfoList:function(orderId){
        var that = this
        api.GetNodeLogInfoList(orderId).then(res => {
          that.nodeList = res
        }).catch(()=>{
          console.error('err')
        })
      },
      bindDateChange(e) {
        this.date = e.mp.detail.value;
      },
    }
  };
</script>

<style>
  .cartLeft{
    border-left:#999999 4rpx dashed;
  }
  .top{
    width: 100%;
    height: 140rpx;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .scanDetailBg{
    position: absolute;
    top: 0;
    left: 0;
    z-index: -100;
  }
  .cell_noBorder{
    padding:0 45rpx;
    display:-webkit-box;
    display:-webkit-flex;
    display:flex;
    -webkit-box-align:center;
    -webkit-align-items:center;
    align-items:center;

  }
  .title-top{
    width: 100%;
    height: 80rpx;
    background: white;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: auto 30rpx;
    /*margin-top: 20rpx;*/
    border-bottom: #EEEEEE 1px solid;
  }
  .title-h{
    width: 690rpx;
    height: 80rpx;
    display: flex;
    flex-direction: row;
    align-items: center;
    /*justify-content: center;*/
  }
  .title{
    font-size: 30rpx;
    color: #000000;
  }
  .content{
    font-size: 26rpx;
    color: #666666;
  }
  van-cell > view:nth-child(1) {
    padding: 4rpx 30rpx !important;
  }
  .label{
    word-wrap:break-word;
    word-break:break-all;
    margin-top: 10rpx;
    margin-bottom: 10rpx;
    font-family: PingFangSC-Regular;
    font-size: 28rpx;
    color: #F0F0F0;
    letter-spacing: 0.42px;
  }
  .headBg{
    background: #4D4D4D;
  }
  .textCenter{
    text-align: center;
  }
  .line20{
    width: 100%;
    height: 20rpx;
    background: #F0F0F0;
  }

  /*steps*/
  /* liucheng */
  .v{
    display: flex;
    flex-direction: column;
  }
  .h{
    display: flex;
    flex-direction: row;
  }
  .vh-zhong{
    display:flex;align-items:center;
  }
  .order_process {
    display: flex;
    flex-wrap: nowrap;
    padding: 10rpx 10rpx 20rpx 10rpx;
    background-color: #fff;
  }

  .process_wrap {
    display: flex;
    flex-direction: column;
    flex: 1;
    align-items: center;
  }

  .process {
    display: flex;
    align-items: center;
    width: 100rpx;
  }

  .process_icon {
    width: 30rpx;
    height: 30rpx;
  }
  .process_icon_point {
    width: 14rpx;
    height: 14rpx;
    border-radius:50%;
    background: #E0E4E7;
  }

  .process_line1Head {
    /*background: #eff3f6;*/
    flex: 1;
    width: 0;
    height: 35rpx;
  }
  .process_line1 {
    /*background: #eff3f6;*/
     flex: 1;
    width: 0;
    height: 35rpx;
    border-left:#999999 2rpx dotted;
  }
  .process_line2 {
    /*background: #eff3f6;*/
    flex: 1;
    width: 0;
    border-left:#999999 2rpx dotted;
  }
  .process_line2End {
    /*background: #eff3f6;*/
    flex: 1;
    width: 0;
  }
  .process_color1{
    color: #333;
  }
  .process_color2{
    color: #BF0909;
  }
  .process_color3{
    color: #999;
  }

  .process_name_title {
    font-size: 30rpx;
    margin-top: 30rpx;
  }
  .process_name_content {
    font-size: 24rpx;
    margin-top: 15rpx;
  }
  .orderPoint {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #e0e4e7;
  }

</style>
