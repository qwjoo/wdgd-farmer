import fly from '../fly.js'
export default {
  /**
   * 登录
   */
  login: function (number,phone,smscode) {
    return fly.get('/api/UserLogin/GetLoginuser',{number,phone,smscode})
  },
  /**
   * 发送验证码
   */
  SendCaptchas: function(phone){
    return fly.get('/api/UserLogin/SendCaptchas?phonenumber=' + phone + '&isDeveloper=false')
  },
  /**
   * 获取用户信息
   */
  GetEnterpriseById: function(Id){
    return fly.get('/api/UserInfo/GetEnterpriseById?Id='+Id)
  },
  /**
   * 扫码接口
   */
  PutUpdateSweepCode: function(identificationCode,userId,location){
    return fly.put('/api/OrderInfo/PutUpdateSweepCode',{identificationCode,userId,location})
  },
  /**
   * 根据用户ID 查询扫码信息列表
   */
  GetWxNodeLogInfoListByUserId: function(userid,IdentificationCode,time,skip,count){
    return fly.get('/api/OrderInfo/GetWxNodeLogInfoListByUserId',{userid,IdentificationCode,time,skip,count})
  },
  /**
   * 根据订单获取物流追踪信息
   */
  GetNodeLogInfoList: function(OrderId){
    return fly.get('/api/NodeLogInfo/GetNodeLogInfoList',{OrderId})
  },
  /**
   * 根据经纬度获取地址信息
   */
  GetAddress: function(latitude,longitude){
    return fly.get('/api/OrderInfo/GetAddress',{latitude,longitude})
  },

}
