import { ClassicModel } from '../../models/classic.js';
import { LikeModel } from '../../models/like.js';

const classicModel = new ClassicModel();
const likeModel = new LikeModel();
/*
  页面主要用来完成数据绑定的
*/
Component({
  /**
   * 页面的初始数据
   */

  properties: {
    cid: Number,
    type: Number,
  },

  data: {
    classic: null,
    latest: true,
    first: false,
    likeCount: 0,
    likeStatus: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */

  attached(options) {
    const cid = this.properties.cid;
    const type = this.properties.type;
    if (!cid) {
      classicModel.getLatest((res) => {
        this.setData({
          classic: res,
          likeCount: res.fav_nums,
          likeStatus: res.like_status,
        });
      });
    } else {
      classicModel.getById(cid, type, (res) => {
        this._getLikeStatus(res.id, res.type);
        this.setData({
          classic: res,
          latest: classicModel.isLatest(res.index),
          first: classicModel.isFirst(res.index),
        });
      });
    }
  },

  methods: {
    onLike: function (event) {
      /* 接收自定义事件传递过来的 behavior 数据, 挂载在 event.detail 中, 拿到 like 组件当前的状态 "点赞" OR "取消点赞" */
      const behavior = event.detail.behavior;
      /* 向服务器发送数据, 点赞 OR 不点赞 */
      /* type: 期刊类型,这里的类型分为:100 电影 200 音乐 300 句子
      id: 期刊在数据中序号，供点赞使用 */
      likeModel.like(behavior, this.data.classic.id, this.data.classic.type);
    },

    onNext: function (event) {
      /* next 是 nextOrPrevious 的一个选项, 表示下一篇期刊 */
      this._updateClassic('next');
    },

    onPrevious: function (event) {
      /* previous 是 nextOrPrevious 的一个选项, 表示上一篇期刊 */
      this._updateClassic('previous');
    },

    _updateClassic: function (nextOrPrevious) {
      const index = this.data.classic.index;
      classicModel.getClassic(index, nextOrPrevious, (res) => {
        /* success 回调 */
        this._getLikeStatus(res.id, res.type);
        this.setData({
          classic: res,
          /* 更新新的期刊的同时, 还要更新 latest 以及 first */
          latest: classicModel.isLatest(res.index),
          first: classicModel.isFirst(res.index),
        });
      });
    },

    /**
     *
     * @param {点赞对象的 id 号, 用户} artID
     * @param {点赞类型 取消点赞 OR 点赞} category
     */
    _getLikeStatus: function (artID, category) {
      likeModel.getClassicLikeStatus(artID, category, (res) => {
        /* 从服务器中拿到了最新的 id 和 type, 更新 data */
        this.setData({
          likeCount: res.fav_nums,
          likeStatus: res.like_status,
        });
      });
    },
  },
});
