import {
  BookModel
} from '../../models/book.js'

import {
  random
} from '../../util/common.js'

const bookModel = new BookModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    books: [],
    searching:false,
    more:''
  },

  /**
   * 生命周期函数--监听页面加
   * 对象: 可以在内部保存状态
   * 普通函数: 不能够在内部保存状态, 一旦调用必须返回(return undefined)
   */
  async onLoad(optins) {
    const books = await bookModel.getHotList()
    /* 记得使用 setData 不要直接赋值 */
    this.setData({
      books
    })
      // .then(res => {
      //   this.setData({
      //     books:res
      //   })
      // })
    // id
  },

  onSearching(event){
    this.setData({
      searching:true
    })
  },

  onCancel(event){
    this.setData({
      searching:false
    })
  },

  onReachBottom(){
    this.setData({
      more:random(16)
    })
  }



})
