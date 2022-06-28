import { config } from '../config.js';
import { promisic } from './common.js';

const tips = {
  1: '抱歉，出现了一个错误',
  1005: 'appkey无效，请前往www.7yue.pro申请',
  3000: '期刊不存在',
};
// # 解构
class HTTP {
  /* 默认值, 别人就知道需要传递什么类型的参数了 */
  /* 对象的结构 */
  request({ url, data = {}, method = 'GET' }) {
    return new Promise((resolve, reject) => {
      this._request(url, resolve, reject, data, method);
    });
  }
  /* 必填参数必须放在默认参数之前 */
  _request(url, resolve, reject, data = {}, method = 'GET') {
    wx.request({
      url: config.api_base_url + url,
      method: method,
      data: data,
      header: {
        'content-type': 'application/json',
        appkey: config.appkey,
      },
      success: (res) => {
        const code = res.statusCode.toString();
        if (code.startsWith('2')) {
          /* 成功，使用 resolve 将 res.data 传递出去 */
          resolve(res.data);
        } else {
          /* 失败，调用 reject 函数 */
          reject();
          const error_code = res.data.error_code;
          this._show_error(error_code);
        }
      },
      fail: (err) => {
        reject();
        this._show_error(1);
      },
    });
  }

  _show_error(error_code) {
    if (!error_code) {
      error_code = 1;
    }
    const tip = tips[error_code];
    wx.showToast({
      title: tip ? tip : tips[1],
      icon: 'none',
      duration: 2000,
    });
  }
}

export { HTTP };
