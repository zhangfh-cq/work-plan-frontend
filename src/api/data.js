import request from '@/utils/request';

const PREFIX = '/data';

// 获取计划完成数量情况
export function getPlanCompleteDataApi(params) {
  return request({
    url: `${PREFIX}/plan/complete`,
    method: 'GET',
    params: params
  });
}

// 计划审核状态情况
export function getPlanAuditDataApi(params) {
  return request({
    url: `${PREFIX}/plan/audit`,
    method: 'GET',
    params: params
  });
}

// 计划提交时间状况
export function getPlanSubmitDateDataApi(params) {
  return request({
    url: `${PREFIX}/plan/submit`,
    method: 'GET',
    params: params
  });
}

// 获取管理员发布的计划数量数据
export function getPlanPublisherDataApi() {
  return request({
    url: `${PREFIX}/plan/publisher`,
    method: 'GET'
  });
}

// 获取用户性别数量数据
export function getUserGenderDataApi() {
  return request({
    url: `${PREFIX}/user/gender`,
    method: 'GET'
  });
}

// 获取用户年龄数据
export function getUserAgeDataApi() {
  return request({
    url: `${PREFIX}/user/age`,
    method: 'GET'
  });
}
