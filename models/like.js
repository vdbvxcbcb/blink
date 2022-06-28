import { HTTP } from '../util/http.js';

class LikeModel extends HTTP {
  like(behavior, artID, category) {
    /* 点赞 url: /like  取消点赞 url:  /like/cancel 需要根据 behavior 动态决定 */
    let url = behavior == 'like' ? 'like' : 'like/cancel';
    this.request({
      url: url,
      method: 'POST',
      /* 提交到服务器中的 data */
      data: {
        art_id: artID,
        type: category,
      },
    });
  }

  getClassicLikeStatus(artID, category, sCallback) {
    this.request({
      url: 'classic/' + category + '/' + artID + '/favor',
      success: sCallback,
    });
  }
}

export { LikeModel };
