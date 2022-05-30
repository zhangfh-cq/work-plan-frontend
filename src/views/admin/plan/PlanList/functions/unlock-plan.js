import { unlockPlansApi } from '@/api/plan';

export default async function handleUnlockPlan() {
  const that = this;
  try {
    // 提示
    await that.$warningConfirm('解锁所选计划');
    that.selections.unlockLoading = true;
    // 获取要解锁的Plan
    const unlockPlans = [];
    for (const plan of that.table.selectedPlans) {
      unlockPlans.push(plan.id);
    }
    // 发起请求
    const response = await unlockPlansApi({ ids: unlockPlans });
    // 处理响应
    if (response.code === 0) {
      that.$successNotify('解锁工作计划');
      await that.getPlans();
    } else {
      console.error(response);
      await that.$errorNotify(null, '解锁工作计划');
    }
  } catch (error) {
    if (error !== 'cancel') {
      console.error(error);
      await that.$errorNotify(null, '解锁工作计划');
    }
  }
  that.selections.unlockLoading = false;
}
