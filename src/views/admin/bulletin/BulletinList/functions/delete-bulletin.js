import { deleteBulletinApi } from '@/api/bulletin';

export default async function handleDeleteBulletin(bulletin) {
  const that = this;
  try {
    // 提示
    await that.$warningConfirm(`删除${bulletin ? '' : '所选'}公告`);
    if (!bulletin) {
      that.selections.deleteLoading = true;
    }
    // 获取要删除的公告
    const deleteBulletins = [];
    if (bulletin) {
      deleteBulletins.push(bulletin.id);
    } else {
      for (const bulletin of that.table.selectedBulletins) {
        deleteBulletins.push(bulletin.id);
      }
    }
    // 发起请求
    const response = await deleteBulletinApi({ ids: deleteBulletins });
    // 处理响应
    if (response.code === 0) {
      that.$successNotify('删除公告');
      that.handleSearch();
    } else {
      console.error(response);
      await that.$errorNotify(null, '删除公告');
    }
  } catch (error) {
    if (error !== 'cancel') {
      console.error(error);
      await that.$errorNotify(null, '删除公告');
    }
  }
  if (!bulletin) {
    that.selections.deleteLoading = false;
  }
}
