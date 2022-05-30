import { deletePlanApi } from '@/api/plan';

export default async function handleDeletePlan(plan) {
  const that = this;
  try {
    // 提示
    await that.$warningConfirm(`删除${plan ? '' : '所选'}计划`);
    if (!plan) {
      that.selections.deleteLoading = true;
    }
    // 获取要删除的Plan
    const deletePlans = [];
    if (plan) {
      deletePlans.push(plan.id);
    } else {
      for (const plan of that.table.selectedPlans) {
        deletePlans.push(plan.id);
      }
    }
    // 发起请求
    const response = await deletePlanApi({ ids: deletePlans });
    // 处理响应
    if (response.code === 0) {
      that.$successNotify('删除工作计划');
      await that.getPlans();
    } else {
      console.error(response);
      await that.$errorNotify(null, '删除工作计划');
    }
  } catch (error) {
    if (error !== 'cancel') {
      console.error(error);
      await that.$errorNotify(null, '删除工作计划');
    }
  }
  if (!plan) {
    that.selections.deleteLoading = false;
  }
}
