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
            :value="user.showJobStr"
            icon="arrow"
            placeholder="请选择"
            readonly="true"
            @click="toggleRight">
            <label slot="label" class="label-class">工种</label>
        </van-field>
        <view class="row-btn">
            <button type="warn" class="submit-btn" @click="submit">提交申请</button>
        </view>
        <van-toast id="van-toast" />
        <van-dialog id="van-dialog" />
        <van-popup :show="showRight" position="right" custom-class="right" @close="radioChange">
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
                changeJob:'',
                showJobStr:'',
            },
            showRight: false,
            radioItems: [
                { name: '发货计划员', value: '1', checked: false},
                { name: '订单确认员', value: '2', checked: false },
                { name: '订单派车员', value: '3', checked: false},
                { name: '出发到场员', value: '4', checked: false},
                { name: '出发交接员', value: '5', checked: false},
                { name: '出发出场员', value: '6', checked: false},
                { name: '始发中转员', value: '7', checked: false},
                { name: '目的中转员', value: '8', checked: false},
                { name: '目的到场员', value: '9', checked: false},
                { name: '签收确认员', value: '10', checked: false},
                { name: '下游结算员', value: '11', checked: false},
                { name: '账单确认员', value: '12', checked: false},
                { name: '上游结算员', value: '13', checked: false},
            ],

        }
    },
    created () {

    },
    onShow(){
        const that = this;
        that.user.id = store.state.id;
        that.user.profession = store.state.jobScopes;
        that.user.showJobStr = store.state.jobScopesStr;
        that.user.changeJob = '';
    },
    onUnload(){
        this.showRight = false;
    },
    methods: {
        toggleRight(){
            this.showRight = true;
        },
        /**
         * 选择
         */
        radioChange(e) {
            let radioItems = this.radioItems;
            radioItems.forEach(item => {
                item.checked = item.value === e.mp.detail.value;
                if(item.value === e.mp.detail.value){
                    this.user.showJobStr = item.name
                    this.user.changeJob = item.value
                }
            });
            this.radioItems = radioItems;
            setTimeout(()=>{
                this.showRight = false;
            },1000)
        },
        /**
         * 提交申请
         */
        submit(){
            if(this.user.profession === this.user.changeJob || this.user.changeJob === ""){
                Toast('未更改任何内容');
                return;
            }else{
                request.changeProfession({
                    'FUserId': this.user.id,
                    'JobScopes': this.user.profession,
                    'ChangeJob': this.user.changeJob,
                }).then((res)=>{
                    Dialog.alert({
                        message: '已提交变更申请'
                    }).then(() => {
                        this.$store.state.audit = '1';
                        this.$store.state.changeJob = this.user.changeJob;
                        this.$store.state.changeJobStr = this.user.showJobStr;
                        // console.log(store.state)
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
