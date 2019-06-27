<template>
  <div id="scanCode">
    <camera class="camera" :flash='light' mode='scanCode' @scancode='scanSuccess'>
      <cover-view class="shadow" style="height: 284rpx;">
        <cover-image @click="close"  v-if="light=='on'" class="light_style" src="../../static/images/lightOff.png"></cover-image>
        <cover-image @click="open" v-else class="light_style" src="../../static/images/lightOn.png"></cover-image>
      </cover-view>
      <cover-view class="shadow-mid" style="height: 570rpx;">
        <cover-view class="shadow-lr shadow"></cover-view>
        <cover-view style="width:574rpx; height:570rpx;">
          <cover-image src="../../static/images/kuang.png" style="width:574rpx; height:570rpx;"></cover-image>
          <cover-view class="line" :class="{activeDown:down}"></cover-view>
        </cover-view>
        <cover-view class="shadow-lr shadow"></cover-view>
      </cover-view>
      <cover-view class="shadow" style="height: 100%;align-items: center;">
        <cover-view class="des">将条码放入框内，即可自动扫描</cover-view>
      </cover-view>
    </camera>
  </div>

</template>

<script>
  import api from '@/http/api/api.js'
  import store from '../../store'
  export default {
    data() {
      return{
        light: 'off',
        detail:'',
        interval:null,
        down:true,
        handeling:false,
        // userInfo:null
        test:'AABJ01905210001',
        latitude:'',
        longitude:'',
        location:''
      }
    },
    onLoad(){
      var that=this
      // this.userInfo=wx.getStorageSync('userInfo')
    },
    onHide(){
      if (this.interval){
        clearInterval(this.interval)
      }
      this.down=true
    },
    onShow(){
      var that = this
      wx.getLocation({
        success(res) {
          console.log(res)
          // // 将GCJ-02(火星坐标)转为百度坐标
          // var result = transformFromGCJToBaidu(res.latitude, res.longitude)
          // console.log(result)
          // that.location={
          //   latitude:res.latitude,
          //   longitude:res.longitude
          // }
          that.latitude=res.latitude
          that.longitude=res.longitude
          api.GetAddress(res.latitude,res.longitude).then((res)=>{
            that.location=res.address
          })
        }
      })
      that.interval=setInterval(function () {
        that.down=!that.down
      },2000)
      wx.getSetting({
        success(res) {
          if (!res.authSetting['scope.camera']) {
            // wx.authorize({
            //   scope: 'scope.camera',
            //   success() {
            //     console.log('scope.camera')
            //   }
            // })
          }
          // else {
          //   that.interval=setInterval(function () {
          //     that.down=!that.down
          //   },2000)
          // }
        }
      })
    },
    methods: {
      open() {
        this.light='on';
        return
        var that=this
        that.handeling=true
        api.PutUpdateSweepCode(that.test,store.state.id,that.location).then(res => {
          console.log(res)
          if (res.success) {
            var data=res.data
            wx.showModal({
              title: "提示",
              content: '扫码成功',
              showCancel: false,
              // confirmText:'查看结果',
              success(res) {
                that.handeling=false
                // setTimeout(()=>{
                //   that.handeling=false
                // },2000)
                // if (res.confirm) {
                //   var item = data
                //   wx.navigateTo({
                //     url:'/pages/scanCodeResult/main?item='+JSON.stringify(item)
                //   })
                // }
              }
            })
          }else {
            wx.showModal({
              title: "提示",
              content: res.errorMessage,
              showCancel: false,
              success(res) {
                if (res.confirm) {
                  that.handeling=false
                }
              }
            })
          }
        }).catch(()=>{
          that.handeling=false
        })
      },
      close() {
        this.light='off';
      },
      resetLine(){
        this.down=true

      },
      scanSuccess(e){
        var that = this
        if (that.handeling) {
          return
        }
        that.detail=JSON.stringify(e.mp.detail)
        var result = e.mp.detail.result
        that.handeling=true
        api.PutUpdateSweepCode(result,store.state.id,that.location).then(res => {
          console.log(res)
          if (res.success) {
            var data=res.data
            wx.showModal({
              title: "提示",
              content: '扫码成功',
              // showCancel: false,
              confirmText:'查看结果',
              success(res) {
                // that.handeling=false
                setTimeout(()=>{
                  that.handeling=false
                },2000)
                if (res.confirm) {
                  api.GetWxNodeLogInfoListByUserId(store.state.id , result ,'', 0,10).then(res => {
                    var item = res.item1[0]
                    item.handleTime=item.handleTime.replace(/T/g, ' ')
                    wx.navigateTo({
                      url:'/pages/scanCodeDetail/main?item='+JSON.stringify(item)
                    })
                  }).catch(()=>{
                    console.error('err')
                  })
                }
              }
            })
          }else {
            wx.showModal({
              title: "提示",
              content: res.errorMessage,
              showCancel: false,
              success(res) {
                if (res.confirm) {
                  that.handeling=false
                }
              }
            })
          }

        }).catch(()=>{
          that.handeling=false
        })
        // if(store.state.jobScopes === '0'){
        //   wx.showModal({
        //     title: "提示",
        //     content: '没有操作权限，请先申请工种',
        //     showCancel: false,
        //     confirmText:'去申请',
        //     success(res) {
        //       if (res.confirm) {
        //         setTimeout(()=>{
        //           that.handeling=false
        //         },2000)
        //         wx.navigateTo({
        //           url:'/pages/confirmProfession/main'
        //         })
        //       }
        //     }
        //   });
        // }else {
        //   //无解析结果，请检查标识码是否正确
        //   api.PutUpdateSweepCode(result,store.state.id).then(res => {
        //     console.log(res)
        //     return
        //     if (res=='6001') {//0无效的码
        //       wx.showModal({
        //         title: "提示",
        //         content: '无效的码',
        //         showCancel: false,
        //         success(res) {
        //           if (res.confirm) {
        //             that.handeling=false
        //           }
        //         }
        //       });
        //     }else if (res == '6002') {//该产品已经被扫过
        //       wx.showModal({
        //         title: "提示",
        //         content: '该产品已经被扫过',
        //         showCancel: false,
        //         success(res) {
        //           if (res.confirm) {
        //             that.handeling=false
        //           }
        //         }
        //       });
        //     }else if (res == '6003'){//没有操作权限，请先申请工种
        //       wx.showModal({
        //         title: "提示",
        //         content: '没有操作权限，请先申请工种变更',
        //         showCancel: false,
        //         confirmText:'去申请',
        //         success(res) {
        //           if (res.confirm) {
        //             setTimeout(()=>{
        //               that.handeling=false
        //             },2000)
        //             wx.navigateTo({
        //               url:'/pages/profession/main'
        //             })
        //           }
        //         }
        //       });
        //     }else if (res == '6004'){//没有操作权限，请先申请工种
        //       wx.showModal({
        //         title: "提示",
        //         content: '该产品没有可用的标识',
        //         showCancel: false,
        //         success(res) {
        //           if (res.confirm) {
        //             that.handeling=false
        //           }
        //         }
        //       });
        //     }else {
        //       var data = res
        //       wx.showModal({
        //         title: "提示",
        //         content: '扫码成功',
        //         showCancel: false,
        //         confirmText:'查看结果',
        //         success(res) {
        //           setTimeout(()=>{
        //             that.handeling=false
        //           },2000)
        //           if (res.confirm) {
        //             var item = data
        //             wx.navigateTo({
        //               url:'/pages/scanCodeResult/main?item='+JSON.stringify(item)
        //             })
        //           }
        //         }
        //       });
        //     }
        //     // console.log(res)
        //   }).catch(()=>{
        //     that.handeling=false
        //   })
        // }

      }
    }
  };
</script>

<style>
  page{
    width: 100%;
    height: 100%;
  }
  #scanCode{
    display: flex;
    align-items: center;
    justify-content: center;
    /*border: 1px solid red;*/
    background-color: #ffffff;
    width: 100%;
    height: 100%;
  }
  .light_style{
    position: absolute;
    top: 172rpx;
    left: 353rpx;
    width: 45rpx;
    height: 48rpx;
  }
  .camera{
    width: 100%;
    height: 100%;
  }
  .class2{position: absolute;width:170px;height:190px;top: 260px;left: 208px;box-shadow: rgba(0,0,0,.6) 0 0 0 1366px;}

  .shadow{
    flex: 1;
    background-color:#000000;
    opacity: 0.40;
  }
  .shadow-mid{
    width: 100%;
    height: 570rpx;
    display: flex;
    flex-direction: row;
  }
  .shadow-lr{
    width: 88rpx;
    height: 100%;
  }
  .line{
    position: absolute;
    top: 284rpx;
    left: 110rpx;
    height: 2px;
    width: 530rpx;
    background: white;
    /*transform: translateY(580rpx);*/
    /*background: url(img/share/dapai.png) no-repeat; !*上下扫的线*!*/
    /*动画效果*/
    /*animation: myScan 2s infinite alternate;*/
    /*animation: myScan 2s infinite alternate;*/
    /*-webkit-animation: myScan 2s infinite alternate;*/
    transition: All 2s linear;
    -webkit-transition: All 2s linear;
    /*transform: translateY(580rpx);*/
  }
  .activeDown{
    transform: translateY(560rpx);
  }
  .des{
    ont-family: PingFangSC-Regular;
    font-size: 24rpx;
    color: #F0F0F0;
    letter-spacing: 0.36px;
    text-align: center;
    margin-top: 60rpx;
  }
  @-webkit-keyframes myScan {
    /*0% { top: 284rpx;}*/
    /*100% { top: 850rpx;}*/
    0% { transform: translateY(0);}
    100% { transform: translateY(285)}
  }
  @keyframes myScan {
    /*0% { top: 284rpx;}*/
    /*100% { top: 850rpx;}*/
    0% { transform: translateY(0);}
    100% { transform: translateY(285)}
  }
  .controls {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
    height: 100%;
  }
  .controls1{
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
  }
  .result{
    font-size: 10PX;
    color: rgb(12, 242, 240);
    text-align: center
  }

</style>
