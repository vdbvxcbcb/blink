// components/episode/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    /* 自定义属性 */
    index: {
      type: String,
      /* observe 函数, 监听 index 属性的更改, 更改后触发 */
      /* 在组件内部处理, 不满十位, 补零, 补零之后 不要用 Number 用 String! (8 VS 08) */
      observer: function (newVal, oldVal, changedPath) {
        let val = newVal < 10 ? '0' + newVal : newVal;
        this.setData({
          // index: val, 内存泄露, 无限递归, 不要在 observe 函数里面更新属性自身, 也就是 setData !
          _index: val,
        });
      },
    },
  },
  // wxs

  /**
   * 组件的初始数据
   */
  data: {
    months: [
      '一月',
      '二月',
      '三月',
      '四月',
      '五月',
      '六月',
      '七月',
      '八月',
      '九月',
      '十月',
      '十一月',
      '十二月',
    ],
    year: 0 /* data 中的数据不能像 properties 中的数据一样给一个类型 String Number 而是要具体给一个值 '' 0  */,
    month: '',
    _index: '',
  },
  /* 组件的声明周期函数, attached(常用) created(不能使用 setData)  */
  attached: function () {
    // console.log(this.properties);
    // console.log(this.data);
    /* 小程序会将 properties 对象和 data 对象合成一个对象 */
    /* data 和 properties 不要出现同名变量, 否则覆盖, properties 会覆盖 data 中的变量(同名的话) */
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth(); /* month 从 0 开始数! */

    this.setData({
      year,
      month: this.data.months[month], /* 6 => 七月 */
    });
  },

  /**
   * 组件的方法列表
   */
  methods: {},
});
