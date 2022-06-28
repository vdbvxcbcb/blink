// components/like/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    like: {
      type: Boolean,
    },
    count: {
      type: Number,
    },
    readOnly: {
      type: Boolean,
    },
    test: {
      type: Object,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 数据绑定
    // 三元表达式
    //封装性 开放性
    // 封装在内部 ，开放出来的
    // 粒度
    // 非常简单的功能   非常复杂的功能
    yesSrc: 'images/like.png',
    noSrc: 'images/like@dis.png',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLike: function (event) {

      if (this.properties.readOnly) {
        return;
      }
      let like = this.properties.like;
      let count = this.properties.count;

      count = like ? count - 1 : count + 1;
      this.setData({
        count: count,
        like: !like,
      });
      // 激活 自定义事件, 目的是知道搞清楚用户 tap 一下的时候, 是 "点赞" 还是 "取消点赞" (behavior) 并将其传递出去
      let behavior = this.properties.like ? 'like' : 'cancel';
      this.triggerEvent(
        'like',
        {
          behavior: behavior, /* 其实是在设置自定义事件对象 event 的 detail 属性 */
        },
        {}
      );
    },
  },
});
