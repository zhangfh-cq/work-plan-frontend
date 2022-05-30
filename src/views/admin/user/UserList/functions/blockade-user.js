import { operateBlockedUsersApi } from '@/api/user';

export default async function handleBlockadeUser() {
  const that = this;
  try {
    await that.$warningConfirm('封禁所选用户');
    const users = that.table.selectedUsers;
    // 提取参数
    const blockedUserIds = [];
    for (const blockedUser of users) {
      blockedUserIds.push(blockedUser.id);
    }
    const response = await operateBlockedUsersApi({
      ids: blockedUserIds,
      blocked: true
    });
    if (response.code === 0) {
      that.$successNotify('封禁用户');
      // 重新加载数据
      that.handleSearch();
    } else {
      console.error(response);
      await that.$errorNotify(null, response);
    }
  } catch (error) {
    if (error !== 'cancel') {
      console.error(error);
      await that.$errorNotify(null, '封禁用户');
    }
  }
}
