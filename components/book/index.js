// components/book/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    book:Object,
    showLike:{
      type:Boolean,
      value:true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap(event){
      /* 组件自己就知道用户点击的到底是哪一本图书的 id 号, 因此在组件内部编写路由跳转代码 */
      /* 这样就不需要自定义事件, 将 id 传递给 book 页面了, 更方便 */
      /* 但是这样子就牺牲了 组件的通用性, 自己取舍 */
      const bid = this.properties.book.id

      /* 将 bid 通过路由参数的形式, 传递给 book-detail 页面 作为 options 参数的属性 */
      wx.navigateTo({
        url:`/pages/book-detail/book-detail?bid=${bid}`
      })
      // 降低了组件的通用性
      // 非常方便
      // 服务于当前的项目 项目组件
      //
    }
  }
})
