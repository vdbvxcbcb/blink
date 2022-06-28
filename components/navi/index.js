// components/navi/navi.js
Component({
  /**
   * 组件的属性列表
   * 考虑有哪些数据是需要从外部传递过来的
   */
  properties: {
    title: String,
    first: Boolean, /* 最新一期? 左边箭头变灰, 不可点击 */
    latest: Boolean /* 最后一期? 右边箭头变灰, 不可点击 */
  },

  /**
   * 组件的初始数据
   */
  data: {
    disLeftSrc: 'images/triangle.dis@left.png',
    leftSrc: 'images/triangle@left.png',
    disRightSrc: 'images/triangle.dis@right.png',
    rightSrc: 'images/triangle@right.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLeft: function (event) {
      /* 自定义事件, 告诉 page 用户点击了 向左的箭头 */
      if (!this.properties.latest) {
        /* 如果是 latest 根本不触发 */
        this.triggerEvent('left', {}, {})
      }
    },

    onRight: function (event) {
      /* 自定义事件, 告诉 page 用户点击了 向右的箭头 */
      if (!this.properties.first) {
        /* 如果是 first 根本不触发 */
        this.triggerEvent('right', {}, {})
      }
    }

  }
})
