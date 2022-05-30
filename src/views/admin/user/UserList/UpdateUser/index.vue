<template>
  <el-dialog
    title="修改用户信息"
    :visible.sync="visibleData"
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
      <!-- 真实姓名 -->
      <el-form-item
        label="真实姓名"
        prop="realName"
      >
        <el-input
          v-model="updateFormData.realName"
          clearable
          type="text"
          placeholder="请输入真实姓名"
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
      <!-- 用户角色 -->
      <el-form-item
        v-if="$store.getters.roles.includes('super_admin')"
        label="用户角色 "
        prop="role"
      >
        <el-select
          v-model="updateFormData.role"
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
        label="用户状态"
        prop="status"
      >
        <el-select
          v-model="updateFormData.status"
          :style="{width:'100%'}"
          placeholder="请选择用户状态"
        >
          <el-option
            v-for="option of userStatusOptions"
            :key="option.value"
            :label="option.label"
            :value="option.value"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <template v-slot:footer>
      <el-button
        :disabled="updateUserLoading"
        @click="visibleData=false"
      >取消</el-button>
      <el-button
        type="primary"
        :loading="updateUserLoading"
        @click="handleUpdateUser"
      >修改</el-button>
    </template>
  </el-dialog>
</template>

<script>
import { USER_VALIDATE_RULES, USER_STATUS, ROLE_MAP } from '@/config/config';
import { updateAnyUserApi, updateUsersRoleApi } from '@/api/user';

export default {
  name: 'UpdateUserDialog',
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
      updateUserLoading: false,
      updateFormData: {
        // 表单数据
        username: '',
        realName: '',
        gender: '',
        age: null,
        phoneNumber: '',
        partyBranch: '',
        role: null,
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
      ],
      updateFormRules: {
        // 表单验证规则
        username: USER_VALIDATE_RULES.username,
        realName: USER_VALIDATE_RULES.realName,
        gender: USER_VALIDATE_RULES.gender,
        age: USER_VALIDATE_RULES.age,
        phoneNumber: USER_VALIDATE_RULES.phoneNumber,
        partyBranch: USER_VALIDATE_RULES.partyBranch,
        role: USER_VALIDATE_RULES.role,
        status: USER_VALIDATE_RULES.status
      }
    };
  },
  watch: {
    visible() {
      this.visibleData = this.visible;
    },
    visibleData() {
      this.$emit('update:visible', this.visibleData);
    },
    user() {
      for (const key in this.updateFormData) {
        if (this.user[key] !== undefined) {
          this.updateFormData[key] = this.user[key];
        }
      }
    }
  },
  methods: {
    // 修改用户信息
    async handleUpdateUser() {
      const that = this;
      that.$refs.updateForm.validate(async function (valid) {
        if (valid) {
          that.updateUserLoading = true;
          // 发起请求
          const response = await updateAnyUserApi({
            id: that.user.id,
            ...that.updateFormData
          });
          // 用户角色更改判断
          if (
            that.$store.getters.roles.includes('super_admin') &&
            that.updateFormData.role === 1
          ) {
            const roleResponse = await updateUsersRoleApi({
              ids: [that.user.id]
            });
            if (roleResponse.code !== 0) {
              console.error(response);
              await that.$errorNotify(response, '更新用户角色');
            }
          }
          if (response.code === 0) {
            that.visibleData = false;
            await that.$successNotify('更新用户信息');
            // 重新加载数据
            that.$emit('refresh-data');
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
