var Fly=require("flyio") //npm引入方式
var fly=new Fly(); //创建fly实例
import store from '../store'
//设置超时
fly.config.timeout=10000;
//配置请求基地址
//  fly.config.baseURL="https://wode.vip56.cn"
//  fly.config.baseURL="https://ndnode.vip56.cn"
 //fly.config.baseURL="http://cds.logidelta.com"
fly.config.baseURL="https://cds.vip56.cn"
// fly.config.baseURL="http://192.168.1.243:5000"
// fly.config.baseURL="http://192.168.1.141:5000"

fly.interceptors.request.use((request,promise)=>{
    var that=this;
    //自定义请求头
    var jwtToken = store.state.jwtToken;
    request.headers["Authorization"]=`Bearer ${jwtToken}`;
    return request;
})
fly.interceptors.response.use((response,promise) => {
    var url=response.request.url
    console.log("url",url)
    //str.indexOf("3") != -1
    if (url.indexOf("/api/OrderInfo/PutUpdateSweepCode")!=-1) {//扫码接口
      console.log("这是扫码接口")
      return Promise.resolve(response.data)
    }
      //只将请求结果的data字段返回
      if(response.data.errorMessage){
        wx.showModal({
          title: "提示",
          content: response.data.errorMessage,
          showCancel: false,
        });
        return Promise.reject(response.data.errorMessage)
      }else{
        return Promise.resolve(response.data.data); //标准化
      }
    },
    (err,promise) => {
        //发生网络错误后会走到这里
        wx.showToast({
            title: "网络开小差了，请稍后重试",
            icon: "none"
        })
})

export default fly




// 使用demo:
// request.login({
//     password:"123456",
//     userName:"货准达测试账户",
//     weChatOpenid:""
//  }).then(res=>{
//    console.log(res)
//  })
//get请求可以也可传obj，序列化数据。 //  test?id=123
    //  request.test({
    //     id: 133
    //  })
