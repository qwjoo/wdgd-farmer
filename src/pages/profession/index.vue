<template>
    <view id="profession">
        <!-- <van-field
            title-width="140rpx"
            input-class="input-class"
            :value="user.company"
            readonly="true">
            <label slot="label" class="label-class">企业</label>
        </van-field> -->
        <van-field
            title-width="140rpx"
            input-class="input-class"
            :value="user.profession"
            readonly="true">
            <label slot="label" class="label-class">工种</label>
        </van-field>
        <view class="row-btn">
            <button type="warn" class="submit-btn" @click="toChangeProfession" v-if="isAudit === '3'">重新变更</button>
        </view>
        <view class="row-btn">
            <button type="warn" class="submit-btn" @click="toChangeProfession" v-if="isAudit==='0'||isAudit==='2'">工种变更</button>
            <label class="auditTip-class" v-if="isAudit==='1'">审核中，请耐心等候！</label>
            <label class="auditTip-class" v-if="isAudit==='3'">审核失败</label>
        </view>
    </view>
</template>
<script>
import store from '../../store'
import request from '@/http/api/api_mine'
export default {
    data() {
        return {
            user:{
                id:'',
                profession:''
            },
            isAudit:'',
        }
    },
    created () {
        
    },
    onLoad(){
        
    },
    onShow(){
        const that = this;
        that.user.id = store.state.id;
        // that.isAudit = store.state.audit;
        request.getUserInfo(that.user.id).then((res)=>{
            that.isAudit = res.audit;
            this.$store.state.audit = res.audit;
            this.$store.state.jobScopes = res.jobScopes;
            this.$store.state.jobScopesStr = res.jobScopesStr;
            this.$store.state.changeJob = res.changeJob;
            this.$store.state.changeJobStr = res.changeJobStr;
            if(that.isAudit === '0' || that.isAudit === '3'){
                that.user.profession = store.state.jobScopesStr;
                // if(that.isAudit === '3'){
                //     Dialog.confirm({
                //         message: '审核失败，是否重新提交？'
                //     }).then(() => {
                //         that.isAudit = '2';
                //         that.user.profession = store.state.jobScopesStr;
                //     }).catch(() => {

                //     });
                // }
            }else{
                that.user.profession = store.state.changeJobStr;
            }
        });
    },
    methods: {
        toChangeProfession(){
            wx.navigateTo({
                url: '/pages/changeProfession/main'
            })
        }
    }
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
</style>
<style scoped>
#profession{
    display: flex;
    flex-direction: column;
    height: 100vh;
    background: #E6E6E6;
}
.row-btn{
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 74.7%;
    height: 90rpx;
    margin:7.3% auto 0rpx;
    text-align:center;
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
.auditTip-class{
    width:100%;
    height: 60rpx;
    line-height: 60rpx;
    font-family: PingFangSC-Regular;
    font-size: 24rpx;
    color: #333;
    letter-spacing: 0.36rpx;
}
</style>

