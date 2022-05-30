import { USER_STATUS } from '@/config/config';
import { getAdminListApi } from '@/api/user';

export default async function getAdminList(params) {
  const that = this;
  that.table.loading = true;
  // 发起请求
  const response = await getAdminListApi({
    ...params,
    status: USER_STATUS.BLOCKED
  });
  if (response.code === 0) {
    // 赋值管理员总数属性
    that.pagination.adminCount = response.data.count;
    // 转化管理员注册时间格式
    for (const admin of response.data.admins) {
      admin.createDate = new Date(admin.createDate).toLocaleString();
    }
    // 赋值管理员列表属性
    that.table.adminList = response.data.admins;
    // 本页无数据且不是第一页则拉取前一页
    if (
      that.table.adminList.length === 0 &&
      that.pagination.currentPage !== 1
    ) {
      that.pagination.currentPage -= 1;
      that.handleSearch();
    }
  } else {
    console.error(response);
    that.$errorNotify(response, '获取管理员列表');
  }
  that.table.loading = false;
}
