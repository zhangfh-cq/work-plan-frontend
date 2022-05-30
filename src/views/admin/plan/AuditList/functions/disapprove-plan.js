import { auditSubmitApi } from '@/api/plan';

export default async function handleDisapprovePlan(auditItem) {
  const that = this;
  try {
    // 提示
    if (!auditItem) {
      await that.$warningConfirm('退回所选提交');
    }
    // 获取要通过的审核项
    const disapproveAuditItems = [];
    if (auditItem) {
      disapproveAuditItems.push(auditItem.id);
    } else {
      for (const auditItem of that.table.selectedAuditItem) {
        disapproveAuditItems.push(auditItem.id);
      }
    }
    // 发起请求
    const response = await auditSubmitApi({
      ids: disapproveAuditItems,
      status: '未通过'
    });
    // 处理响应
    if (response.code === 0) {
      that.$successNotify('退回用户提交');
      that.handleSearch();
    } else {
      console.error(response);
      await that.$errorNotify(null, '退回提交');
    }
  } catch (error) {
    if (error !== 'cancel') {
      console.error(error);
      await that.$errorNotify(null, '退回提交');
    }
  }
}
