// pages/post/post-detail/post-detail.js

import {
  DBPostES6
} from '../../../db/DBPostES6.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  // 收藏的方法
  onCollectionTap: function(event) {
    // 数据库写在了类数据中,执行数据库中的collect()方法.
    var newData = this.dbPost.collect();

    this.setData({
      'post.collectionStatus': newData.collectionStatus,
      'post.collectionNum': newData.collectionNum
    })

    wx.showToast({
      title: newData.collectionStatus ? '收藏成功' : '取消收藏成功',
      duration: 1000,
      icon: 'success',
      mask: true,
    })

  },

  // 点赞的方法
  onUpTap: function(event) {

    var newData = this.dbPost.up();

    this.setData({
      'post.upStatus': newData.upStatus,
      'post.upNum': newData.upNum,
    })

    wx.showToast({
      title: newData.upStatus ? '点赞成功' : '取消点赞成功',
      duration: 1000,
      icon: 'success',
      mask: true,
    })

  },

  // 评论
  onCommentTap: function(event) {
    var id = event.currentTarget.dataset.postId;
    wx.navigateTo({
      url: 'post-detail-comment/post-detail-comment?id=' + id,
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    // 界面跳转获取参数
    var postId = options.id;
    console.log("haha___" + postId);

    // 使用数据库得到相关的数据,将数据写在数据中
    this.dbPost = new DBPostES6(postId);
    this.postData = this.dbPost.getPostItemById().data;
    this.setData({
      post: this.postData
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    wx.setNavigationBarTitle({
      title: this.postData.title,
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})