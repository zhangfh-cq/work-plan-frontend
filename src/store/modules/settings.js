import { SETTINGS } from '@/config/config';

// 状态
const state = {
  showSettings: SETTINGS.SHOW_SETTINGS,
  fixedHeader: SETTINGS.FIXED_HEADER,
  sidebarLogo: SETTINGS.SIDEBAR_LOGO
};

// 变化
const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    // eslint-disable-next-line no-prototype-builtins
    if (state.hasOwnProperty(key)) {
      state[key] = value;
    }
  }
};

// 行为
const actions = {
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data);
  }
};

export default {
  // 私有命名空间
  namespaced: true,
  state,
  mutations,
  actions
};
