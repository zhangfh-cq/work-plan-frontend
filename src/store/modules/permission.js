import { asyncRoutes, constantRoutes } from '@/router';

/**
 * 使用meta.role判断用户是否有权限
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some((role) => route.meta.roles.includes(role));
  } else {
    return true;
  }
}

/**
 * 递归过滤异步路由表
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = [];

  routes.forEach((route) => {
    const tmp = { ...route };
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles);
      }
      res.push(tmp);
    }
  });

  return res;
}

// 状态
const state = {
  routes: [],
  addRoutes: []
};

// 变化
const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes;
    state.routes = constantRoutes.concat(routes);
  }
};

// 行为
const actions = {
  async generateRoutes({ commit }, roles) {
    const accessedRoutes = filterAsyncRoutes(asyncRoutes, roles);
    commit('SET_ROUTES', accessedRoutes);
    return accessedRoutes;
  }
};

export default {
  // 私有命名空间
  namespaced: true,
  state,
  mutations,
  actions
};
