import { getUserInfoApi } from '@/api/user';
import { ROLE_MAP } from '@/config/config';

export default async function getUserInfo() {
  const that = this;
  that.userInfoLoading = true;
  // 获取用户信息
  const response = await getUserInfoApi();
  // 判断响应
  if (response.code === 0) {
    that.user = response.data; // 用户信息
    // 格式化时间
    that.user.createDate = new Date(that.user.createDate).toLocaleString();
    that.user.updateDate = new Date(that.user.updateDate).toLocaleString();
    that.user.role = ROLE_MAP[that.user.role];
  } else {
    console.error(response);
    that.$errorNotify(response, '获取用户信息');
  }
  that.userInfoLoading = false;
}
