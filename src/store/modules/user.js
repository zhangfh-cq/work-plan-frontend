import { getUserInfoApi, logoutApi } from '@/api/user';
import { getToken, removeToken } from '@/utils/auth';
import { resetRouter } from '@/router';
import { ROLE_MAP } from '@/config/config';

// 获取用户默认状态
const getDefaultState = () => {
  return {
    token: getToken(),
    roles: []
  };
};

// 状态
const state = getDefaultState();

// 变化
const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState());
  },
  SET_TOKEN: (state, token) => {
    state.token = 'Bearer ' + token;
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles;
  }
};

// 行为
const actions = {
  // 获取用户信息
  async getInfo({ commit }) {
    const response = await getUserInfoApi();
    if (response.code === 0) {
      const userInfo = response.data;
      const roles = [ROLE_MAP[userInfo.role]];

      // 角色必须是非空数组
      if (!roles || roles.length <= 0) {
        throw new Error('获取用户信息错误，角色必须是非空数组！');
      }

      commit('SET_ROLES', roles);
    } else {
      throw new Error(response.msg);
    }
  },

  async logout({ commit }) {
    await logoutApi();
    // 必需先移除TOKEN
    removeToken();
    resetRouter();
    commit('RESET_STATE');
  },

  // 重置TOKEN
  async resetToken({ commit }) {
    // 必需先移除TOKEN
    removeToken();
    commit('RESET_STATE');
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
