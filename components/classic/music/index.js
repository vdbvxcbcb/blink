import { classicBeh } from '../classic-beh.js';

/* 获取全局唯一的背景音频管理器 */
const mMgr = wx.getBackgroundAudioManager();

Component({
  /**
   * 组件的属性列, 动画
   * 动画API CSS3 canvas 游戏
   * 现成
   */
  behaviors: [classicBeh],
  properties: {
    src: String,
    title: String,
  },

  /**
   * 组件的初始数据
   * 播放音乐API 老版API 新版API
   */
  data: {
    playing: false,
    pauseSrc: 'images/player@pause.png',
    playSrc: 'images/player@play.png',
  },

  // hidden ready created
  //onShow
  attached(event) {
    // 跳转页面 当前 切换
    /* hidden 不能触发, wx:if 可以触发 */
    this._recoverStatus();
    this._monitorSwitch();
  },
  /* 在组件实例被从页面节点树移除时执行 hidden 不会触发 detached 因为仅仅是隐藏了 DOM 没有移除 DOM	 */
  detached: function (event) {
    // wx:if hidden
    // mMgr.stop()
    // console.log(123);
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onPlay: function (event) {
      // 图片要切换
      /* 如果没有播放音乐, 我们要播放音乐 */
      if (!this.data.playing) {
        this.setData({
          playing: true,
        });
        mMgr.src = this.properties.src; /* 赋值一个 src 自动播放 */
        mMgr.title = this.properties.title;
      } else {
        /* 当前正在播放音乐, 我们应该执行相反操作 */
        this.setData({
          playing: false,
        });
        mMgr.pause();
      }
    },
    /**
     *
     * @returns null 根据条件重置 playing 属性值
     */
    _recoverStatus: function () {
      if (mMgr.paused) {
        this.setData({
          playing: false,
        });
        return;
      }
      /* 每当用户切换到一个 music 组件的时候, 做一次检测, 检测当前播放的音乐 src 是否与 当前文档中的背景音乐相同 */
      if (mMgr.src == this.properties.src) {
        this.setData({
          playing: true,
        });
      }
    },
    /**
     * 解决后台总控开关，控制音乐图片播放还是暂停的显示切换
     * 一旦后台总控开关发生变化（play pause stop ended）重置 playing 属性值，完成图片切换和后台总控开关同步
     */
    _monitorSwitch: function () {
      mMgr.onPlay(() => {
        this._recoverStatus();
      });
      mMgr.onPause(() => {
        this._recoverStatus();
      });
      /* 关掉后台总控开关 */
      mMgr.onStop(() => {
        this._recoverStatus();
      });
      /* 自然播放完成 */
      mMgr.onEnded(() => {
        this._recoverStatus();
      });
    },
  },
});
