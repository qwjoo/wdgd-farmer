<template>
  <div class="page">
    <!--<div class="page__hd">-->
      <!--<div class="page__title">扫码记录</div>-->
      <!--<div class="page__desc">扫码记录</div>-->
    <!--</div>-->
    <!--查询-->
    <div class="page__bd" style="padding-bottom: 10px;">
      <div class="weui-cells weui-cells_after-title">
        <div class="weui-cell weui-cell_input">
          <div class="weui-cell__hd">
            <div class="weui-label">标识码</div>
          </div>
          <div class="weui-cell__bd">
            <input class="weui-input" placeholder="请输入标识码" :value="equipmentName" @input="getEquipmentName"/>
          </div>
        </div>
        <div class="cell_noBorder weui-cell_input">
          <div class="weui-cell__hd">
            <div class="weui-label">处理日期</div>
          </div>
          <div class="weui-cell__bd">
            <picker mode="date" value="date"  @change="bindDateChange">
              <div class="weui-input" v-if="date">{{date}}</div>
              <!--<div class="weui-input" v-else="date">请选择</div>-->
              <input class="weui-input" v-else="date"  placeholder="请选择" disabled="disabled"/>
            </picker>
          </div>
        </div>
        <div class="cell_noBorder weui-cell_input" style="padding: 20rpx 30rpx;">
          <!--<div class="weui-cell__bd">-->
            <!---->
          <!--</div>-->
          <div style="flex: 1;"></div>
          <button type="default" size="mini" style="margin-right: 30rpx;" @click="reset">重置</button>
          <button class="btn_nor" size="mini" @click="search">查询</button>
        </div>
      </div>
    </div>
    <!--列表-->
    <div class="page__bd">
      <div class="weui-panel weui-panel_access">
        <!--<div class="weui-panel__hd">列表</div>-->
        <div class="weui-panel__bd">
          <block v-for="(item,index) in list" :key="index" >
            <div @click="jump" :data-item="item" class="weui-media-box weui-media-box_appmsg" hover-class="weui-cell_active" style="border-bottom: #F0F0F0 2px solid;">
              <div class="weui-media-box__bd weui-media-box__bd_in-appmsg">
                <div style="flex:1;display: flex;flex-direction: column;">
                  <div class="weui-media-box__title">{{item.orderInfo.identificationCode}}</div>
                  <div class="height30"></div>
                  <div style="flex:1;display: flex;flex-direction: row;">
                    <div class="weui-media-box__desc" style="width: 200rpx;">{{item.nodeName}}</div>
                    <div class="weui-media-box__desc">{{item.handleTime}}</div>
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
  </div>
</template>

<script>
  import api from '@/http/api/api.js'
  import store from '../../store'
  export default {
    data() {
      return{
        date:'',
        list:[],
        name:'',
        equipmentName:'',
        // userInfo:null，
      }
    },
    onLoad(){
      // this.userInfo=wx.getStorageSync('userInfo')
      // this.getMyNodeLogInfoList(this.userInfo.id,'','')
      // this.getMyNodeLogInfoList(store.state.id,'','')
      this.equipmentName = ''
      this.list = []
      this.date = ''
      this.getMyNodeLogInfoList1('','',0,10)
    },
    onShow(){

    },
    computed: {
      listArray(){
        var list = this.list
        var listArr=[]
        for (var i in list) {
          var item = list[i]
          item.handleTime=item.handleTime.replace(/T/g, ' ')
          listArr.push(item)
        }
        return listArr
        // return new Array(1)
      },
    },
    onReachBottom () {
      this.getMyNodeLogInfoList(store.state.id,0,this.list.length+10)
    },
    // 下拉刷新事件
    onPullDownRefresh () {
      wx.hideNavigationBarLoading()
      wx.stopPullDownRefresh()
    },
    methods: {
      reset(){
        this.date=''
        this.equipmentName=''
        // this.getMyNodeLogInfoList(this.userInfo.id,'','')
        this.getMyNodeLogInfoList(store.state.id,'','')
      },
      search(){
        this.getMyNodeLogInfoList1(this.equipmentName,this.date,0,10)
        // this.getMyNodeLogInfoList(store.state.id,this.equipmentName,this.date)
      },
      //获取扫码记录new
      getMyNodeLogInfoList1:function(IdentificationCode,time,skip,count){
        var that = this
        api.GetWxNodeLogInfoListByUserId(store.state.id , IdentificationCode ,time, skip,count).then(res => {
          wx.hideNavigationBarLoading()
          wx.stopPullDownRefresh()
          that.list = res.item1
        }).catch(()=>{
          console.error('err')
        })
      },
      //获取扫码记录
      getMyNodeLogInfoList:function(jobno , name , time){
        var that = this
        // api_scan.GetMyNodeLogInfoList(jobno , name , time).then(res => {
        //   that.list = res
        // }).catch(()=>{
        //   console.error('err')
        // })
      },
      getEquipmentName(e){
        this.equipmentName = e.mp.detail.value
      },
      bindDateChange(e) {
        this.date = e.mp.detail.value;
      },
      jump(e){
        var item = e.currentTarget.dataset.item
        console.log(item)
        wx.navigateTo({
          url:'/pages/scanCodeDetail/main?item='+JSON.stringify(item)
        })
      },
    }
  };
</script>

<style>
  page{
    background: #F0F0F0;
  }
  .cell_noBorder{
    padding:0 30rpx;
    display:-webkit-box;
    display:-webkit-flex;
    display:flex;
    -webkit-box-align:center;
    -webkit-align-items:center;
    align-items:center;

  }
  .btn_nor{
    background: #BF0909;
    color:white;
  }
  .height30{
    height: 30rpx;
  }
</style>
