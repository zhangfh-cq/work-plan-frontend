import request from '@/utils/request';

// *************************************************************
// *************************** 普通用户 *************************
// *************************************************************
const PREFIX = '/plan';

// 获取未提交的工作计划
export function getAwaitSubmitPlansApi(params) {
  return request({
    url: `${PREFIX}/await/list`,
    method: 'GET',
    params: params
  });
}

// 获取用户提交记录
export function getUserSubmitHistoryApi(params) {
  return request({
    url: `${PREFIX}/submit/list`,
    method: 'GET',
    params: params
  });
}

// 提交工作计划材料
export function submitPlanFileApi(data, onProgress) {
  return request({
    url: `${PREFIX}/submit/file`,
    method: 'POST',
    data: data,
    onUploadProgress(event) {
      const percentage = Math.floor((event.loaded / event.total) * 100);
      onProgress({ percentage: percentage });
    }
  });
}

// 下载计划文件
export function downloadPlanFileApi(params, progress) {
  return request({
    url: `${PREFIX}/file`,
    method: 'GET',
    params: params,
    responseType: 'blob',
    onDownloadProgress(event) {
      progress.percentage = Math.floor((event.loaded / event.total) * 100);
    }
  });
}

// 下载提交文件
export function downloadSubmitFileApi(params, progress) {
  return request({
    url: `${PREFIX}/submit/file`,
    method: 'GET',
    params: params,
    responseType: 'blob',
    onDownloadProgress(event) {
      progress.percentage = Math.floor((event.loaded / event.total) * 100);
    }
  });
}

// *************************************************************
// *************************** 管理员 ***************************
// *************************************************************

// 获取工作计划列表
export function getPlanListApi(params) {
  return request({
    url: `${PREFIX}/list`,
    method: 'GET',
    params: params
  });
}

// 添加工作计划
export function addPlanApi(data, onProgress) {
  return request({
    url: `${PREFIX}/add`,
    method: 'POST',
    data: data,
    onUploadProgress(event) {
      const percentage = Math.floor((event.loaded / event.total) * 100);
      onProgress({ percentage: percentage });
    }
  });
}

// 更新工作计划
export function updatePlanAPi(data, onProgress) {
  return request({
    url: `${PREFIX}/update`,
    method: 'POST',
    data: data,
    onUploadProgress(event) {
      const percentage = Math.floor((event.loaded / event.total) * 100);
      onProgress({ percentage: percentage });
    }
  });
}

// 删除工作计划
export function deletePlanApi(data) {
  return request({
    url: `${PREFIX}/delete`,
    method: 'POST',
    data: data
  });
}

// 锁定工作计划
export function lockPlanAPi(data) {
  return request({
    url: `${PREFIX}/lock`,
    method: 'POST',
    data: data
  });
}

// 解锁工作计划
export function unlockPlansApi(data) {
  return request({
    url: `${PREFIX}/unlock`,
    method: 'POST',
    data: data
  });
}

// 获取提交记录
export function getSubmitHistoryApi(params) {
  return request({
    url: `${PREFIX}/submit/history`,
    method: 'GET',
    params: params
  });
}

// 审核提交记录
export function auditSubmitApi(data) {
  return request({
    url: `${PREFIX}/submit/audit`,
    method: 'POST',
    data: data
  });
}

// 删除提交记录
export function deleteSubmitApi(data) {
  return request({
    url: `${PREFIX}/submit/delete`,
    method: 'POST',
    data: data
  });
}

// 获取计划更新历史
export function getPlanUpdateHistoryAPi(params) {
  return request({
    url: `${PREFIX}/update/history`,
    method: 'GET',
    params: params
  });
}

// 获取计划完成状态
export function getPlanCompleteStatusApi(params) {
  return request({
    url: `${PREFIX}/complete`,
    method: 'GET',
    params: params
  });
}

// 下载用户提交文件
export function downloadAnySubmitFileAPi(params, progress) {
  return request({
    url: `${PREFIX}/submit/user-file`,
    method: 'GET',
    params: params,
    responseType: 'blob',
    onDownloadProgress(event) {
      progress.percentage = Math.floor((event.loaded / event.total) * 100);
    }
  });
}

// 下载任意数量的提交文件
export function downloadSubmitFilesApi(data, progress) {
  return request({
    url: `${PREFIX}/submit/files`,
    method: 'POST',
    data: data,
    responseType: 'blob',
    onDownloadProgress(event) {
      progress.percentage = Math.floor((event.loaded / event.total) * 100);
    }
  });
}

// 下载计划所有的提交文件
export function downloadPlanAllSubmitFileApi(params, progress) {
  return request({
    url: `${PREFIX}/submit/all-file`,
    method: 'GET',
    params: params,
    responseType: 'blob',
    onDownloadProgress(event) {
      progress.percentage = Math.floor((event.loaded / event.loaded) * 100);
    }
  });
}

// 重命名提交文件
export function renameSubmitFileApi(data) {
  return request({
    url: `${PREFIX}/submit/rename-file`,
    method: 'POST',
    data: data
  });
}
