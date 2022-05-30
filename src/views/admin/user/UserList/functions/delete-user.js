import { deleteUsersApi } from '@/api/user';

export default async function handleDeleteUser(users) {
  const that = this;
  try {
    // 弹框确认
    await that.$warningConfirm('删除用户');
    if (!users) {
      users = that.table.selectedUsers;
    }
    // 提取参数
    const deletedUserIds = [];
    for (const deletedUser of users) {
      deletedUserIds.push(deletedUser.id);
    }
    const response = await deleteUsersApi({ ids: deletedUserIds });
    if (response.code === 0) {
      that.$successNotify('删除用户');
      // 重新加载数据
      that.handleSearch();
    } else {
      console.error(response);
      throw new Error();
    }
  } catch (error) {
    if (error !== 'cancel') {
      console.error(error);
      await that.$errorNotify(null, '删除用户');
    }
  }
}
