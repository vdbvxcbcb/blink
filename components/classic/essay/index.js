import {classicBeh} from '../classic-beh.js'

Component({
  /**
   * 组件的属性列表
   */
  behaviors:[classicBeh],
  // behaviors:[classicBeh, bh1, bh2], 多继承 后面覆盖前面, 组件内部定义的覆盖继承的
  /* behavior 中的生命周期函数, 不会存在覆盖现象, 而是会依次调用每个 behavior 中的生命周期函数, 最后再调用组件内部自己定义的生命周期函数 */
  // 多继承
  properties: {
  },

  attached:function(){

  },
// behavior 行为
  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
