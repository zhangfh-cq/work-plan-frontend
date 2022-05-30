import { lockPlanAPi } from '@/api/plan';

export default async function handleLockPlan() {
  const that = this;
  try {
    // 提示
    await that.$warningConfirm('锁定所选计划');
    that.selections.lockLoading = true;
    // 获取要锁定的Plan
    const lockPlans = [];
    for (const plan of that.table.selectedPlans) {
      lockPlans.push(plan.id);
    }
    // 发起请求
    const response = await lockPlanAPi({ ids: lockPlans });
    // 处理响应
    if (response.code === 0) {
      that.$successNotify('锁定工作计划');
      await that.getPlans();
    } else {
      console.error(response);
      await that.$errorNotify(null, '锁定工作计划');
    }
  } catch (error) {
    if (error !== 'cancel') {
      console.error(error);
      await that.$errorNotify(null, '锁定工作计划');
    }
  }
  that.selections.lockLoading = false;
}
