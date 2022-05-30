<template>
  <div class="login-container">
    <!-- 登录表单 -->
    <el-form
      ref="loginForm"
      :rules="formRules"
      :model="formData"
      label-position="left"
      class="login-form"
    >

      <!-- 标题 -->
      <div class="title-container">
        <h3 class="title">工作计划管理系统</h3>
        <h5 class="sub-title">用户登录</h5>
      </div>

      <!-- 用户名称 -->
      <el-form-item prop="username">
        <span class="icon-container">
          <i class="el-icon-user" />
        </span>
        <el-input
          v-model="formData.username"
          type="text"
          autocomplete="on"
          name="username"
          placeholder="用户名称"
        />
      </el-form-item>

      <!-- 用户密码 -->
      <el-form-item prop="password">
        <span class="icon-container">
          <i class="el-icon-lock" />
        </span>
        <el-input
          v-model="formData.password"
          type="password"
          placeholder="用户密码"
          name="password"
          autocomplete="on"
          show-password
          @keyup.enter.native="handleLogin"
        />
      </el-form-item>

      <!-- 登录按钮 -->
      <el-button
        type="primary"
        :loading="loading"
        class="operate-button"
        @click.prevent="handleLogin"
      >登录系统</el-button>

      <!-- 注册按钮 -->
      <el-button
        type="primary"
        class="operate-button"
        @click.prevent="toSignup"
      >注册用户</el-button>

    </el-form>
  </div>
</template>

<script>
import { USER_VALIDATE_RULES } from '@/config/config';
import { loginApi } from '@/api/user';
import { setToken } from '@/utils/auth';

export default {
  name: 'LoginView',
  data() {
    return {
      formData: {
        username: '',
        password: ''
      },
      formRules: {
        username: USER_VALIDATE_RULES.username,
        password: USER_VALIDATE_RULES.password
      },
      loading: false
    };
  },
  methods: {
    // 用户登录
    handleLogin() {
      const that = this;
      this.$refs.loginForm.validate(async (valid) => {
        if (valid) {
          that.loading = true;
          // 登录
          const response = await loginApi(that.formData);
          if (response.code === 0) {
            const { token } = response.data;
            // 存储TOKEN
            setToken(token);
            that.$store.commit('user/SET_TOKEN', token);
            // 路由跳转
            that.$router.push({ name: 'Home' });
          } else {
            console.error(response);
            that.$errorMessage(response.msg);
          }
          that.loading = false;
        } else {
          return false;
        }
      });
    },
    // 跳转注册
    toSignup() {
      this.$router.push({ name: 'Signup' });
    }
  }
};
</script>

<style lang="scss">
$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .icon-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 30px auto;
      text-align: center;
      font-weight: bold;
    }

    .sub-title {
      font-size: 20px;
      color: $light_gray;
      margin: 0px auto 30px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .operate-button {
    width: 100%;
    margin: 0 0 25px 0;
  }
}
</style>
