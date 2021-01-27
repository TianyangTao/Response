// pages/persion/persion.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    image:"../images/icon.png",
    name:"未设置名称",
    active:2,
    counterId:""
  },
  onChange(event) {
  console.log(event.detail);
  this.setData({active: event.detail});
  if(event.detail==0)
  {
    wx.navigateTo({
      url: '../index/index',
    })
  }
  if(event.detail==1)
  {
    wx.navigateTo({
      url: '../se/se',
    })
  }
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //     // console.log(res)
    //     var appid = 'wxbe08efce713a44bf'; //填写微信小程序appid 
    //     var secret = 'd65ad3d9ee159c568200c30a3bb49baf'; //填写微信小程序secret 
 
    //     //调用request请求api转换登录凭证 
    //     wx.request({
    //       url: 'https://api.weixin.qq.com/sns/jscode2session?appid='+appid+'&secret='+secret+'&grant_type=authorization_code&js_code=' + res.code,
    //       header: {
    //         'content-type': 'application/json'
    //       },
    //       success: function (res) {
    //         console.log(res.data.openid) //获取openid 
    //       }
    //     }) 
    //   }
    // })
  },
  clickjieshu:function(){
    wx.navigateTo({
      url: '../jieshu/jieshu',
    })
  },
  getuserinfo: function(e){
    console.log(e.detail.userInfo)
   
  },
  tap:function(e){
    console.log(e.detail.userInfo)
    
  },
  usrgetUserInfo: function(e) {
    
    console.log(e.detail.userInfo)
    this.setData({
      image:e.detail.userInfo.avatarUrl,
      name:e.detail.userInfo.nickName
    })
     const db = wx.cloud.database()
    // // const zhi=date.toLocaleString()
    
    db.collection('Persioon').add({
      data: {
        name:e.detail.userInfo.nickName,
        image:e.detail.userInfo.avatarUrl,
        time:new Date().toLocaleString()
      },
      success: res => {
        // 在返回结果中会包含新创建的记录的 _id
        this.setData({
          counterId: res._id,
          count: 1
        })
        wx.showToast({
          title: '新增记录成功',
        })
        console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '新增记录失败'
        })
        console.error('[数据库] [新增记录] 失败：', err)
      }
    })
},
  /**
   * 生命周期函数--监听页面显示
   */
 
  onShow() { //返回显示页面状态函数
    //错误处理
    //this.onLoad()//再次加载，实现返回上一页页面刷新
    //正确方法
    //只执行获取地址的方法，来进行局部刷新
    var zhid = wx.getStorageSync('zhid');
    this.setData({ active: 2 });
     const db = wx.cloud.database()
    console.log("onshow2开始查询"+zhid);
    db.collection('Persioon').where({
      _openid: zhid,
    }).get({
      success: res => {
        this.setData({
            queryResult: JSON.stringify(res.data, null, 2),
            products:res.data,
            image:res.data[0].image,
            name:res.data[0].name,
        })
      
        //数据打包
        wx.setStorage({
          key: "persionicon",
          data: name,
        })
        console.log('[数据库] [查询记录] 成功: ', res.data[0].name)
      },
      fail: err => {
        wx.showToast({
          icon: '../images/icon.png',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })
    console.log("查询完毕")
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.setData({ active: 2 });
    console.log("onhide2");
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})