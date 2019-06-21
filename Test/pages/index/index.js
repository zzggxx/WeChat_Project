//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    array: [
    {
      message: 'foo',
    }, {
      message: 'bar'
    }, {
      message: 'bar2'
    }, {
      message: 'bar3'
    }]
  },

  onLoad: function (options) {
    // 页面初始化
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面推到后台
  },
  onUnload: function () {
    // 页面关闭
  }

})
