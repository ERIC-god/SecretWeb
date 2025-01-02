import axios from "axios";
import { useUserStore } from "../store/modules/user";

const service = axios.create({
  // 根据项目的状态，自动切换请求的服务地址
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 5000,
});

/**
 *  请求拦截器  是在请求发送前的处理
 */
service.interceptors.request.use(
  (config) => {
    const userStore = useUserStore();
    config.headers.Authorization = `Bearer ${userStore.token}`;
    // return 出的对象, 就是请求的配置对象
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

/**
 * 响应拦截器：
 * 服务端返回数据之后，!!!! .then之前被调用
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
    // 处理 token 超时
    if (
      error.response &&
      error.response.data &&
      error.response.data.code === 401
    ) {
      // 退出
      userStore.userLogout();
    }
    return Promise.reject(err);
  }
);

export default service;
