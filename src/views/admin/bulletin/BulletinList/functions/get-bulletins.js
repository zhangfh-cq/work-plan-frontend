import { getBulletinApi } from '@/api/bulletin';

export default async function getBulletins(params) {
  const that = this;
  that.table.loading = true;
  // 获取计划列表
  const response = await getBulletinApi({ ...params });
  // 判断响应
  if (response.code === 0) {
    that.pagination.dataCount = response.data.count; // 页面总数
    that.table.bulletins = response.data.bulletins; // 计划数
    // 格式化时间
    for (const bulletins of that.table.bulletins) {
      bulletins.createDate = new Date(bulletins.createDate).toLocaleString();
      bulletins.updateDate = new Date(bulletins.updateDate).toLocaleString();
    }
    // 本页无数据且不是第一页，拉取前一页
    if (
      that.table.bulletins.length === 0 &&
      that.pagination.currentPage !== 1
    ) {
      that.pagination.currentPage -= 1;
      that.handleSearch();
    }
  } else {
    console.error(response);
    that.$errorNotify(response, '获取公告列表');
  }
  that.table.loading = false;
}
