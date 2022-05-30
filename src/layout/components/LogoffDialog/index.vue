<template>
  <!-- 注销用户对话框 -->
  <el-dialog
    :visible.sync="visibleData"
    center
    title="用户注销"
  >
    <!-- 表单 -->
    <el-form
      ref="logoffForm"
      :rules="formRules"
      :model="formData"
    >
      <!-- 用户密码 -->
      <el-form-item
        label="用户密码"
        prop="password"
      >
        <el-input
          v-model="formData.password"
          type="password"
          show-password
          placeholder="请输入用户密码确认"
          @keyup.enter.native="handleUserLogoff"
        />
      </el-form-item>
    </el-form>

    <!-- 按钮 -->
    <template v-slot:footer>
      <el-button
        type="danger"
        icon="el-icon-delete"
        :loading="buttonLoading"
        @click="handleUserLogoff"
      >注销</el-button>
    </template>
  </el-dialog>
</template>

<script>
import { USER_VALIDATE_RULES } from '@/config/config';
import { logoffApi } from '@/api/user';

export default {
  name: 'LogoffDialog',
  props: {
    visible: {
      type: Boolean,
      require: true,
      default: false
    }
  },
  data() {
    return {
      visibleData: false,
      buttonLoading: false,
      formRules: {
        password: USER_VALIDATE_RULES.password
      },
      formData: {
        password: ''
      }
    };
  },
  watch: {
    visible() {
      this.visibleData = this.visible;
    },
    visibleData() {
      this.$emit('update:visible', this.visibleData);
    }
  },
  methods: {
    // 修改用户信息
    async handleUserLogoff() {
      const that = this;
      that.$refs.logoffForm.validate(async function (valid) {
        if (valid) {
          try {
            await that.$warningConfirm('注销用户');
            that.buttonLoading = true;
            // 发起请求
            const response = await logoffApi(that.formData);
            // 处理响应
            if (response.code === 0) {
              await that.$successNotify('注销');
              that.visibleData = false;
              await that.$store.dispatch('user/logout');
              that.$router.push({ name: 'Login' });
            } else {
              await that.$errorNotify(response, '注销');
            }
            that.buttonLoading = false;
          } catch (error) {
            if (error !== 'cancel') {
              throw error;
            }
          }
        } else {
          return false;
        }
      });
    }
  }
};
</script>
