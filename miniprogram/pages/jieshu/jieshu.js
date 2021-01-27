// pages/se/se.js

const db = wx.cloud.database()
const productsCollection = db.collection('borrow')
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    pce:0,
    active:1
  },
  onChange(event) {
    console.log(event)
    this.setData({ active: event.detail });
    if(event.detail==0)
    {
      wx.navigateTo({
        url: '../index/index',
      })
    }
    if(event.detail==2)
    {
      wx.navigateTo({
        url: '../persion/persion',
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  
  
  onLoad: function (options) {
    var id = wx.getStorageSync('zhid');
    console.log(id)
    productsCollection.where({
      _openid: id,
    }).get().then(res =>{
      this.setData({
        products:res.data
      })
    })

  },
  onShow() { //返回显示页面状态函数
    this.setData({ active: 1 });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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
    productsCollection.get().then(res =>{
      this.setData({
        products:res.data
      }),
      wx.stopPullDownRefresh({
        success: (res) => {console.log("成功")},
      })
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("触底了")
     let pce = this.data.pce+20;
    productsCollection.skip(pce).get().then(res=>{
      let new_date=res.data
      let old_date=this.data.products
      this.setData({
        products:old_date.concat(new_date),
        Page:pce,
      }),res=>{
        console.log(pce)
        console.log("数据更新完成")
        wx.stopPullDownRefresh({
          success: (res) => {
          },
        })
      }
    })
     
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})