<template>
    <view id="changeProfession">
        <!-- <van-field
            title-width="140rpx"
            input-class="input-class"
            required
            :value="user.company"
            readonly="true">
            <label slot="label" class="label-class">企业</label>
        </van-field> -->
        <van-field
            title-width="140rpx"
            input-class="input-class"
            required
            :value="user.professionStr"
            icon="arrow"
            placeholder="请选择"
            readonly="true"
            @click="toggleRight">
            <label slot="label" class="label-class">工种</label>
        </van-field>
        <view class="row-btn" v-if="isAudit ==='0'">
            <button type="warn" class="submit-btn" @click="submit" >工种认证</button>
        </view>
        <view class="row-btn" v-if="isAudit ==='3'">
            <button type="warn" class="submit-btn" @click="retry" v-if="isAudit === '3'">重新认证</button>
        </view>
        <view class="row-btn">
            <label class="auditTip-class" v-if="isAudit==='1'">审核中，请耐心等候！</label>
            <label class="auditTip-class" v-if="isAudit==='3'">审核失败</label>
        </view>
        <van-toast id="van-toast" />
        <van-dialog id="van-dialog" />
        <van-popup :show="showRight" position="right" custom-class="right" @close="radioChange" overlay='true'>
            <radio-group @change="radioChange" class="radio-class">
                <label class="weui-cell weui-check__label radio-class" v-for="(item,index) in radioItems" :key="index">
                    <radio class="weui-check" :value="item.value" :checked="item.checked" />
                    <div class="weui-cell__bd radio-name" :class="{isRed:item.checked}">{{item.name}}</div>
                    <div class="weui-cell__ft weui-cell__ft_in-radio" v-if="item.checked">
                        <icon class="weui-icon-radio" type="success_no_circle" size="18" color="#BF0909"></icon>
                    </div>
                </label>
            </radio-group>
        </van-popup>
    </view>
</template>
<script>
import Toast from '~/vant/toast/toast';
import Dialog from '~/vant/dialog/dialog';
import request from '@/http/api/api_profession'
import store from '../../store'
export default {
    data() {
        return {
            user:{
                id:'',
                profession:'',
                professionStr:'',
                changeJob:'',
            },
            isAudit: '',
            showRight: false,
            radioItems: [
                { name: '计划员', value: '1', checked: false},
                { name: '领料员', value: '2', checked: false },
                { name: '质检员', value: '3', checked: false},
                { name: '物流专员', value: '4', checked: false},
                { name: '物流公司', value: '5', checked: false},
                { name: '收货人', value: '6', checked: false},
                { name: '经销商', value: '7', checked: false},
                // { name: '用户', value: '8', checked: false},
            ],
            
        }
    },
    created () {

    },
    onShow(){
        const that = this;
        that.user.id = store.state.id;
        that.isAudit = this.$store.state.audit
        if(this.$store.state.audit === '1' || this.$store.state.audit === '3'){
            that.user.professionStr = store.state.changeJobStr
            that.user.profession = store.state.changeJob;
        }else{
            that.user.professionStr = store.state.jobScopesStr;
            that.user.profession = store.state.jobScopes;
        }
        that.user.changeJob = '';
    },
    onUnload(){
        this.showRight = false;
    },
    methods: {
        toggleRight(){
            const that = this;
            if(that.isAudit === '0'){
                this.showRight = true;
            }
        },
        /**
         * 选择工种
         */
        radioChange(e) {
            let radioItems = this.radioItems;
            radioItems.forEach(item => {
                item.checked = item.value === e.mp.detail.value;
                if(item.value === e.mp.detail.value){
                    this.user.professionStr = item.name
                    this.user.changeJob = item.value
                }
            });
            this.radioItems = radioItems;
            setTimeout(()=>{
                this.showRight = false;
            },1000)
        },
        /**
         * 重新认证
         */
        retry(){
            const that = this;
            that.isAudit = '0';
            that.user.professionStr = ''
            that.user.profession = '';
        },
        /**
         * 提交认证
         */
        submit(){
            if(this.user.changeJob === ''){
                Toast('请将信息填写完整');
            }else{
                request.changeProfession({
                    'FUserId': this.user.id,
                    'ChangeJob': this.user.changeJob,
                    'JobScopes': this.user.profession,
                }).then((res)=>{
                    Dialog.alert({
                        message: '已提交认证申请'
                    }).then(() => {
                        this.$store.state.audit = '1';
                        this.$store.state.changeJob = this.user.changeJob;
                        this.$store.state.changeJobStr = this.user.professionStr;
                        wx.navigateTo({
                            url: '/pages/profession/main'
                        })
                    });
                })
            }
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
.select-row{
    font-family: PingFangSC-Regular;
    line-height: 64rpx!important;
}
.select-title{
    font-size: 28rpx;
    color: #333333;
    letter-spacing: 0.42rpx;
    /* padding-left: 34rpx; */
}
.right {
  width: 100%;
  height: 100%;
  background-color: #E6E6E6!important;
}
</style>
<style scoped>
#changeProfession{
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
}
.auditTip-class{
    width:100%;
    height: 60rpx;
    line-height: 60rpx;
    font-family: PingFangSC-Regular;
    font-size: 24rpx;
    color: #333;
    letter-spacing: 0.36rpx;
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
.radio-class{
    background-color: #fff;
}
.radio-name{
    font-size: 28rpx;
    letter-spacing: 0.42rpx;
    height: 60rpx;
    line-height: 60rpx;
}
.isRed{
    color:#BF0909;
}
</style>