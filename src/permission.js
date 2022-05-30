import router from './router';
import store from './store';
import { Message } from 'element-ui';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { getToken } from '@/utils/auth';
import getPageTitle from '@/utils/get-page-title';
import { REDIRECT_WHITE_LIST } from '@/config/config';

// 进度条配置
NProgress.configure({ showSpinner: false });

// 全局路由前置守卫
router.beforeEach(async (to, from, next) => {
  // 开始进度条
  NProgress.start();
  // 设置页面标题
  document.title = getPageTitle(to.meta.title);

  // 判断是否有TOKEN
  if (getToken()) {
    if (REDIRECT_WHITE_LIST.includes(to.path)) {
      // 重定向到首页
      next({ name: 'Home' });
      NProgress.done();
    } else {
      // 检查角色是否获取
      const hasRoles = store.getters.roles && store.getters.roles.length > 0;
      if (hasRoles) {
        next();
        NProgress.done();
      } else {
        try {
          // 获取角色，必须为数组
          await store.dispatch('user/getInfo');

          // 根据角色生成路由表
          const accessRoutes = await store.dispatch(
            'permission/generateRoutes',
            store.getters.roles
          );

          // 动态增加可访问路由
          router.addRoutes(accessRoutes);

          // 验证路由表完整并替换路由历史记录
          next({ ...to, replace: true });
        } catch (error) {
          // 移除TOKEN并重定向到登录
          await store.dispatch('user/resetToken');
          Message.error(error || '获取角色失败，请重新登录');
          next({ name: 'Login' });
          NProgress.done();
        }
      }
    }
  } else {
    // 没有TOKEN
    if (REDIRECT_WHITE_LIST.includes(to.path)) {
      next();
    } else {
      // 重定向到登录页面
      next({ name: 'Login' });
      NProgress.done();
    }
  }
});

// 全局后置钩子
router.afterEach(() => {
  // 完成进度条
  NProgress.done();
});
