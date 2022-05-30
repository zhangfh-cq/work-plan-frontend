import { deleteUsersApi } from '@/api/user';

export default async function handleDeleteUser(deletedUsers) {
  const that = this;
  try {
    // 弹框确认
    await that.$warningConfirm('删除用户');
    if (!deletedUsers) {
      deletedUsers = that.table.selectedUsers;
    }
    // 获取参数
    const deletedUserIds = [];
    for (const deletedUser of deletedUsers) {
      deletedUserIds.push(deletedUser.id);
    }
    const response = await deleteUsersApi({ ids: deletedUserIds });
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
