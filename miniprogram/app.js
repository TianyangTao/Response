//app.js
App({
  
  onLaunch: function () {
   
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        traceUser: true,
        env: 'rfid-5gm8kh7z2dd90d2b'
      })
    }
   //根据code获取openid等信息
wx.login({
  //获取code
  success: function (res) {
    var code = res.code; //返回code
    console.log(code);
    var appId = 'wx5efd4a652c01192b';
    var secret = '5228f4c17e5b97a013889cd703ae9b63';
    wx.request({
      url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appId + '&secret=' + secret + '&js_code=' + code + '&grant_type=authorization_code',
      data: {},
      header: {
        'content-type': 'json'
      },
      success: function (res) {
        var openid = res.data.openid //返回openid
        console.log('openid为' + openid);
        wx.setStorage({
          key: "zhid",
          //id添加
          data: openid
        })
      }
    })
  }
})
wx.checkSession({
  success: function(){
    //session 未过期，并且在本生命周期一直有效
  },
  fail: function(){
    //登录态过期
    wx.login() //重新登录
  }
})
// //正常返回的JSON数据包
// {
// "openid": "OPENID",
// "session_key": "SESSIONKEY",
// "unionid": "UNIONID"
// }
// //错误时返回JSON数据包(示例为Code无效)
// {
// "errcode": 40029,
// "errmsg": "invalid code"
// }
    this.globalData = {}
  }
})
