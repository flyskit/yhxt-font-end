export const mixin = {
  methods: {
    /** 去除对象中的属性 */
    defineProperty(data, ...params) {
      for (var param of params) {
        Object.defineProperty(data, param, { enumerable: false });
      }
      return data;
    }
  }
};
