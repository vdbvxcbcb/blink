/* 组件中的代码复用, 通过 Behavior 对象, 像编写 component 一样编写 behavior */
const classicBeh = Behavior({
  properties: {
    img: String,
    content: String,
    hidden: Boolean,
  },
  attached: function () {},
  data: {},
  methods: {},
});

export { classicBeh };
