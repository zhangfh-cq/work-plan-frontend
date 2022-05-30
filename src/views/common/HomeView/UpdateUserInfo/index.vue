<template>
  <!-- 修改用户信息对话框 -->
  <el-dialog
    :visible.sync="visibleData"
    center
    title="修改用户信息"
    destroy-on-close
  >
    <!-- 用户信息修改表单 -->
    <el-form
      ref="updateForm"
      :rules="updateFormRules"
      :model="updateFormData"
    >
      <!-- 用户名称 -->
      <el-form-item
        label="用户名称"
        prop="username"
      >
        <el-input
          v-model="updateFormData.username"
          clearable
          type="text"
          placeholder="请输入用户名称"
        />
      </el-form-item>
      <!-- 用户密码 -->
      <el-form-item
        label="用户密码(可选)"
        prop="password"
      >
        <el-input
          v-model="updateFormData.password"
          type="password"
          show-password
          placeholder="用户密码"
        />
      </el-form-item>
      <!-- 重复密码 -->
      <el-form-item
        label="重复密码(可选)"
        prop="repeatedPassword"
      >
        <el-input
          v-model="updateFormData.repeatedPassword"
          type="password"
          show-password
          placeholder="重复密码"
        />
      </el-form-item>
      <!-- 性    别 -->
      <el-form-item
        label="性    别"
        prop="gender"
      >
        <el-select
          v-model="updateFormData.gender"
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
          v-model.number="updateFormData.age"
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
          v-model="updateFormData.phoneNumber"
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
          v-model="updateFormData.partyBranch"
          clearable
          type="text"
          placeholder="请输入所在支部"
        />
      </el-form-item>
    </el-form>
    <template v-slot:footer>
      <el-button
        type="primary"
        icon="el-icon-edit"
        :loading="updateUserLoading"
        @click="handleUpdateUser"
      >修改</el-button>
    </template>
  </el-dialog>
</template>

<script>
import { USER_VALIDATE_RULES } from '@/config/config';
import { updateUserInfoApi } from '@/api/user';

export default {
  name: 'UpdateUserInfo',
  props: {
    visible: {
      type: Boolean,
      require: true,
      default: false
    },
    user: {
      type: Object,
      require: true,
      default: () => {}
    }
  },
  data() {
    return {
      visibleData: false,
      updateUserLoading: false, // 更新信息按钮加载状态
      updateFormData: {
        // 表单数据
        username: '',
        password: '',
        repeatedPassword: '',
        gender: '',
        age: null,
        phoneNumber: '',
        partyBranch: ''
      }
    };
  },
  computed: {
    updateFormRules() {
      const that = this;
      // 密码重复验证规则
      const VALIDATE_RULES = JSON.parse(JSON.stringify(USER_VALIDATE_RULES));
      VALIDATE_RULES.repeatedPassword.push({
        validator: function (rule, value, callback) {
          if (value !== '' && value !== that.updateFormData.password) {
            callback(new Error('两次密码输入不一致'));
          } else {
            callback();
          }
        },
        trigger: 'blur'
      });
      VALIDATE_RULES.password[0].required = false;
      VALIDATE_RULES.repeatedPassword[0].required = false;
      return {
        // 表单验证规则
        username: VALIDATE_RULES.username,
        password: VALIDATE_RULES.password,
        repeatedPassword: VALIDATE_RULES.repeatedPassword,
        gender: VALIDATE_RULES.gender,
        age: VALIDATE_RULES.age,
        phoneNumber: VALIDATE_RULES.phoneNumber,
        partyBranch: VALIDATE_RULES.partyBranch
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
    user() {
      const that = this;
      Object.entries(that.updateFormData).forEach(function ([key, value]) {
        that.updateFormData[key] = that.user[key] ? that.user[key] : '';
      });
    }
  },
  methods: {
    // 修改用户信息
    async handleUpdateUser() {
      const that = this;
      that.$refs.updateForm.validate(async function (valid) {
        if (valid) {
          that.updateUserLoading = true;
          // 参数处理
          const data = that.updateFormData;
          if (!data.password) {
            delete data.password;
            delete data.repeatedPassword;
          }
          // 发起请求
          const response = await updateUserInfoApi(that.updateFormData);
          // 处理响应
          if (response.code === 0) {
            await that.$successNotify('更新用户信息');
            // 重新加载数据
            that.$emit('refresh-user-info');
            that.visibleData = false;
          } else {
            console.error(response);
            await that.$errorNotify(response, '更新用户信息');
          }
          that.updateUserLoading = false;
        } else {
          return false;
        }
      });
    }
  }
};
</script>
