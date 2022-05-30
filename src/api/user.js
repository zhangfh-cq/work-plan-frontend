import request from '@/utils/request';

// *************************************************************
// *************************** 普通用户 *************************
// *************************************************************
const PREFIX_NORMAL = '/user';
// 注册
export function signupApi(data) {
  return request({
    url: `${PREFIX_NORMAL}/signup`,
    method: 'POST',
    data
  });
}

// 登录
export function loginApi(data) {
  return request({
    url: `${PREFIX_NORMAL}/login`,
    method: 'POST',
    data
  });
}

// 获取用户信息
export function getUserInfoApi() {
  return request({
    url: `${PREFIX_NORMAL}/info`,
    method: 'GET'
  });
}

// 更新用户信息
export function updateUserInfoApi(data) {
  return request({
    url: `${PREFIX_NORMAL}/update`,
    method: 'POST',
    data: data
  });
}

// 退出登录
export function logoutApi() {
  return request({
    url: `${PREFIX_NORMAL}/logout`,
    method: 'POST'
  });
}

// 用户注销
export function logoffApi(data) {
  return request({
    url: `${PREFIX_NORMAL}/logoff`,
    method: 'POST',
    data: data
  });
}

// *************************************************************
// *************************** 管理员 ***************************
// *************************************************************
const PREFIX_ADMIN = '/user/manage';
// 获取用户列表
export function getUserListApi(params) {
  return request({
    url: `${PREFIX_ADMIN}/list`,
    method: 'GET',
    params: params
  });
}

// 更新任意用户信息
export function updateAnyUserApi(data) {
  return request({
    url: `${PREFIX_ADMIN}/update`,
    method: 'POST',
    data: data
  });
}

// 删除任意用户
export function deleteUsersApi(data) {
  return request({
    url: `${PREFIX_ADMIN}/delete`,
    method: 'POST',
    data: data
  });
}

// 审核用户注册
export function auditUsersSignupApi(data) {
  return request({
    url: `${PREFIX_ADMIN}/audit/signup`,
    method: 'POST',
    data: data
  });
}

// 审核用户注销
export function auditUsersLogoffApi(data) {
  return request({
    url: `${PREFIX_ADMIN}/audit/logoff`,
    method: 'POST',
    data: data
  });
}

// 用户封禁操作
export function operateBlockedUsersApi(data) {
  return request({
    url: `${PREFIX_ADMIN}/blocked`,
    method: 'POST',
    data: data
  });
}

// *************************************************************
// *************************** 超级管理员 ***********************
// *************************************************************
const PREFIX_SUPER_ADMIN = '/user/admin';
// 更改用户角色为管理员
export function updateUsersRoleApi(data) {
  return request({
    url: `${PREFIX_SUPER_ADMIN}/new`,
    method: 'POST',
    data: data
  });
}
// 获取管理员列表
export function getAdminListApi(params) {
  return request({
    url: `${PREFIX_SUPER_ADMIN}/list`,
    method: 'GET',
    params: params
  });
}

// 添加管理员
export function addAdminApi(data) {
  return request({
    url: `${PREFIX_SUPER_ADMIN}/add`,
    method: 'POST',
    data: data
  });
}

// 更新管理员信息
export function updateAnyAdminApi(data) {
  return request({
    url: `${PREFIX_SUPER_ADMIN}/update`,
    method: 'POST',
    data: data
  });
}

// 批量删除管理员
export function deleteAdminsApi(data) {
  return request({
    url: `${PREFIX_SUPER_ADMIN}/delete`,
    method: 'POST',
    data: data
  });
}

// 管理员封禁操作
export function operateBlockedAdminsApi(data) {
  return request({
    url: `${PREFIX_SUPER_ADMIN}/blocked`,
    method: 'POST',
    data: data
  });
}
