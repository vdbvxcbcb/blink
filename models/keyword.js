import { HTTP } from '../util/http-p.js';

class KeywordModel extends HTTP {
  key = 'q'; /* 默认 const */
  maxLength = 10; /* 限制搜索栏的 tag 数量 */
  /* 历史搜索, 使用缓存原理 */
  getHistory() {
    const words = wx.getStorageSync(this.key);
    if (!words) {
      return [];
    }
    return words;
  }

  /* 热门搜索, 从服务器中获取到数据 */
  getHot() {
    return this.request({
      url: 'book/hot_keyword',
    });
  }

  /* 历史搜索写入到缓存 */
  addToHistory(keyword) {
    let words = this.getHistory();
    const has = words.includes(keyword);
    // 队列 栈
    if (!has) {
      // 数组末尾 删除 ， keyword 数组第一位
      const length = words.length;
      if (length >= this.maxLength) {
        words.pop(); /* 删除数组末尾元素 */
      }
      words.unshift(keyword);
      /* 同步 */
      wx.setStorageSync(this.key, words);
    }
  }
}

export { KeywordModel };
