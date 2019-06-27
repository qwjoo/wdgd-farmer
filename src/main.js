import Vue from 'vue'
import App from './App'
import '../static/weui/weui.css'
import store from './store'
Vue.config.productionTip = false
App.mpType = 'app'

//挂载store
Vue.prototype.$store = store;
//挂载fly
/* 不需要jwt的接口可以直接使用 this.$fly*/
//this.$fly.post(url,{})
var Fly=require("flyio")
var fly=new Fly
Vue.prototype.$fly = fly;



const app = new Vue(App)
app.$mount()

