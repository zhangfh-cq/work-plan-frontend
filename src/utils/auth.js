import Cookies from 'js-cookie';
import { TOKEN_KEY } from '@/config/config';

// 获取TOKEN
export function getToken() {
  return Cookies.get(TOKEN_KEY);
}

// 设置TOKEN
export function setToken(token) {
  return Cookies.set(TOKEN_KEY, 'Bearer ' + token);
}

// 移除TOKEN
export function removeToken() {
  return Cookies.remove(TOKEN_KEY);
}
