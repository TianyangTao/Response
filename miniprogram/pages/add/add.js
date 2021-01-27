// pages/add/add.js
// const db = wx.cloud.database()
// const productsCollection = db.collection('counters')

Page({
  data: {
  },
 
  adddate:function (event) {
    const db = wx.cloud.database()
    // const zhi=date.toLocaleString()
    var id = wx.getStorageSync('zhid');
    console.log(id)
    // productsCollection.where({
    //   _openid: "123",
    // })
    db.collection('search').add({
      data: {
        image:"http://ebookimage.360doc.com/productinfo/1959/1959_cover_1558938964057.jpeg",
        title: "大谋1略",
        situation:"未借阅",
        row:"4",
        col:"4",
    //     var timestamp = Date.parse(new Date());
    //     timestamp = timestamp / 1000;
    //     // console.log("当前时间戳为：" + timestamp);
    
    // //获取当前时间
    //     var n = timestamp * 1000;
    //     var date = new Date(n);
        
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
    // productsCollection.add({
      // data:{
      //   titile:"prodoct 1",
      //   Image:"https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg",
      //   price:1,
      //   color:'red'
      // },
      // success:res=>{
      //   console.log(res)
      // }

    //   data:{
    //     titile:"prodoct 1",
    //     Image:"https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg",
    //     tages:["tage4","tage3"],
    //     price:1,
    //     color:'red'
    //   }
    // }).then(res =>{
    //   console.log(res)
    // })
  },
  onLoad: function (options) {
    //获取当前时间戳
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    // console.log("当前时间戳为：" + timestamp);
 
//获取当前时间
    var n = timestamp * 1000;
    var date = new Date(n);
    //年
    var Y = date.getFullYear();
    //月
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    //日
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    //时
    var h = date.getHours();
    //分
    var m = date.getMinutes();
    //秒
    var s = date.getSeconds();
  
    // console.log("当前时间：" +Y+M+D+h+":"+m+":"+s);
    
//转换为时间格式字符串
    // console.log(date.toDateString());
    // console.log(date.toGMTString());
    // console.log(date.toISOString());
    // console.log(date.toJSON());
    // console.log(date.toLocaleDateString());
 
    console.log(date.toLocaleString());
  
    // console.log(date.toLocaleTimeString());
    // console.log(date.toString());
    // console.log(date.toTimeString());
    // console.log(date.toUTCString());

  },

  onQuery: function() {
    const db = wx.cloud.database()
    // 查询当前用户所有的 counters
    db.collection('counters').where({
      _openid: "dkaksdshkaj"
    }).get({
      success: res => {
        this.setData({
          queryResult: JSON.stringify(res.data, null, 2)
        })
        console.log('[数据库] [查询记录] 成功: ', res)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })
  },

  onCounterInc: function() {
    const db = wx.cloud.database()
    const newCount = this.data.count + 1
    db.collection('counters').doc(this.data.counterId).update({
      data: {
        count: newCount
      },
      success: res => {
        this.setData({
          count: newCount
        })
      },
      fail: err => {
        icon: 'none',
        console.error('[数据库] [更新记录] 失败：', err)
      }
    })
  },

  onCounterDec: function() {
    const db = wx.cloud.database()
    const newCount = this.data.count - 1
    db.collection('counters').doc(this.data.counterId).update({
      data: {
        count: newCount
      },
      success: res => {
        this.setData({
          count: newCount
        })
      },
      fail: err => {
        icon: 'none',
        console.error('[数据库] [更新记录] 失败：', err)
      }
    })
  },

  onRemove: function() {
    if (this.data.counterId) {
      const db = wx.cloud.database()
      db.collection('counters').doc(this.data.counterId).remove({
        success: res => {
          wx.showToast({
            title: '删除成功',
          })
          this.setData({
            counterId: '',
            count: null,
          })
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '删除失败',
          })
          console.error('[数据库] [删除记录] 失败：', err)
        }
      })
    } else {
      wx.showToast({
        title: '无记录可删，请见创建一个记录',
      })
    }
  },

  nextStep: function () {
    // 在第一步，需检查是否有 openid，如无需获取
    if (this.data.step === 1 && !this.data.openid) {
      wx.cloud.callFunction({
        name: 'login',
        data: {},
        success: res => {
          app.globalData.openid = res.result.openid
          this.setData({
            step: 2,
            openid: res.result.openid
          })
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '获取 openid 失败，请检查是否有部署 login 云函数',
          })
          console.log('[云函数] [login] 获取 openid 失败，请检查是否有部署云函数，错误信息：', err)
        }
      })
    } else {
      const callback = this.data.step !== 6 ? function() {} : function() {
        console.group('数据库文档')
        console.log('https://developers.weixin.qq.com/miniprogram/dev/wxcloud/guide/database.html')
        console.groupEnd()
      }

      this.setData({
        step: this.data.step + 1
      }, callback)
    }
  },

  prevStep: function () {
    this.setData({
      step: this.data.step - 1
    })
  },

  goHome: function() {
    const pages = getCurrentPages()
    if (pages.length === 2) {
      wx.navigateBack()
    } else if (pages.length === 1) {
      wx.redirectTo({
        url: '../index/index',
      })
    } else {
      wx.reLaunch({
        url: '../index/index',
      })
    }
  },
  
})
