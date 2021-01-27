// pages/search/search.jsshu
/*
需求：从总数据库查询书名，如果点击借阅
      将数据存入search数据库，
      2、并修改总数据库属性
        image，time，titile,状态
*/
const db = wx.cloud.database()
const productsCollection = db.collection('search')
const productsCollection1 = db.collection('borrow')

Page({

  /**
   * 页面的初始数据
   */
  data: {
      tic:1,
      bookid:"123",
      search_1:1,
      situation:"已借阅",
      show: false,
      jump:2,
      
  },
  onClickHide() {
    this.setData({ show: false });
  },


  borrowbook(e){
    // situation
    var bookid=this.data.bookid;
   
    console.log(bookid);
    
    const db = wx.cloud.database()
    db.collection('search').doc(bookid).update({
      data: {
        situation: "已被预约"
      },
      success: res => {
        this.setData({
          queryResult: JSON.stringify(res.data, null, 2),
          products:res.data,
          product:res.data,
          jump:1,
        })
        wx.showToast({
          title: '书已成功预约',
        })
        wx.setStorage({
          key: "searchbook",
          data: bookid,
        })
        wx.navigateTo({
          url: '../toast/toast',
        })
        console.log('[数据库] [更新记录] 成功: ', res)
      },
      fail: err => {
        icon: 'none',
        console.error('[数据库] [更新记录] 失败：', err)
        wx.showToast({
          title: '图书已被借阅',
        })
      }
    })
    
  },
  onCounterDec: function() {
    const db = wx.cloud.database()
    db.collection('search').where({
      situation: "未借阅"
    }).update({
      data: {
        situation: "借阅"
      },
      success: res => {
        this.setData({
          queryResult: JSON.stringify(res.data, null, 2),
          products:res.data
        })
        console.log('[数据库] [更新记录] 成功: ', res)
      },
      fail: err => {
        icon: 'none',
        console.error('[数据库] [更新记录] 失败：', err)
      }
    })
  },
  onChange(event) {
    this.setData(
      { active: event.detail }
    );
   if(event.detail==1)
   {
     wx.navigateTo({
       url: '../se/se',
     })
   }
   if(event.detail==0)
   {
     wx.navigateTo({
       url: '../index/index',
     })
   }
   
 },
 onChangeSearch(e){
  this.setData({
    value: e.detail,
  });
 },
 onSearch() {
  db.collection('search').where({
    _openid: this.data.openid,
    title: this.data.value,
    situation:"未借阅"
  }).get({
    success: res => {
      this.setData({
        queryResult: JSON.stringify(res.data, null, 2),
        products:res.data,
        bookid:res.data[0]._id,
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
  wx.showToast({
    title: '书库中搜索完毕',
  })
 },
  onLoad: function (options) {
    var student = wx.getStorageSync('student');
    var bookid=this.data.bookid;
    console.log(bookid)
    console.log(student);
    // productsCollection.get().then(res =>{
    //   this.setData({
    //     products:res.data
    //   })
    // })
    /*
    搜索书库
    1 无所谓是哪个ID,点预约的时候会添加ID,写入borrow数据库
    2\此处只搜索未借阅的书籍
    3\
    */
    db.collection('search').where({
      //_openid: this.data.openid,
      title: student,
      situation:"未借阅"
    }).get({
      success: res => {
        this.setData({
          queryResult: JSON.stringify(res.data, null, 2),
          products:res.data,
          bookid:res.data[0]._id,
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
    wx.showToast({
      title: '书库中搜索完毕',
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

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