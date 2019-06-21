//index.js
//获取应用实例
const app = getApp()

Page({

  // 界面的数据
  data: {
    motto: 'Hello World',
    userInfo: {},

    id: 1,
    id2:2,

    a:1,
    b:1,
    c:1,

    object:{
      key:"hello"
    },
    array:["main"],

    customer_zero:0,

    // 控件的属性数据
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')

  },

// 欢迎界面跳转到文章列表界面
  onTapJump:function(event){
    wx.navigateTo({
      url: '../post/post',
    })
  },

  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs',
      success:function(){
        console.log("jump success");
      },
      failed:function(){
        console.log("jump failed");
      },
      complete:function(){
        console.log("jump complete");
      }
    })
  },

  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },

  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
