// pages/book-detail/book-detail.js
/*
  Page 处理 ui 交互
  Module 处理数据请求发送的具体实现(业务逻辑)
*/
import { BookModel } from '../../models/book.js';
import { LikeModel } from '../../models/like.js';
const bookModel = new BookModel();
const likeModel = new LikeModel();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    comments: [],
    book: null,
    likeStatus: false,
    likeCount: 0,
    posting: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    wx.showLoading(); /* 还没有取到数据, 显示 Loading 转圈 */
    /* options 接收到 路由参数 */
    const bid = options.bid;
    /* 取到三个 Promise */
    const detail = bookModel.getDetail(bid);
    const comments = bookModel.getComments(bid);
    const likeStatus = bookModel.getLikeStatus(bid);

    /* 并行发送请求 好于 串行发送请求 */
    /* 使用 all 方法, 可以确实收到三个请求的结果, 然后取消 Loading 状态 */
    Promise.all([detail, comments, likeStatus]).then((res) => {
      this.setData({
        book: res[0],
        comments: res[1].comments,
        likeStatus: res[2].like_status,
        likeCount: res[2].fav_nums,
      });
      wx.hideLoading(); /* 取消 Loading 转圈 */
    });

    // detail.then(res => {
    //   console.log(res)
    //   this.setData({
    //     book: res
    //   })
    //   wx.hideLoading()
    // })

    // comments.then(res => {
    //   console.log(res)
    //   this.setData({
    //     comments: res.comments
    //   })
    // })

    // likeStatus.then(res => {
    //   console.log(res)
    //   this.setData({
    //     likeStatus: res.like_status,
    //     likeCount: res.fav_nums
    //   })
    // })
    // wx.hideLoading()
  },

  onLike(event) {
    const like_or_cancel = event.detail.behavior;
    /* 发送请求, 服务器更新 like */
    likeModel.like(like_or_cancel, this.data.book.id, 400);
  },

  onFakePost(event) {
    this.setData({
      posting: true,
    });
  },

  onCancel(event) {
    this.setData({
      posting: false,
    });
  },

  onPost(event) {
    /* 通过 event.detail 拿到组件传递过来的数据 */
    /* 用户点击 tag 发送的 text 以及用户自己输入的 value(input 输入框) */
    const comment = event.detail.text || event.detail.value;

    if (!comment) {
      return;
    }

    if (comment.length > 12) {
      wx.showToast({
        title: '短评最多12个字',
        icon: 'none',
      });
      return;
    }

    bookModel.postComment(this.data.book.id, comment).then((res) => {
      wx.showToast({
        title: '+ 1',
        icon: 'none',
      });

      /* 用户添加的短评, 添加到 comments 数组中去(添加到数组的第一个元素中) */
      this.data.comments.unshift({
        content: comment,
        nums: 1,
      });

      /* setData 更新 comments 数组 */
      this.setData({
        comments: this.data.comments,
        posting: false /* 设为 false 关闭 mask 蒙层 */,
      });
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
});
