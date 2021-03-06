//app.js
App({
  
  onLaunch: function () {
    wx.getSystemInfo({
      success: (res) => {
        this.globalData.height = res.statusBarHeight;
        // 获取手机型号
        const model = res.model;
        const modelInclude = ["iPhone X", 'iPhone XR', "iPhone XS", "iPhone XS MAX"];
        var flag = false;//是否X以上机型
        for (let i = 0; i < modelInclude.length; i++) {
          //模糊判断是否是modelInclude 中的机型,因为真机上测试显示的model机型信息比较长无法一一精确匹配
          if (model.indexOf(modelInclude[i]) != -1) {
            flag = true
          }
        }
        if (flag) {
          //如果是这几个机型，设置距离底部的bottom值
          this.globalData.bottom = 25;
        }
      }
    })
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
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          var code = res.code;
          console.log(res.code);
          // 获取用户信息
          wx.getSetting({
            success: ures => {
              console.log("开始查询")
                wx.getUserInfo({
                  success: ures2 => {
                    // 可以将 ures2 发送给后台解码出 unionId
                    //this.globalData.userInfo = ures2.userInfo;
                    console.log("获取到的用户数据：");
                    console.log(ures2)
                    JSON.stringify(ures2)
                    // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                    // 所以此处加入 callback 以防止这种情况
                    if (this.userInfoReadyCallback) {
                      this.userInfoReadyCallback(ures2)
                    }
                    wx.request({
                      url: "https://www.zjgzhongde.com/RES/wx/getOpenid",
                      data: {
                        code: code,
                        encryptedData: ures2.encryptedData,
                        iv: ures2.iv
                      },
                      method: "Post",
                      header: {
                        'content-type': 'application/x-www-form-urlencoded',
                      },
                      success:res => { 
                        // this.setData({
                        //   image:res.data.userInfo.avatarUrl,
                        //   name:res.data.userInfo.nickName
                        // }),
                        console.log("登录返回的数据：");
                        console.log(res);
                        console.log("openid:"+res.data.userInfo.openId)
                        console.log("avatarUrl:"+res.data.userInfo.avatarUrl)
                        console.log("nickName:"+res.data.userInfo.nickName)
                        var openid = res.data.userInfo.openId //返回openid
                        console.log('openid为' + openid);
                        //储存res.header['Set-Cookie']
                        wx.setStorageSync("sessionid", res.header["Set-Cookie"]) ;
                
                        console.log("loginimage获取成功");
                        
                        var zhi=wx.getStorageInfoSync("sessionid");
                        console.log("sessionid值："+zhi);
                        wx.setStorageSync(
                          "name",res.data.userInfo.nickName
                        )
                        wx.setStorageSync(
                          "zhid",openid
                        )
                      },
                      fail: function (error) {
                        console.log(error);
                      }
                    })
                  }
                })
              }
          })
        }
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

    // this.globalData = {
    // }
  },
  globalData: {
    userInfo: null,
    token:'',
    height:0,
    bottom:0,
  }
})
