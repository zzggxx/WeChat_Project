const util = require('../utils/util.js')

class DBPostES6 {

  constructor(postId) {
    this.storageKayName = 'postList';
    this.postId = postId;
  }

  getAllPostData() {
    var res = wx.getStorageSync(this.storageKayName);
    if (!res) {
      res = require('../data/data.js').postList;
      this.execSetStorageSync(res);
    }
    return res;
  }

  execSetStorageSync(data) {
    wx.setStorageSync(this.storageKayName, data);
  }

  getPostItemById() {
    var postsData = this.getAllPostData();
    var len = postsData.length;
    for (var i = 0; i < len; i++) {
      if (postsData[i].postId == this.postId) {
        return {
          index: i,
          data: postsData[i]
        }
      }
    }
  }

  // 收藏文章
  collect() {
    return this.updatePostData('collect');
  }
  // 点赞文章
  up() {
    return this.updatePostData('up');
  }

  // 更新数据
  updatePostData(category) {

    var itemData = this.getPostItemById(),
      postData = itemData.data,
      allPostData = this.getAllPostData();

    switch (category) {
      case 'collect':
        if (!postData.collectionStatus) {
          postData.collectNum++;
          postData.collectionStatus = true;
        } else {
          postData.collectNum--;
          postData.collectionStatus = false;
        }
        break;
      case 'up':
        if (!postData.upStatus) {
          postData.upStatus = true;
          postData.upNum++;
        } else {
          postData.upStatus = false;
          postData.upNum--;
        }
        break
      default:
        break;
    }

    allPostData[itemData.index] = postData;
    this.execSetStorageSync(allPostData);
    return postData;

  }

  // 获取评论的数据
  getCommentData() {

    var itemData = this.getPostItemById().data;

    itemData.comments.sort(this.compareWithTime);
    var len = itemData.comments.length,
      comment;
    for (var i = 0; i < len; i++) {
      comment = itemData.comments[i];
      // 时间格式的转换
      comment.create_time = util.getDiffTime(comment.create_time, true);
    }

    return itemData.comments;
  }

  // 时间比较
  compareWithTime(value1, value2) {

    var flag = parseFloat(value1.create_time) - parseFloat(value2.create_time);
    if (flag < 0) {
      return 1
    } else if (flag > 0) {
      return -1
    } else {
      return 0
    }
  }



};

export {
  DBPostES6
}