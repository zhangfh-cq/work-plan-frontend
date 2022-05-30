import { deleteAdminsApi } from '@/api/user';

export default async function handleDeleteAdmin(deletedAdmins) {
  const that = this;
  try {
    // 弹框确认
    await that.$warningConfirm('删除管理员');
    if (!deletedAdmins) {
      deletedAdmins = that.table.selectedAdmins;
    }
    // 获取数据
    const deletedAdminIds = [];
    for (const deletedAdmin of deletedAdmins) {
      deletedAdminIds.push(deletedAdmin.id);
    }
    const response = await deleteAdminsApi({ ids: deletedAdminIds });
    // 处理响应
    if (response.code === 0) {
      that.$successNotify('删除');
      // 重新加载数据
      that.handleSearch();
    } else {
      console.error(response);
      that.$errorNotify(null, '删除');
    }
  } catch (error) {
    if (error !== 'cancel') {
      console.error(error);
      that.$errorNotify(null, '删除');
    }
  }
}
