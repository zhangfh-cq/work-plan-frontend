import { operateBlockedAdminsApi } from '@/api/user';

export default async function handleBlockadeAdmin() {
  const that = this;
  try {
    await that.$warningConfirm('封禁所选管理员');
    // 提取数据
    const blockedAdmins = that.table.selectedAdmins;
    const blockedAdminIds = [];
    for (const blockedAdmin of blockedAdmins) {
      blockedAdminIds.push(blockedAdmin.id);
    }
    const response = await operateBlockedAdminsApi({
      ids: blockedAdminIds,
      blocked: true
    });
    if (response.code === 0) {
      that.$successNotify('封禁');
      // 重新加载数据
      this.handleSearch();
    } else {
      console.error(response);
      that.$errorNotify(null, '封禁');
    }
  } catch (error) {
    if (error !== 'cancel') {
      console.error(error);
      that.$errorNotify(null, '封禁');
    }
  }
}
