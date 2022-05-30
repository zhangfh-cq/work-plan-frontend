import { deleteSubmitApi } from '@/api/plan';

export default async function handleDeleteSubmit(submitItem) {
  const that = this;
  try {
    // 提示
    await that.$warningConfirm(`删除${submitItem ? '' : '所选'}记录`);
    // 获取要通过的审核项
    const deleteSubmitItems = [];
    if (submitItem) {
      deleteSubmitItems.push(submitItem.id);
    } else {
      for (const deleteItem of that.table.selectedSubmitItem) {
        deleteSubmitItems.push(deleteItem.id);
      }
    }
    // 发起请求
    const response = await deleteSubmitApi({
      ids: deleteSubmitItems
    });
    // 处理响应
    if (response.code === 0) {
      that.$successNotify('删除提交记录');
      await that.handleSearch();
    } else {
      console.error(response);
      await that.$errorNotify(null, '删除提交记录');
    }
  } catch (error) {
    if (error !== 'cancel') {
      console.error(error);
      await that.$errorNotify(null, '删除提交记录');
    }
  }
}
