import { getAwaitSubmitPlansApi } from '@/api/plan';

export default async function getPlans(params) {
  const that = this;
  that.table.loading = true;
  // 获取计划列表
  const response = await getAwaitSubmitPlansApi({ ...params });
  // 判断响应
  if (response.code === 0) {
    that.pagination.dataCount = response.data.count; // 页面总数
    that.table.plans = response.data.plans; // 计划数
    // 格式化时间
    for (const plan of that.table.plans) {
      plan.limitDate = new Date(plan.limitDate).toLocaleString();
      plan.createDate = new Date(plan.createDate).toLocaleString();
      plan.updateDate = new Date(plan.updateDate).toLocaleString();
    }
    // 本页无数据且不是第一页，拉取前一页
    if (that.table.plans.length === 0 && that.pagination.currentPage !== 1) {
      that.pagination.currentPage -= 1;
      that.handleSearch();
    }
  } else {
    console.error(response);
    that.$errorNotify(response, '获取计划列表');
  }
  that.table.loading = false;
}
