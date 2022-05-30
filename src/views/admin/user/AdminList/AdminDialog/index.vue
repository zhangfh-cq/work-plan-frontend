<template>
  <el-dialog
    :title="isUpdateForm?'修改用户信息':'添加用户'"
    :visible.sync="visibleData"
    destroy-on-close
  >
    <!-- 用户信息表单 -->
    <el-form
      ref="adminForm"
      :rules="adminFormRules"
      :model="adminFormData"
    >
      <!-- 用户名称 -->
      <el-form-item
        label="用户名称"
        prop="username"
      >
        <el-input
          v-model="adminFormData.username"
          clearable
          type="text"
          placeholder="请输入用户名称"
        />
      </el-form-item>
      <!-- 真实姓名 -->
      <el-form-item
        label="真实姓名"
        prop="realName"
      >
        <el-input
          v-model="adminFormData.realName"
          clearable
          type="text"
          placeholder="请输入真实姓名"
        />
      </el-form-item>
      <!-- 用户密码 -->
      <el-form-item
        v-if="!isUpdateForm"
        clearable
        label="用户密码"
        prop="password"
      >
        <el-input
          v-model="adminFormData.password"
          clearable
          type="password"
          show-password
          placeholder="请输入用户密码"
        />
      </el-form-item>
      <!-- 重复密码 -->
      <el-form-item
        v-if="!isUpdateForm"
        label="重复密码"
        prop="repeatedPassword"
      >
        <el-input
          v-model="adminFormData.repeatedPassword"
          clearable
          type="password"
          show-password
          placeholder="请重复输入密码"
        />
      </el-form-item>
      <!-- 性    别 -->
      <el-form-item
        label="性    别"
        prop="gender"
      >
        <el-select
          v-model="adminFormData.gender"
          :style="{width:'100%'}"
          placeholder="请选择性别"
        >
          <el-option
            label="男"
            value="男"
          />
          <el-option
            label="女"
            value="女"
          />
        </el-select>
      </el-form-item>
      <!-- 年    龄 -->
      <el-form-item
        label="年    龄"
        prop="age"
      >
        <el-input
          v-model.number="adminFormData.age"
          clearable
          type="text"
          placeholder="请输入年龄"
        />
      </el-form-item>
      <!-- 电话号码 -->
      <el-form-item
        label="电话号码"
        prop="phoneNumber"
      >
        <el-input
          v-model="adminFormData.phoneNumber"
          clearable
          type="text"
          placeholder="请输入电话号码"
        />
      </el-form-item>
      <!-- 所在支部 -->
      <el-form-item
        label="所在支部"
        prop="partyBranch"
      >
        <el-input
          v-model="adminFormData.partyBranch"
          clearable
          type="text"
          placeholder="请输入所在支部"
        />
      </el-form-item>
      <!-- 用户角色 -->
      <el-form-item
        v-if="isUpdateForm"
        label="用户角色 "
        prop="role"
      >
        <el-select
          v-model="adminFormData.role"
          :style="{width:'100%'}"
          placeholder="请选择用户角色 "
        >
          <el-option
            v-for="option of userRoleOptions"
            :key="option.value"
            :value="option.value"
            :label="option.label"
          />
        </el-select>
      </el-form-item>
      <!-- 用户状态 -->
      <el-form-item
        v-if="isUpdateForm"
        label="用户状态"
        prop="status"
      >
        <el-select
          v-model="adminFormData.status"
          :style="{width:'100%'}"
          placeholder="请选择用户状态"
        >
          <el-option
            v-for="option of userStatusOptions"
            :key="option.value"
            :value="option.value"
            :label="option.label"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <template v-slot:footer>
      <el-button
        :disabled="operateAdminLoading"
        @click="visibleData=false"
      >取消</el-button>
      <el-button
        type="primary"
        :loading="operateAdminLoading"
        @click="handleOperateAdmin"
      >确定</el-button>
    </template>
  </el-dialog>
</template>

<script>
import { USER_VALIDATE_RULES, USER_STATUS, ROLE_MAP } from '@/config/config';
import { updateAnyAdminApi, addAdminApi } from '@/api/user';

export default {
  name: 'AdminDialog',
  props: {
    visible: {
      type: Boolean,
      require: true,
      default: false
    },
    isUpdateForm: {
      type: Boolean,
      require: true,
      default: true
    },
    admin: {
      type: Object,
      require: true,
      default: () => {}
    }
  },
  data() {
    return {
      visibleData: false,
      operateAdminLoading: false,
      adminFormData: {
        // 表单数据
        username: '',
        realName: '',
        password: '',
        repeatedPassword: '',
        gender: null,
        age: null,
        phoneNumber: '',
        partyBranch: '',
        role: 1,
        status: ''
      },
      userStatusOptions: [
        // 用户状态选择
        { label: USER_STATUS.NORMAL, value: USER_STATUS.NORMAL },
        { label: USER_STATUS.BLOCKED, value: USER_STATUS.BLOCKED }
      ],
      userRoleOptions: [
        // 用户角色选择
        { label: ROLE_MAP[0], value: 0 },
        { label: ROLE_MAP[1], value: 1 }
      ]
    };
  },
  computed: {
    adminFormRules() {
      const that = this;
      // 密码重复验证规则
      const VALIDATE_RULES = JSON.parse(JSON.stringify(USER_VALIDATE_RULES));
      VALIDATE_RULES.repeatedPassword.push({
        validator: function (rule, value, callback) {
          if (value !== that.adminFormData.password) {
            callback(new Error('两次密码输入不一致'));
          } else {
            callback();
          }
        },
        trigger: 'blur'
      });
      return {
        // 表单验证规则
        username: VALIDATE_RULES.username,
        realName: VALIDATE_RULES.realName,
        password: VALIDATE_RULES.password,
        repeatedPassword: VALIDATE_RULES.repeatedPassword,
        gender: VALIDATE_RULES.gender,
        age: VALIDATE_RULES.age,
        phoneNumber: VALIDATE_RULES.phoneNumber,
        partyBranch: VALIDATE_RULES.partyBranch,
        role: VALIDATE_RULES.role,
        status: VALIDATE_RULES.status
      };
    }
  },
  watch: {
    visible() {
      this.visibleData = this.visible;
    },
    visibleData() {
      this.$emit('update:visible', this.visibleData);
    },
    isUpdateForm() {
      if (!this.isUpdateForm) {
        this.adminFormData = {};
      }
    },
    admin() {
      for (const key in this.adminFormData) {
        if (this.admin[key] !== undefined) {
          this.adminFormData[key] = this.admin[key];
        }
      }
      this.adminFormData.role = ROLE_MAP.indexOf(this.admin.role);
    }
  },
  methods: {
    // 修改/添加管理员
    handleOperateAdmin() {
      const that = this;
      that.$refs.adminForm.validate(async function (valid) {
        if (valid) {
          that.operateAdminLoading = true;
          // 发起请求
          let response;
          if (that.isUpdateForm) {
            response = await updateAnyAdminApi({
              id: that.admin.id,
              ...that.adminFormData
            });
          } else {
            response = await addAdminApi(that.adminFormData);
          }
          // 处理响应
          if (response.code === 0) {
            that.$successNotify('操作');
            that.$emit('refresh-data');
            that.visibleData = false;
          } else {
            console.error(response);
            that.$errorNotify(response, '操作');
          }
          that.operateAdminLoading = false;
        } else {
          return false;
        }
      });
    }
  }
};
</script>
