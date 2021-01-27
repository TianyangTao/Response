Page({
  data: {
    value:'',
    imgUrls: [          
      '../images/1.jpeg',
      '../images/2.jpg',
      '../images/3.jpeg',
      '../images/4.jpg',
      '../images/5.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1300,
    bg: '#C79C77',
    Height:""     //这是swiper要动态设置的高度属性
   },
   clickbutton2(){
    wx.navigateTo({
      url: '../huanshu/huanshu',
    })
   },
   clickbutton1(){
    wx.navigateTo({
      url: '../search/search',
    })
   },
   onSearch() {
    wx.setStorage({
      key: "student",
      data: this.data.value
    })
    wx.navigateTo({
      url: '../search/search',
    })
   },
   onClick() {
    console.log("11");
    wx.navigateTo({
      url: '../search/search',
    })
    
   },
   onChangeSearch(e){
    this.setData({
      value: e.detail,
    });
   },
   onChange(event) {
     this.setData(
       {
         active: event.detail 
        }
     );
    if(event.detail==1)
    {
      wx.navigateTo({
        url: '../se/se',
      })
    }
    if(event.detail==2)
    {
      wx.navigateTo({
        url: '../persion/persion',
      })
    }
  },
  
  imgHeight:function(e){
    var winWid = wx.getSystemInfoSync().windowWidth; //获取当前屏幕的宽度
    var imgh=e.detail.height;//图片高度
    var imgw=e.detail.width;//图片宽度
    var swiperH=winWid*imgh/imgw-30 + "px"//等比设置swiper的高度。 即 屏幕宽度 / swiper高度 = 图片宽度 / 图片高度  ==》swiper高度 = 屏幕宽度 * 图片高度 / 图片宽度
    this.setData({
      Height:swiperH//设置高度
    })
  },
  // changeProperty: function (e) {
  //   var propertyName = e.currentTarget.dataset.propertyName
  //   var newData = {}
  //   newData[propertyName] = e.detail.value
  //   this.setData(newData)
  // },
  changeIndicatorDots: function (e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function (e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function (e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function (e) {
    this.setData({
      duration: e.detail.value
    })
  }
})
