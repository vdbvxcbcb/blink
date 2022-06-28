// components/tag/index.js
Component({
  /**
   * 组件的属性列表
   */

  options: {
    /* 启用 slot */
    multipleSlots: true,
  },
  externalClasses: ['tag-class'], /* 外部样式类 */
  properties: {
    text: String,
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    onTap(event) {
      /* 自定义事件 */
      this.triggerEvent('tapping', {
        text: this.properties.text,
      });
    },
  },
});
