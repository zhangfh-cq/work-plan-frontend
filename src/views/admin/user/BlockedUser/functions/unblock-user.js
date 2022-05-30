import { operateBlockedUsersApi } from '@/api/user';

export default async function handleUnblockUser(blockedUsers) {
  const that = this;
  try {
    if (!blockedUsers) {
      // 多个用户操作弹框确认
      await that.$warningConfirm('解封所选用户');
      blockedUsers = that.table.selectedUsers;
    }
    // 解封用户开始
    const blockedUserIds = [];
    for (const blockedUser of blockedUsers) {
      blockedUserIds.push(blockedUser.id);
    }
    const response = await operateBlockedUsersApi({
      ids: blockedUserIds,
      blocked: false
    });
    if (response.code === 0) {
      // 解封用户结束
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
      console.error(error);
      that.$errorNotify(null, '操作');
    }
  }
}
