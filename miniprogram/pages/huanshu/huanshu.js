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
      bookid:"123",
      search_1:1,
      situation:"已借阅",
      activeNames: ['1'],
      title:"123",
      datebase:[
        {
          title:"书书书",
          adress:"书书书"
        },
        {
          title:"嘟嘟嘟",
          adress:"书书书"
        }
      ]
  },
  
  onviewchange(event) {
    this.setData({
      activeNames: event.detail,
    });
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
    var bookid=this.data.bookid;
    var situation=this.data.situation;
    console.log(bookid)
    console.log(situation);
    var zhid = wx.getStorageSync('zhid');

    db.collection('borrow').where({
      _openid: zhid,
      situation:"已借阅"
    }).get({
      success: res => {
        this.setData({
          queryResult: JSON.stringify(res.data, null, 2),
          products:res.data,
          bookid:res.data[0]._id,
          datebase:res.data
        })
        console.log(title)
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
      title: '记录中搜索完毕',
    })
  },
})