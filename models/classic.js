import { HTTP } from '../util/http.js';
/*
  model 主要用来请求数据, get 数据
*/
class ClassicModel extends HTTP {

  getLatest(sCallback) {
    this.request({
      url: 'classic/latest',
      success: (res) => {
        sCallback(res);
        /* 将服务器中保存的最新期刊号 latestIndex 保存到 缓存中 */
        this._setLatestIndex(res.index);
        let key = this._getKey(res.index);
        wx.setStorageSync(key, res);
      },
    });
  }
  /**
   *
   * @param {期刊号} index
   * @param {前一篇还是后一篇} nextOrPrevious
   * @param {成功后的回调函数} sCallback
   * 使用缓存的时候, 一定要注意区分哪些数据是可以被缓存的, 哪些数据是不应该被缓存的。
   * 有一些数据需要实时与服务器交互，此时不应该缓存这类数据，例如 点赞数，favor
   */
  getClassic(index, nextOrPrevious, sCallback) {
    // 缓存中寻找 or API 写入到缓存中
    // key 确定key 缓存中的 key
    let key =
      nextOrPrevious === 'next'
        ? this._getKey(index + 1)
        : this._getKey(index - 1);
    /* 取到缓存 */
    let classic = wx.getStorageSync(key);
    /* 性能优化, 设置缓存, 不要每次点击都发送请求, 缓存未命中, 才发送真正的请求 */
    /* 减少服务器的压力, 同时改善用户体验, 缓存肯定比网络要快的多 */
    if (!classic) {
      this.request({
        url: `classic/${index}/${nextOrPrevious}`,
        success: (res) => {
          /* 写入缓存 key value */
          wx.setStorageSync(this._getKey(res.index), res);
          sCallback(res);
        },
      });
    } else {
      sCallback(classic);
    }
  }

  isFirst(index) {
    return index === 1 ? true : false;
  }

  isLatest(index) {
    /* _getLatestIndex 拿到的就是最新的期刊号(服务器中保存的) */
    let latestIndex = this._getLatestIndex();
    /* index 就是 currentIndex 也就是当前用户所在的期刊期刊号 */
    return latestIndex === index ? true : false;
  }

  getMyFavor(success) {
    const params = {
      url: 'classic/favor',
      success: success,
    };
    this.request(params);
  }

  getById(cid, type, success) {
    let params = {
      url: `classic/${type}/${cid}`,
      success: success,
    };
    this.request(params);
  }

  _setLatestIndex(index) {
    /* key value 缓存 */
    wx.setStorageSync('latest', index);
  }

  /* 读取缓存 */
  _getLatestIndex() {
    const index = wx.getStorageSync('latest');
    return index;
  }
/**
 *
 * @param {期刊号} index
 * @returns
 */
  _getKey(index) {
    /* 设计一个 key 即能够作为 classic 缓存的 key 也可以作为期刊号 index */
    const key = 'classic-' + index;
    return key;
  }
}

export { ClassicModel };
