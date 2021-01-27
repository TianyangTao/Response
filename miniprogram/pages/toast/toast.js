// pages/toast/toast.js
const db = wx.cloud.database()
const productsCollection = db.collection('search')
Page({

  /**
   * 页面的初始数据
   */
  data: {
      book:"",
      weizhi:"",
      adress:"123",
      product:[{
        adress:"地址",
        col:"2",
        rol:"3",
        image:"",
        situation:"",
        title:"",
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var searchbook = wx.getStorageSync('searchbook');
    var adress=this.data.adress;
    db.collection('search').where({
      //_openid: this.data.openid,
      _id: searchbook
    }).get({
      success: res => {
        this.setData({
          queryResult: JSON.stringify(res.data, null, 2),
          products:res.data,
           adress:"res.data"
        })
        db.collection('borrow').add({
          data: {
            image:res.data[0].image,
            title:res.data[0].title,
            situation:res.data[0].situation,
            row:res.data[0].row,
            col:res.data[0].col,
            adress:res.data[0].adress,
          },
          success: res => {
            // 在返回结果中会包含新创建的记录的 _id
            console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
          },
          fail: err => {
            console.error('[数据库] [新增记录] 失败：', err)
          }
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
   
   console.log("数组内的值为"+adress)
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