// 站点标题
export const SITE_TITLE = '工作计划管理系统';
// 后端API地址
export const BASE_URL = 'http://localhost:3000';
// 没有TOKEN时重定向白名单
export const REDIRECT_WHITE_LIST = ['/login', '/signup', '/404'];
// TOKEN HTTP Header字段
export const TOKEN_HEADER_KEY = 'Authorization';
// TOKEN存储Key
export const TOKEN_KEY = 'Token';
// 角色映射
export const ROLE_MAP = ['user', 'admin', 'super_admin'];
// 角色列表
export const ROLE = {
  USER: 'user',
  ADMIN: 'admin',
  SUPER_ADMIN: 'super_admin'
};
// 用户状态
export const USER_STATUS = {
  AWAIT_SIGNUP_AUDIT: '注册审核中',
  NORMAL: '正常',
  BLOCKED: '封禁中',
  AWAIT_LOGOFF_AUDIT: '注销审核中'
};
// 计划状态
export const PLAN_STATUS = {
  NORMAL: '正常',
  EXPIRED: '已过期',
  LOCKED: '已锁定'
};
// 提交状态
export const SUBMIT_STATUS = {
  AWAIT_AUDIT: '待审核',
  APPROVED: '通过',
  UNAPPROVED: '未通过'
};
// 设置
export const SETTINGS = {
  SHOW_SETTINGS: false,
  FIXED_HEADER: false,
  SIDEBAR_LOGO: false
};
// 用户表单验证规则
export const USER_VALIDATE_RULES = {
  username: [
    {
      required: true,
      message: '请输入用户名称',
      trigger: 'blur'
    },
    {
      type: 'string',
      min: 1,
      max: 20,
      message: '用户名称长度在1到20之间',
      trigger: 'blur'
    }
  ],
  realName: [
    {
      type: 'string',
      required: true,
      message: '请输入真实姓名',
      trigger: 'blur'
    },
    { min: 1, max: 20, message: '真实姓名长度在1到20之间', trigger: 'blur' }
  ],
  password: [
    {
      type: 'string',
      required: true,
      message: '请输入用户密码',
      trigger: 'blur'
    },
    { min: 1, max: 16, message: '用户密码长度在6到16之间', trigger: 'blur' }
  ],
  repeatedPassword: [
    {
      type: 'string',
      required: true,
      message: '请再次输入用户密码',
      trigger: 'blur'
    }
  ],
  gender: [
    {
      type: 'string',
      required: true,
      message: '请选择性别',
      trigger: 'blur'
    },
    {
      validator: function (rule, value, callback) {
        value !== '男' && value !== '女'
          ? callback(new Error('性别只能是男或女'))
          : callback();
      }
    }
  ],
  age: [
    {
      required: true,
      message: '请输入年龄',
      trigger: 'blur'
    },
    {
      type: 'integer',
      min: 1,
      max: 150,
      message: '年龄只能是1到150之间的整数',
      trigger: 'blur'
    }
  ],
  phoneNumber: [
    {
      type: 'string',
      required: true,
      message: '请输入电话号码',
      trigger: 'blur'
    },
    {
      min: 8,
      max: 20,
      message: '电话号码长度只能在8到20之间',
      trigger: 'blur'
    }
  ],
  partyBranch: [
    {
      type: 'string',
      required: true,
      message: '请输入所在支部',
      trigger: 'blur'
    },
    {
      min: 1,
      max: 30,
      message: '所在支部长度只能在1到30之间',
      trigger: 'blur'
    }
  ],
  role: [
    {
      type: 'integer',
      required: true,
      message: '请选择用户角色',
      trigger: 'blur'
    }
    // {
    //   validator: function (rule, value, callback) {
    //     if (ROLE_MAP[value]) {
    //       callback(new Error(`用户角色只能是0或1}`));
    //     } else {
    //       callback();
    //     }
    //   }
    // }
  ],
  status: [
    {
      type: 'string',
      required: true,
      message: '请选择用户状态',
      trigger: 'blur'
    },
    {
      validator: function (rule, value, callback) {
        value !== USER_STATUS.NORMAL && value !== USER_STATUS.BLOCKED
          ? callback(
              new Error(
                `用户状态只能是${USER_STATUS.NORMAL}或${USER_STATUS.BLOCKED}`
              )
            )
          : callback();
      }
    }
  ]
};
// 计划表单验证规则
export const PLAN_VALIDATE_RULES = {
  id: [
    {
      required: true,
      message: '请输入计划ID',
      trigger: 'blur'
    },
    {
      type: 'integer',
      min: 1,
      message: '计划ID不能小于0',
      trigger: 'blur'
    }
  ],
  title: [
    {
      type: 'string',
      required: true,
      message: '请输入工作计划标题',
      trigger: 'blur'
    },
    {
      min: 1,
      max: 50,
      message: '工作计划标题长度只能在1到50之间',
      trigger: 'blur'
    }
  ],
  content: [
    {
      type: 'string',
      required: true,
      message: '请输入工作计划内容',
      trigger: 'blur'
    },
    {
      min: 1,
      max: 1000,
      message: '工作计划内容长度只能在1到1000之间',
      trigger: 'blur'
    }
  ],
  limitDate: [
    {
      type: 'date',
      required: true,
      message: '请选择工作计划限制时间',
      trigger: 'blur'
    },
    {
      validator: function (rule, value, callback) {
        if (Date.parse(value) < Date.now()) {
          callback(new Error('限制时间不能小于当前时间'));
        } else {
          callback();
        }
      }
    }
  ],
  planFile: [
    {
      type: 'string',
      required: false,
      message: '请上传工作计划文件',
      trigger: 'blur'
    },
    {
      min: 1,
      max: 100,
      message: '工作计划文件长度只能在1到100之间',
      trigger: 'blur'
    }
  ],
  changeComments: [
    {
      type: 'string',
      required: false,
      message: '请输入更改备注',
      trigger: 'blur'
    },
    {
      min: 1,
      max: 300,
      message: '更改备注只能在1到300之间',
      trigger: 'blur'
    }
  ]
};
// 公告表单验证规则
export const BULLETIN_VALIDATE_RULES = {
  title: [
    {
      type: 'string',
      required: true,
      message: '请输入系统公告标题',
      trigger: 'blur'
    },
    {
      min: 1,
      max: 30,
      message: '系统公告标题长度只能在1到30之间',
      trigger: 'blur'
    }
  ],
  content: [
    {
      type: 'string',
      required: true,
      message: '请输入系统公告内容',
      trigger: 'blur'
    },
    {
      min: 1,
      max: 1000,
      message: '系统公告内容长度只能在1到500之间',
      trigger: 'blur'
    }
  ]
};
