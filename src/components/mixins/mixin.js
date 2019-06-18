import axios from 'axios';

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

/** 拦截器 */
axios.interceptors.response.use(
  response => {
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
    // 否则的话抛出错误
    if (response.data.status === 200) {
      return Promise.resolve(response);
    } else {
      alert(response.data.info);
      return Promise.reject(response);
    }
  }
);
