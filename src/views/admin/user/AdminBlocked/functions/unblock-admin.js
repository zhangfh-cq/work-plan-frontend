import { operateBlockedAdminsApi } from '@/api/user';

export default async function handleUnblockAdmin(blockedAdmins) {
  const that = this;
  try {
    if (!blockedAdmins) {
      // 多个用户操作弹框确认
      await that.$warningConfirm('解封所选管理员');
      blockedAdmins = that.table.selectedAdmins;
    }
    // 提取数据
    const blockedAdminIds = [];
    for (const blockedAdmin of blockedAdmins) {
      blockedAdminIds.push(blockedAdmin.id);
    }
    const response = await operateBlockedAdminsApi({
      ids: blockedAdminIds,
      blocked: false
    });
    if (response.code === 0) {
      that.$successNotify('解封');
      // 重新加载数据
      await that.getAdminList('解封');
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
