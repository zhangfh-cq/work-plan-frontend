import Vue from 'vue';
import Router from 'vue-router';
import { ROLE } from '@/config/config';
import Layout from '@/layout';

Vue.use(Router);

/**
 * hidden: true                   如果设置为true，项目将不会显示在侧边栏中（默认值为false）
 * alwaysShow: true               如果设置为true，将始终显示根菜单，如果未设置alwaysShow，则当项目有多个子路线时，它将变成嵌套模式，否则不显示根菜单
 * redirect: noRedirect           如果设置为noRedirect，则面包屑中不会重定向
 * name:'router-name'             该名称由<keep alive>使用（必须设置！！！）
 * meta : {
    roles: ['admin','editor']    控制页面角色（可以设置多个角色）
    title: 'title'               侧边栏和面包屑中显示的名称（推荐设置）
    icon: 'svg-name'/'el-icon-x' 图标显示在侧边栏中
    breadcrumb: false            如果设置为false，则项目将隐藏在面包屑中（默认值为true）
    activeMenu: '/example/list'  如果设置路径，侧边栏将突出显示您设置的路径
  }
 */

// 无需角色权限可访问的页面
export const constantRoutes = [
  // 登录
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/common/LoginView/index'),
    hidden: true
  },

  // 注册
  {
    path: '/signup',
    name: 'Signup',
    component: () => import('@/views/common/SignupView/index'),
    hidden: true
  },

  // 404
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/common/404View/index'),
    hidden: true
  },

  // 首页
  {
    path: '/',
    name: 'Home',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'HomeDetail',
        component: () => import('@/views/common/HomeView/index'),
        meta: { title: '主 页', icon: 'el-icon-s-home' }
      }
    ]
  }
];

// 需要根据用户角色动态加载的路由
export const asyncRoutes = [
  // 用户工作计划
  {
    path: '/plan',
    name: 'Plan',
    component: Layout,
    redirect: '/plan/await-submit',
    meta: {
      title: '工作计划',
      icon: 'el-icon-s-claim',
      roles: [ROLE.USER]
    },
    children: [
      {
        path: 'await-submit',
        name: 'AwaitSubmitPlan',
        component: () => import('@/views/user/plan/AwaitSubmit/index'),
        meta: {
          title: '待提交',
          icon: 'el-icon-info',
          roles: [ROLE.USER]
        }
      },
      {
        path: 'await-audit',
        name: 'AwaitAuditPlan',
        component: () => import('@/views/user/plan/AwaitAudit/index'),
        meta: {
          title: '待审核',
          icon: 'el-icon-question',
          roles: [ROLE.USER]
        }
      },
      {
        path: 'passed',
        name: 'PassedPlan',
        component: () => import('@/views/user/plan/PassedView/index'),
        meta: {
          title: '已通过',
          icon: 'el-icon-success',
          roles: [ROLE.USER]
        }
      },
      {
        path: 'returned',
        name: 'ReturnedPlan',
        component: () => import('@/views/user/plan/ReturnedView/index'),
        meta: {
          title: '已退回',
          icon: 'el-icon-error',
          roles: [ROLE.USER]
        }
      }
    ]
  },

  // 公告管理
  {
    path: '/bulletin',
    name: 'Bulletin',
    component: Layout,
    redirect: '/bulletin/list',
    meta: {
      title: '公告管理',
      icon: 'el-icon-message-solid',
      roles: [ROLE.ADMIN, ROLE.SUPER_ADMIN]
    },
    children: [
      {
        path: 'list',
        name: 'BulletinList',
        component: () => import('@/views/admin/bulletin/BulletinList/index'),
        meta: {
          title: '公告列表',
          icon: 'el-icon-s-order',
          roles: [ROLE.ADMIN, ROLE.SUPER_ADMIN]
        }
      },
      {
        path: 'add',
        name: 'BulletinAdd',
        component: () => import('@/views/admin/bulletin/BulletinAdd/index'),
        meta: {
          title: '发布公告',
          icon: 'el-icon-circle-plus',
          roles: [ROLE.ADMIN, ROLE.SUPER_ADMIN]
        }
      }
    ]
  },

  // 用户管理
  {
    path: '/manage/user',
    name: 'ManageUser',
    component: Layout,
    redirect: '/manage/user/list',
    meta: {
      title: '用户管理',
      icon: 'el-icon-s-custom',
      roles: [ROLE.ADMIN, ROLE.SUPER_ADMIN]
    },
    children: [
      {
        path: 'list',
        name: 'ManageUserList',
        component: () => import('@/views/admin/user/UserList/index'),
        meta: {
          title: '用户列表',
          icon: 'el-icon-s-order',
          roles: [ROLE.ADMIN, ROLE.SUPER_ADMIN]
        }
      },
      {
        path: 'signup',
        name: 'ManageUserSignup',
        component: () => import('@/views/admin/user/AuditSignup/index'),
        meta: {
          title: '注册审核',
          icon: 'el-icon-circle-plus',
          roles: [ROLE.ADMIN, ROLE.SUPER_ADMIN]
        }
      },
      {
        path: 'logout',
        name: 'ManageUserLogout',
        component: () => import('@/views/admin/user/AuditLogout/index'),
        meta: {
          title: '注销审核',
          icon: 'el-icon-remove',
          roles: [ROLE.ADMIN, ROLE.SUPER_ADMIN]
        }
      },
      {
        path: 'blocked',
        name: 'ManageUserBlocked',
        component: () => import('@/views/admin/user/BlockedUser/index'),
        meta: {
          title: '封禁用户',
          icon: 'el-icon-warning',
          roles: [ROLE.ADMIN, ROLE.SUPER_ADMIN]
        }
      }
    ]
  },

  // 管理员工作计划
  {
    path: '/manage/plan',
    name: 'ManagePlan',
    component: Layout,
    redirect: '/manage/plan/list',
    meta: {
      title: '工作计划',
      icon: 'el-icon-s-claim',
      roles: [ROLE.ADMIN, ROLE.SUPER_ADMIN]
    },
    children: [
      {
        path: 'list',
        name: 'ManagePlanList',
        component: () => import('@/views/admin/plan/PlanList/index'),
        meta: {
          title: '计划列表',
          icon: 'el-icon-s-order',
          roles: [ROLE.ADMIN, ROLE.SUPER_ADMIN]
        }
      },
      {
        path: 'publish',
        name: 'ManagePlanPublish',
        component: () => import('@/views/admin/plan/PublishPlan/index'),
        meta: {
          title: '发布计划',
          icon: 'el-icon-circle-plus',
          roles: [ROLE.ADMIN, ROLE.SUPER_ADMIN]
        }
      },
      {
        path: 'audit',
        name: 'ManagePlanAudit',
        component: () => import('@/views/admin/plan/AuditList/index'),
        meta: {
          title: '审核计划',
          icon: 'el-icon-question',
          roles: [ROLE.ADMIN, ROLE.SUPER_ADMIN]
        }
      },
      {
        path: 'submit-list',
        name: 'ManagePlanSubmitList',
        component: () => import('@/views/admin/plan/SubmitList/index'),
        meta: {
          title: '提交记录',
          icon: 'el-icon-s-grid',
          roles: [ROLE.ADMIN, ROLE.SUPER_ADMIN]
        }
      }
    ]
  },

  // 数据可视化
  {
    path: '/data',
    name: 'Data',
    component: Layout,
    redirect: '/data/user',
    meta: {
      title: '系统数据',
      icon: 'el-icon-s-data',
      roles: [ROLE.ADMIN, ROLE.SUPER_ADMIN]
    },
    children: [
      {
        path: 'user',
        name: 'UserData',
        component: () => import('@/views/admin/data/UserData/index'),
        meta: {
          title: '用户数据',
          icon: 'el-icon-s-custom',
          roles: [ROLE.ADMIN, ROLE.SUPER_ADMIN]
        }
      },
      {
        path: 'plan',
        name: 'PlanData',
        component: () => import('@/views/admin/data/PlanData/index'),
        meta: {
          title: '工作计划数据',
          icon: 'el-icon-s-claim',
          roles: [ROLE.ADMIN, ROLE.SUPER_ADMIN]
        }
      }
    ]
  },

  // 管理员管理
  {
    path: '/manage/admin',
    name: 'ManageAdmin',
    component: Layout,
    redirect: '/manage/admin/list',
    meta: {
      title: '管理员',
      icon: 'el-icon-user-solid',
      roles: [ROLE.SUPER_ADMIN]
    },
    children: [
      {
        path: 'list',
        name: 'ManageAdminList',
        component: () => import('@/views/admin/user/AdminList/index'),
        meta: {
          title: '管理员列表',
          icon: 'el-icon-s-order',
          roles: [ROLE.SUPER_ADMIN]
        }
      },
      {
        path: 'blocked',
        name: 'ManageAdminBlocked',
        component: () => import('@/views/admin/user/AdminBlocked/index'),
        meta: {
          title: '封禁管理员',
          icon: 'el-icon-warning',
          roles: [ROLE.SUPER_ADMIN]
        }
      }
    ]
  },

  // // 外链
  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://www.alsaces.cn',
  //       meta: { title: '博客', icon: 'el-icon-link' }
  //     }
  //   ]
  // },

  // 404路由
  { path: '*', redirect: '/404', hidden: true }
];

// 创建静态路由
const createRouter = () =>
  new Router({
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  });

// 重置路由
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher;
}

const router = createRouter();

export default router;
