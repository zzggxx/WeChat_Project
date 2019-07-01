// 数据调用使用了require而wxml和wxss使用了import
const util = require('../utils/util.js')

// 数据库的操作方法
class DBPostES6 {

  // 构造方法,注意没有变量的声明,需要写this
  constructor(postId) {
    this.storageKayName = 'postList';
    this.postId = postId;
  }

  // 获取全部数据,添加缓存
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

  // 根据id获取数据,id由构造方法传入的.
  getPostItemById() {
    var postsData = this.getAllPostData();
    var len = postsData.length;
    for (var i = 0; i < len; i++) {
      if (postsData[i].postId == this.postId) {
        // 元素本身的含义?
        return {
          index: i,
          data: postsData[i]
        }
      }
    }
  }

  // 新增评论
  newComment(newComment) {
    this.updatePostData('comment', newComment);
  }

  // 收藏文章
  collect() {
    return updatePostData('collect');
  }

  // 点赞文章
  up() {
    return updatePostData('up');
  }

  // 根据类型,更新数据   收藏和点赞用
  updatePostData(category, newComment) {

    // 在文章详情中每一个子类都持有一个数据库,所以都有一个唯一的id.
    var itemData = this.getPostItemById();
    // 已经存在了定义所以这里不用定义了??????????????????????????
    var postData = itemData.data;
    var allPostData = this.getAllPostData();

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
      case 'comment':
        postData.comments.push(newComment);
        postData.commentNum++;
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