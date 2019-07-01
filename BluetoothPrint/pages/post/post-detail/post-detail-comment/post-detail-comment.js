// pages/post/post-detail/post-detail-comment/post-detail-comment.js
import {
  DBPostES6
} from '../../../../db/DBPostES6.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    useKeyboardFlag: true,
    // keyboardInputValue:'说什么别说了'
  },

  /**
   * 输入并发表新的评论
   */
  submitComment: function(event) {

    var newData = {
      username: 'will',
      create_time: new Date().getTime() / 1000,
      avatar: '/images/avatar/avatar-3.png',
      content: {
        txt: this.keyboardInputValue,
      }
    }

    if (!newData.content.txt) {
      return;
    }

    // 将此条评论加入到缓存数据库中以便于下一次的查看,显示评论成功,当前界面接入新评论,准备迎接写一条评论
    this.dbPost.newComment(newData);
    this.showCommentSuccess();
    this.bindCommentData();
    this.resetAllDefaultStatus();
  },

  showCommentSuccess: function() {
    wx.showToast({
      title: '评论成功',
      duration: 1500,
      icon: 'success',
    })
  },

  bindCommentData: function() {
    var comments = this.dbPost.getCommentData();
    this.setData({
      comments: comments,
    });
  },

  resetAllDefaultStatus: function() {
    this.setData({
      keyboardInputValue: ''
    })
  },

  /**
   * 获取输入框输入的内容,当然可以进行替换输入的内容
   */
  bindCommentInput: function(event) {
    var value = event.detail.value;
    console.log(value);
    this.keyboardInputValue = value;
    // return value.replace(/fuck/g, '****')
  },

  /**
   * 文字和语音的切换
   */
  switchInputType: function(event) {
    this.setData({
      useKeyboardFlag: !this.data.useKeyboardFlag,
    });
  },

  /**
   * 这里的id的获取方式:(id的属性设置是data-x-xxx -- > event.currentTarget.dataset.xXxx)
   * wxml中:data-img-idx="{{imgIdx}}"  js中:event.currentTarget.dataset.imgIdx
   * 可以在后边进行检验???
   */
  previewImg: function(event) {

    // 注意这里id的获取方式
    var commentId = event.currentTarget.dataset.commentIdx; //评论Id
    var imgIdx = event.currentTarget.dataset.imgIdx; //图片的id
    var imgs = this.data.comments[commentId].content.img; //图片地址

    wx.previewImage({
      current: imgs[imgIdx],
      urls: imgs,
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    var id = options.id;

    this.dbPost = new DBPostES6(id);

    var comments = this.dbPost.getCommentData();

    console.log(comments);

    this.setData({
      comments: comments
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

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