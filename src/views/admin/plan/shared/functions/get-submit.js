import { getSubmitHistoryApi } from '@/api/plan';

export default async function getSubmitHistory(params, hasExtra) {
  const that = this;
  that.table.loading = true;
  // 参数处理
  if (hasExtra) {
    params = Object.assign(params, {
      'submit-extra': 'status',
      'extra-value': '待审核'
    });
  }
  // 获取计划列表
  const response = await getSubmitHistoryApi({ ...params });
  // 判断响应
  if (response.code === 0) {
    that.pagination.dataCount = response.data.count; // 页面总数
    that.table.submitList = response.data.submitHistory; // 提交历史
    // 格式化时间
    for (const history of that.table.submitList) {
      history.createDate = new Date(history.createDate).toLocaleString();
      history.plan.limitDate = new Date(
        history.plan.limitDate
      ).toLocaleString();
      history.plan.createDate = new Date(
        history.plan.createDate
      ).toLocaleString();
      history.plan.updateDate = new Date(
        history.plan.updateDate
      ).toLocaleString();
    }
    // 本页无数据且不是第一页，拉取前一页
    if (
      that.table.submitList.length === 0 &&
      that.pagination.currentPage !== 1
    ) {
      that.pagination.currentPage -= 1;
      that.handleSearch();
    }
  } else {
    console.error(response);
    that.$errorNotify(response, '获取提交记录');
  }
  that.table.loading = false;
}
