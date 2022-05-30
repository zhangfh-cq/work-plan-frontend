import request from '@/utils/request';

const PREFIX = '/bulletin';

// 添加公告
export function addBulletinApi(data) {
  return request({
    url: `${PREFIX}/add`,
    method: 'POST',
    data: data
  });
}

// 获取公告
export function getBulletinApi(params) {
  return request({
    url: `${PREFIX}/list`,
    method: 'GET',
    params: params
  });
}

// 更新公告
export function updateBulletinApi(data) {
  return request({
    url: `${PREFIX}/update`,
    method: 'POST',
    data: data
  });
}

// 删除公告
export function deleteBulletinApi(data) {
  return request({
    url: `${PREFIX}/delete`,
    method: 'POST',
    data: data
  });
}
