var DBPost = function(){
  this.storageKayName = 'postList';
}

DBPost.prototype = {

// 得到文章的全部信息
  getAllPostData:function(){
    var res = wx.getStorageSync(this.storageKayName);
    if(!res){
      res = require('../data/data.js').postList;
      this.execSetStorageSync(res);
    }
    return res;
  },

// 本地缓存 保存和更新
  execSetStorageSync:function(data){
    wx.setStorageSync(this.storageKayName, data);
  },

};


module.exports = {
  DBPost:DBPost
};