import { USER_STATUS } from '@/config/config';
import { getUserListApi } from '@/api/user';

export default async function getUserList(params) {
  const that = this;
  that.table.loading = true;
  // 获取用户列表
  const response = await getUserListApi({
    ...params,
    status: USER_STATUS.AWAIT_LOGOFF_AUDIT
  });
  if (response.code === 0) {
    // 用户总数
    that.pagination.userCount = response.data.count;
    // 转化用户注册时间格式
    for (const user of response.data.users) {
      user.createDate = new Date(user.createDate).toLocaleString();
    }
    // 用户列表
    that.table.userList = response.data.users;
    // 本页无数据且不是第一页则拉取前一页
    if (that.table.userList.length === 0 && that.pagination.currentPage !== 1) {
      that.pagination.currentPage -= 1;
      that.handleSearch();
    }
  } else {
    console.error(response);
    that.$errorNotify(response, '获取用户列表');
  }
  that.table.loading = false;
}
