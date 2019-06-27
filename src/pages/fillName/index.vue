<template>
    <view id="fillname">
        <view class="logo">
            <image class="logo-img" src="/static/images/logo@2x.png" />
        </view>
        <view class="row-class">
            <view class="label-class">你的名字：</view>
            <input class="input-class" :value="user.userName" @input="getName" placeholder="请输入姓名" placeholder-class="input-placeholder">
        </view>
        <view class="row-class1">
            <view class="tip-class"><van-icon name="info-o" color="#BF0909" custom-style="margin-right:4rpx"/>建议使用真实姓名</view>
        </view>
        <view class="row-btn">
            <button type="warn" class="confirm-btn" @click="confirm">确定</button>
        </view>
    </view>
</template>

<script>
import request from '@/http/api/api_login'

export default {
    components: {

    },
    data () {
        return {
            user: {
                userName:'',
            },
        }
    },

    created () {

    },

    methods: {
        getName(e){
            this.user.userName = e.mp.detail.value
        },
        confirm(){
            wx.reLaunch({
                url: '../mine/main'
            })  
        }
    }
}
</script>
<style scoped>
#fillname{
    display: flex;
    flex-direction: column;
    height: 100vh;
    background-color: #fff;
}
.logo{
    display: flex;
    flex-direction: column;
    width:100%;
    height: 13.2%;
    margin-top: 8.8%;
    margin-bottom: 6.7%;
}
.logo-img{
    width: 216rpx;
    height: 176rpx;
    margin:0rpx auto;
}
.row-class{
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 74.7%;
    height: 90rpx;
    margin:4.4% auto 0rpx;
}
.label-class{
    width: 210rpx;
    height: 90rpx;
    line-height: 90rpx;
    font-family: PingFangSC-Regular;
    font-size: 28rpx;
    color: #333333;
    letter-spacing: 0;
    text-align: right;
}
.row-class1{
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 74.7%;
    margin:2.4% auto 0rpx;
}
.tip-class{
    height: 33rpx;
    line-height: 33rpx;
    font-family: PingFangSC-Regular;
    font-size: 24rpx;
    color: #666666;
    letter-spacing: 0;
    margin-left: 145rpx;
}

.input-class{
    width:100%;
    line-height:90rpx;
    height: 90rpx;
    padding-left:15px;
    font-family: PingFangSC-Regular;
    font-size: 28rpx;
    letter-spacing: 0;
    background-color: #f5f5f5;
}

.input-placeholder{
    color: #888888;
}

.row-btn{
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 74.7%;
    height: 90rpx;
    margin:18.3% auto 0rpx;
}

.confirm-btn{
    width:100%;
    height: 90rpx;
    line-height: 90rpx;
    background: #BF0909;
    border-radius: 8rpx;
    font-family: PingFangSC-Regular;
    font-size: 28rpx;
    letter-spacing: 0;
}
</style>
