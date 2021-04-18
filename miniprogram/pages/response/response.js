// pages/response/response.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 'responsepage',
    userInfo: {},
    hasUserInfo: false,
    canIUseGetUserProfile: false,
  },
  getUserProfile(e) {
    var nickname =wx.getStorageSync("nickname")
    console.log(nickname)
    if(nickname===undefined ||nickname==null || nickname=="")
    {
      // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
      // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
      wx.getUserProfile({
        desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: (res) => {
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
          wx.setStorageSync(
            "nickname",res.userInfo.nickName
          )
        }
      })
    }
    else
    {
      var nickname =wx.getStorageSync("nickname")
      console.log("此时登录后的nickname值为"+nickname)
      var timestamp = Date.parse(new Date());
      timestamp = timestamp / 1000;
      console.log("当前时间戳为：" + timestamp);
      //获取当前时间  
      var n = timestamp * 1000;
      var date = new Date(n);
      wx.request({
        url: "https://www.zjgzhongde.com/RES/wx/getResponse",
        data: {
          timestamp: timestamp,
          name:nickname
        },
        method: "Post",
        header: {
          'content-type': 'application/x-www-form-urlencoded',
        },
        success:res=>{
            console.log("发送成功")
        }
      })
      
      }
    
  },
  // 微信小程序4.13号前使用Getinfo得版本
  goToPage1:function (){
    console.log("开始抢答");
    var name=wx.getStorageSync("name");
    console.log(name);
    if(name===undefined ||name==null){
      console.log("认正")
      wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          var code = res.code;
          console.log("res.code:"+res.code);
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
                      // url: "https://www.zjgzhongde.com/Rfidserver/wx/getOpenid",
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
    }
    else{
    var name=wx.getStorageSync("name");
    console.log("此时登录后的name值为"+name)
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    console.log("当前时间戳为：" + timestamp);
    //获取当前时间  
    var n = timestamp * 1000;
    var date = new Date(n);
    wx.request({
      url: "https://www.zjgzhongde.com/RES/wx/getResponse",
      data: {
        timestamp: timestamp,
        name:name
      },
      method: "Post",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success:res=>{
          console.log("发送成功")
      }
    })
    
    }
  },
})