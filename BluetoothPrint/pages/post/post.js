// 直接加载的方式
// var dataObject = require('../../data/data.js')

// 时候用数据库的加载方式
// var DBPost = require('../../db/DBPost.js').DBPost;

// 使用ES6的数据库方式
import {DBPostES6} from '../../db/DBPostES6.js';

// pages/post/post.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  // onLoad: function () {
  //   this.setData ({
  //     title: "这是一根雪糕的经济学原理..."
  //   })
  // },

// 跳转到详情界面
  onTapToDetail:function(event){
    // event.cuttentTarget.dataset注意
    var postId = event.currentTarget.dataset.postId;
    wx.navigateTo({
      url: 'post-detail/post-detail?id='+postId,
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


    // this.setData({
    //   title: "这是一根雪糕的经济学原理..."
    // })


      // (在data数据还没有移到data/data.js的时候)虽然data中没有数据但是这里就是在指定了数据
      // this.setData({
        // postList:postList
      // })

      // 直接加载的方式添加数据
      // this.setData({
      //   postList:dataObject.postList
      // })

      //使用数据库的加载方式加载数据 
      // var dbPost = new DBPost();
      // this.setData({
      //   postList:dbPost.getAllPostData()
      // }); 

      //使用数据库的ES6方式加载(其中包括了数据的缓存和加载)
      var dbPostES6 = new DBPostES6();
      this.setData({
        postList: dbPostES6.getAllPostData()
      });


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