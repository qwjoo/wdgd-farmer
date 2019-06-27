<template>
    <view id="changePhone">
        <van-field
            title-width="200rpx"
            input-class="input-class"
            :value="user.currentPhone"
            readonly="true">
            <label slot="label" class="label-class">当前手机号</label>
        </van-field>
        <van-field
            title-width="200rpx"
            input-class="input-class"
            required
            :value="user.newPhone"
            placeholder="请输入11位有效手机号"
            use-button-slot>
            <label slot="label" class="label-class">新手机号</label>
            <van-button slot="button" custom-class="getCode-btn" v-if="nullHouse" size="small" plain type="danger" @click="getMessage">{{sendMessage}}</van-button>
            <van-button slot="button" custom-class="getCode-btn" v-if="!nullHouse" size="small" plain type="danger" disabled>{{second}}s后重新获取</van-button>
        </van-field>
        <van-field
            title-width="200rpx"
            input-class="input-class"
            required
            :value="user.messageCode"
            placeholder="请输入6位数字验证码">
            <label slot="label" class="label-class">验证码</label>
        </van-field>
        <view class="row-btn">
            <button type="warn" class="submit-btn" @click="submit">提交申请</button>
        </view>
        <van-dialog id="van-dialog" />
    </view>
</template>
<script>
import Dialog from '~/vant/dialog/dialog';
export default {
    data() {
        return {
            user:{
                currentPhone:'',
                newPhone:'',
                messageCode:''
            },
            sendMessage:"发送验证码",
            second:"60",
            nullHouse: true,
        }
    },
    created() {
        this.user.currentPhone = "18212341234";
    },
    methods: {
        getMessage(){
            this.nullHouse = false;
            setInterval(()=>{
                if(this.second > 0){
                    this.second = this.second - 1;
                }else{
                    this.sendMessage = "重新发送";
                    this.nullHouse = true;
                    clearInterval()
                }
            },1000)
        },
        submit(){
            Dialog.alert({
                message: '已提交申请'
            }).then(() => {

            });
        }
    },
    
}
</script>
<style>
.label-class{
    font-size: 28rpx;
    letter-spacing: 0.42rpx;
    height: 60rpx;
    line-height: 60rpx;
}
.input-class{
    font-family: PingFangSC-Regular;
    font-size: 28rpx;
    letter-spacing: 0.42rpx;
    height: 60rpx!important;
    line-height: 60rpx!important;
}
.getCode-btn{
    font-family: PingFangSC-Regular!important;
    height: 60rpx!important;
    line-height: 60rpx!important;
    font-size: 24rpx!important;
    color: #BF0909!important;
    letter-spacing: 0.36rpx!important;
    border: 0rpx!important;
    padding-left: 5rpx!important;
    padding-right: 5rpx!important;
}
</style>

<style scoped>
#changePhone{
    display: flex;
    flex-direction: column;
    height: 100vh;
    background-color: #e6e6e6;
}
.row-btn{
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 74.7%;
    height: 90rpx;
    margin:18.3% auto 0rpx;
}
.submit-btn{
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


