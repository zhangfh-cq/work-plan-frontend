import axios from 'axios';
import { Message } from 'element-ui';
import store from '@/store';
import { getToken } from '@/utils/auth';
import { BASE_URL, TOKEN_HEADER_KEY } from '@/config/config';

// 创建自定义配置axios实例
const request = axios.create({ baseURL: BASE_URL });

// 请求拦截器
request.interceptors.request.use(
  async function (config) {
    if (store.getters.token) {
      config.headers[TOKEN_HEADER_KEY] = getToken();
    }
    return config;
  },
  async function (error) {
    console.log(error);
    Message({
      type: 'error',
      center: true,
      duration: 5000,
      message: error.message
    });
    throw error;
  }
);

// 响应拦截器
request.interceptors.response.use(
  async function (response) {
    const res = response.data;
    if (!res) {
      Message({
        type: 'error',
        center: true,
        duration: 5000,
        message: '响应值为空'
      });
      return new Error('响应值为空');
    } else {
      return res;
    }
  },
  async function (error) {
    console.log(error);
    Message({
      type: 'error',
      center: true,
      duration: 5000,
      message: error.message
    });
    throw error;
  }
);

export default request;
