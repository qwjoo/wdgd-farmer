<!--
 * @Description: file content
 * @Author: chenchen
 * @Date: 2019-06-27 13:49:01
 * @LastEditTime: 2019-06-27 15:17:37
 -->
<template>
    <view id="login">
  
    </view>
</template>

<script>
import api from '@/http/api/api.js'
import Toast from '~/vant/toast/toast';
import * as types  from '@/store/mutation-type'
export default {
    components: {

    },
    data () {
        return {
            user: {
                userCode:'',
                phoneNumber: "",
                captChasCode: "",
            },
            timeT:"",
            btnMessage: '获取验证码',
            second: 60,
            nullHouse: true,
            telNumber: "0511-81882550",
        }
    },

    created () {

    },
    onShow(){

        // this.user.userCode = '190008'
        // this.user.phoneNumber = '18083781768'
        this.user.userCode = ''
        this.user.phoneNumber = ''
        this.user.captChasCode = ''
        this.btnMessage  = '获取验证码'
        this.second = 60
        this.nullHouse = true
    },
    onUnload(){
        clearInterval(this.timeT);
    },

    methods: {
        getCode(e){
            this.user.userCode = e.mp.detail.value
        },
        getPhone(e){
            this.user.phoneNumber = e.mp.detail.value
        },
        getYzm(e){
            this.user.captChasCode = e.mp.detail.value
        },
        /**
         * 发送验证码
         */
        getMessage(){
            if((/^1[345678]\d{9}$/.test(this.user.phoneNumber))){
              api.SendCaptchas(this.user.phoneNumber).then((res)=>{
                    this.nullHouse = false;
                    this.timer();
                })
            }else{
                Toast("请输入11位有效手机号");
            }
        },
        /**
         * 定时器
         */
        timer(){
            this.timeT = setInterval(()=>{
                this.second = this.second - 1;
                console.log(this.second)
                if(this.second <= 0){
                    this.btnMessage = "重新获取";
                    this.nullHouse = true;
                    this.second = 60;
                    clearInterval(this.timeT);
                }
            },1000)
        },
        /**
         * 登录
         */
        login(){
          // wx.reLaunch({
          //   url: '/pages/scanCode/main'
          // })
          // return
            if(this.user.userCode === ""){
                Toast("请输入工号");
                return;
            }else
            if(!(/^1[345678]\d{9}$/.test(this.user.phoneNumber))){
                Toast("请输入11位有效手机号");
                return;
            }else if(this.user.captChasCode === ""){
                Toast("请输入有效验证码");
                return;
            }else{
                api.login(this.user.userCode,this.user.phoneNumber,this.user.captChasCode).then(res=>{
                  console.log(res)
                        this.$store.commit(types.getJwtToken,res.token);
                        this.$store.state.id = res.userInfo.id
                        this.$store.state.enterpriseId = res.userInfo.enterpriseId
                        this.$store.state.number = res.userInfo.number
                        this.$store.state.name = res.userInfo.name
                        this.$store.state.phone = res.userInfo.phone
                        this.$store.state.roleId = res.userInfo.roleId
                        this.$store.state.userSource = res.userInfo.userSource
                        this.$store.state.roleName = res.userInfo.roleName
                        this.$store.state.isDisable = res.userInfo.isDisable
                        wx.reLaunch({
                            url: '/pages/scanCode/main'
                        })
                }).catch(function (error) {

                 });
            }
        },
        /**
         * 拨打电话
         */
        call(){
            wx.makePhoneCall({
                phoneNumber: this.telNumber,
            })
        }
    }
}
</script>
<style>
.getCode-btn{
    width: 200rpx;
    height: 45rpx!important;
    line-height: 45rpx!important;
    border-left: 2rpx solid #808080!important;
    border-top: none!important;
    border-right: none!important;
    border-bottom: none!important;
    border-radius: 0rpx!important;
    font-size:24rpx!important;
    background-color: #f5f5f5!important;
    padding-left: 5px!important;
    padding-right: 5px!important;
    text-align: center!important;
    color: #333;
}

</style>
<style scoped>
#login{
    display: flex;
    flex-direction: column;
    height: 100vh;
    background-color: #fff;
}
.logo{
    display: flex;
    flex-direction: column;
    width:100%;
    height: 300rpx;
    z-index:100;
}
.loginBg{
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 0;
}
.logo-img{
  width: 500rpx;
  height: 70rpx;
  display: flex;
    /* width:100%;
    height: 100%; */
    margin:auto auto 60rpx;
}
.row-class{
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 74.7%;
    height: 90rpx;
    margin:4.4% auto 0rpx;
}
.inputBg{
  border-radius: 6rpx;
  background-color:rgba(0, 0, 0, 0.4);
  z-index:1000;
}
.user,
.phone,
.password{
    width: 90rpx;
    height: 90rpx;
    background-color: #D8D8D8;
}
.message{
    display:flex;
    align-items:center;
    height: 120rpx;
    margin-left: 20rpx;
    background-color: #f5f5f5;
    padding:0 auto;
}
.user-img,
.phone-img,
.password-img{
    width: 30rpx;
    height: 36rpx;
    margin:27rpx 30rpx;
}
.input-class{
    width:100%;
    line-height:90rpx;
    height: 90rpx;
    padding-left:15px;
    font-family: PingFangSC-Regular;
    font-size: 28rpx;
    letter-spacing: 0;
    background-color: none;
  color: #ffffff;
}

.input-placeholder{
    color: #ffffff;
}
.row-btn{
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 74.7%;
    height: 90rpx;
    margin:18.3% auto 0rpx;
}

.login-btn{
    width:100%;
    height: 90rpx;
    line-height: 90rpx;
    background: #BF0909;
    border-radius: 8rpx;
    font-family: PingFangSC-Regular;
    font-size: 28rpx;
    letter-spacing: 0;
}

.row-tip{
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 74.7%;
    height: 33rpx;
    line-height: 33rpx;
    margin:0rpx auto ;
    position: absolute;
    left:12.7%;
    bottom: 5%;
}
.tip-head{
    font-family: PingFangSC-Regular;
    font-size: 24rpx;
    color: #888888;
    letter-spacing: 1rpx;
}
.tip-number{
    font-family: PingFangSC-Regular;
    font-size: 24rpx;
    color: #C00E0E;
    letter-spacing: 0;
    line-height: 33rpx;
}

</style>
