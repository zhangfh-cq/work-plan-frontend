import { auditUsersLogoffApi } from '@/api/user';

export default async function handleAuditUser({ agree, user }) {
  const that = this;
  try {
    if (!user) {
      // 多选操作弹框确认
      await that.$warningConfirm(`${agree ? '同意' : '拒绝'}所选用户注销`);
      user = that.table.selectedUsers;
    }
    // 提取数据
    const auditedUserIds = [];
    for (const auditUser of user) {
      auditedUserIds.push(auditUser.id);
    }
    const response = await auditUsersLogoffApi({
      ids: auditedUserIds,
      agree: agree
    });
    if (response.code === 0) {
      that.$successNotify('操作');
      // 重新加载数据
      that.handleSearch();
    } else {
      console.error(response);
      that.$errorNotify(null, '操作');
    }
  } catch (error) {
    if (error !== 'cancel') {
      console.error(error);
      that.$errorNotify(null, '操作');
    }
  }
}
