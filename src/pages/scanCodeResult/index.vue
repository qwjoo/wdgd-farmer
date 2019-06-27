<template>
  <div class="page">
    <!--head-->
    <view class="top">
      <image class="top scanDetailBg" src="../../static/images/scanDetailBg.png"></image>
      <block  v-for="(item1,index) in listArray" :key="index">
        <block v-if="item1.userId==userId">
          <div style="width: 690rpx;margin: 0 auto;">
            <view class="page__title" style="color:#fff;font-size: 36rpx;">{{nodeNames[item1.nodeIndex]}}</view>
            <view class="page__desc" style="color:#fff;font-size: 30rpx;">{{item1.createTime}}</view>
          </div>
        </block>
      </block>
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
        :value="item.barcode"
        placeholder-style="color:#000;"
        label="物流标识码"
        disabled
        :border="border"
      />
      <van-field
        :value="item.deviceNo"
        placeholder-style="color:#000;"
        label="订单号"
        disabled
        :border="border"
      />
      <van-field
        :value="item.deviceName"
        placeholder-style="color:#000;"
        label="客户单位"
        disabled
        :border="border"
      />
      <van-field
        :value="item.content"
        placeholder-style="color:#000;"
        label="货物名称"
        disabled
        :border="border"
      />
    </van-cell-group>
    <!--<div class="page__bd" style="padding-bottom: 0;">-->
    <!--<div class="weui-cells weui-cells_after-title">-->
    <!--<div class="cell_noBorder weui-cell_input headBg">-->
    <!--<div class="weui-cell__hd" style="margin-top: 10rpx;">-->
    <!--<div class="label">物流标识码：{{item.productInfo.productNo}}</div>-->
    <!--</div>-->
    <!--</div>-->
    <!--<div class="cell_noBorder weui-cell_input headBg">-->
    <!--<div class="weui-cell__hd">-->
    <!--<div class="label">订单号：{{item.productName}}</div>-->
    <!--</div>-->
    <!--</div>-->
    <!--<div class="cell_noBorder weui-cell_input headBg">-->
    <!--<div class="weui-cell__hd">-->
    <!--<div class="label">客户单位：{{item.deviceNo}}</div>-->
    <!--</div>-->
    <!--</div>-->
    <!--<div class="cell_noBorder weui-cell_input headBg">-->
    <!--<div class="weui-cell__hd" style="margin-bottom: 10rpx;">-->
    <!--<div class="label">货物名称：{{item.deviceName}}</div>-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->

    <!--<div class="line20"></div>-->
    <!--mid-->
    <!--<div class="page__bd" style="padding: 40rpx 30rpx;background: white">-->
    <!--<block  v-for="(item1,index) in listArray" :key="index">-->
    <!--<block v-if="item1.userId==userId">-->
    <!--<div class="page__title textCenter">{{nodeNames[item1.nodeIndex]}}</div>-->
    <!--<div class="page__desc textCenter">{{item1.createTime}}</div>-->
    <!--</block>-->
    <!--</block>-->
    <!--</div>-->

    <div class="line20" v-if='listArray.length>0'></div>

    <div>
      <view v-if='listArray.length>0' class='order_process v'>
        <block  v-for="(item,index) in listArray" :key="index">
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
            <view v-if="index==0" class='v'>
              <text class='process_name_title '>{{nodeNames[item.nodeIndex]}}</text>
              <text class='process_name_content '>{{stateDes[item.nodeIndex]}}</text>
              <text class='process_name_content ' v-if="item.handle">{{item.handle}} {{item.createTime}}</text>
              <text class='process_name_content ' v-else>{{item.createTime}}</text>
              <view style='height:20rpx;'></view>
            </view>
            <view v-if="index>0" class='v process_color3'>
              <text class='process_name_title '>{{nodeNames[item.nodeIndex]}}</text>
              <text class='process_name_content '>{{stateDes[item.nodeIndex]}}</text>
              <text class='process_name_content ' v-if="item.handle">{{item.handle}} {{item.createTime}}</text>
              <text class='process_name_content ' v-else>{{item.createTime}}</text>
              <view style='height:20rpx;'></view>
            </view>
            <!--&lt;!&ndash;<view v-if="(item.userId&&item.userId!=userInfo.id)" class='v process_color1'>&ndash;&gt;-->
            <!--<view v-if="(item.userId&&item.userId!=userId)" class='v process_color1'>-->
            <!--<text class='process_name_title '>{{nodeNames[item.nodeIndex]}}</text>-->
            <!--<text class='process_name_content '>{{stateDes[item.nodeIndex]}}</text>-->
            <!--<text class='process_name_content '>{{item.handle}} {{item.createTime}}</text>-->
            <!--<view style='height:20rpx;'></view>-->
            <!--</view>-->
            <!--&lt;!&ndash;<view v-if="item.userId==userInfo.id" class='v process_color2'>&ndash;&gt;-->
            <!--<view v-if="item.userId==userId" class='v process_color2'>-->
            <!--<text class='process_name_title '>{{nodeNames[item.nodeIndex]}}</text>-->
            <!--<text class='process_name_content '>{{stateDes[item.nodeIndex]}}</text>-->
            <!--<text class='process_name_content '>{{item.handle}} {{item.createTime}}</text>-->
            <!--<view style='height:20rpx;'></view>-->
            <!--</view>-->
            <!--<view v-if="!item.userId" class='v process_color3'>-->
            <!--<text class='process_name_title '>{{nodeNames[item.nodeIndex]}}</text>-->
            <!--<text class='process_name_content '>{{stateDes[item.nodeIndex]}}</text>-->
            <!--&lt;!&ndash;<text class='process_name_content '>{{item.handle}} {{item.createTime}}</text>&ndash;&gt;-->
            <!--<view style='height:20rpx;'></view>-->
            <!--</view>-->

          </view>

        </block>
      </view>
    </div>

  </div>
</template>

<script>
  import api_scanInfo from '@/http/api/api_nodeLogListInfo'
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
        nodes:[
          '订单发起',
          '需求认定',
          '运力指派',
          '出发到场',
          '交接完成',
          '运力出场',
          '始发中转',
          '目的中转',
          '目的到场',
          '客户签收',
          '司机结算',
          '账单确认',
          '客户结算'
        ],
        nodeNames:[
          '订单发起',
          '需求认定',
          '运力指派',
          '出发到场',
          '交接完成',
          '运力出场',
          '始发中转',
          '目的中转',
          '目的到场',
          '客户签收',
          '司机结算',
          '账单确认',
          '客户结算'
        ],
        stateDes:[
          '客户发起订单需求，等待系统确认。',
          '订单已确认，等待安排司机。',
          '已为该运单指派司机，司机将在指定时间到达现场装货。',
          '司机已到场。',
          '司机与现场客服已完成合同签署。',
          '司机已装货完毕，正快马加鞭安全运送货物，请耐心等候。',
          '司机已到达始发中转地。',
          '司机已到达目的中转地，等待卸货。',
          '司机已到达目的地。',
          '客户已签收！',
          '司机结算完成。',
          '账单确认无误。',
          '客户已结算，本次运输完成，谢谢！'
        ],
        list:[
          {
            title:'发货',
            des:'产品已开始发货',
            time:'张一鸣     2019-02-22   10:20:03'
          },
          {
            title:'质检贴码',
            des:'质检员已完成质检并贴码',
            time:'张一鸣    2019-02-21   15:50:13'
          },
          {
            title:'领料上线',
            des:'领料员已完成领料'
          },
          {
            title:'计划生产',
            des:'产品已进入生产计划',
            time:'计划员     2019-02-06   16:43:54'
          },
        ]
      }
    },
    onLoad(){
      this.item = JSON.parse(this.$root.$mp.query.item)
      // this.userInfo=wx.getStorageSync('userInfo')
      this.userId=store.state.id
      this.getNodeLogListInfoList(this.item.deviceNo)
    },
    onShow(){

    },
    computed: {
      listArray(){
        var that = this
        var list = that.states
        var listArr=[]
        for (var i in list) {
          var item = list[i]
          for (var y in that.nodes) {
            var node = that.nodes[y]
            if (node==item.node){
              item.nodeIndex=y
              break
            }
          }
          // var index=parseInt(item.nodeIndex)+1
          // if (item.userId) {
          //   item.nodeSrc='../../static/images/node'+index+'On.png'
          // }else {
          //   item.nodeSrc='../../static/images/node'+index+'Off.png'
          // }
          item.createTime=item.createTime.replace(/T/g, ' ')
          listArr.push(item)
        }
        return listArr
        // return that.list
      },
    },
    methods: {
      //获取扫码节点
      getNodeLogListInfoList:function(nodeLogInfoId){
        var that = this
        api_scanInfo.GetNodeLogListInfoList(nodeLogInfoId).then(res => {
          that.states = res
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
