import { downloadSubmitFilesApi } from '@/api/plan';

export default async function handleDownloadSubmitFiles() {
  const that = this;
  that.progress.visible = true;
  // 提取数据
  const submitFilesIds = [];
  for (const submitItem of that.table.selectedAuditItem) {
    submitFilesIds.push(submitItem.id);
  }
  // 发起请求
  const response = await downloadSubmitFilesApi(
    { ids: submitFilesIds },
    that.progress
  );
  // 处理响应
  if (response.type === 'application/json') {
    that.progress.visible = false;
    // 读取错误信息并提示
    const fileReader = new FileReader();
    fileReader.addEventListener('loadend', function (event) {
      console.error(response);
      that.$errorNotify(JSON.parse(event.target.result), '文件下载');
    });
    fileReader.readAsText(response);
  } else {
    // 创建a标签并触发点击事件
    const aTag = document.createElement('a');
    aTag.href = window.URL.createObjectURL(response);
    aTag.download = 'files.zip';
    aTag.click();
  }
  setTimeout(function () {
    that.progress.visible = false;
  }, 1500);
}
