import { auditSubmitApi } from '@/api/plan';

export default async function handleApprovePlan(auditItem) {
  const that = this;
  try {
    // 提示
    if (!auditItem) {
      await that.$warningConfirm('通过所选提交');
    }
    // 获取要通过的审核项
    const approveAuditItems = [];
    if (auditItem) {
      approveAuditItems.push(auditItem.id);
    } else {
      for (const auditItem of that.table.selectedAuditItem) {
        approveAuditItems.push(auditItem.id);
      }
    }
    // 发起请求
    const response = await auditSubmitApi({
      ids: approveAuditItems,
      status: '通过'
    });
    // 处理响应
    if (response.code === 0) {
      that.$successNotify('通过用户提交');
      that.handleSearch();
    } else {
      console.error(response);
      await that.$errorNotify(null, '通过用户提交');
    }
  } catch (error) {
    if (error !== 'cancel') {
      console.error(error);
      await that.$errorNotify(null, '通过用户提交');
    }
  }
}
