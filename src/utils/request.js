import axios from "axios";

const service = axios.create({
  // 根据项目的状态，自动切换请求的服务地址
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 5000,
});

/**
 * 响应拦截器：
 * 服务端返回数据之后， .then之前被调用
 */

service.interceptors.response.use(
  (res) => {
    // 简化服务端传过来的数据
    const { success, message, data } = res.data;
    if (success) {
      return data;
    }
    return Promise.reject(new Error(message));
  },
  (err) => {
    return err;
  }
);

export default service;
