<template>
  <div class="signup-container">
    <!-- 注册表单 -->
    <el-form
      ref="signupForm"
      :rules="formRules"
      :model="formData"
      class="signup-form"
    >

      <!-- 标题 -->
      <div class="title-container">
        <h3 class="title">工作计划管理系统</h3>
        <h5 class="sub-title">用户注册</h5>
      </div>

      <!-- 用户名称 -->
      <el-form-item prop="username">
        <el-input
          v-model="formData.username"
          type="text"
          placeholder="用户名称"
        />
      </el-form-item>

      <!-- 真实姓名 -->
      <el-form-item prop="realName">
        <el-input
          v-model="formData.realName"
          type="text"
          placeholder="真实姓名"
        />
      </el-form-item>

      <!-- 用户密码 -->
      <el-form-item prop="password">
        <el-input
          v-model="formData.password"
          type="password"
          placeholder="用户密码"
          show-password
        />
      </el-form-item>

      <!-- 重复密码 -->
      <el-form-item prop="repeatedPassword">
        <el-input
          v-model="formData.repeatedPassword"
          type="password"
          placeholder="重复密码"
          show-password
        />
      </el-form-item>

      <!-- 性 别 -->
      <el-form-item prop="gender">
        <el-select
          v-model="formData.gender"
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

      <!-- 年  龄 -->
      <el-form-item prop="age">
        <el-input
          v-model.number="formData.age"
          type="text"
          placeholder="年      龄"
        />
      </el-form-item>

      <!-- 电话号码 -->
      <el-form-item prop="phoneNumber">
        <el-input
          v-model="formData.phoneNumber"
          type="text"
          placeholder="电话号码"
        />
      </el-form-item>

      <!-- 所在支部 -->
      <el-form-item prop="partyBranch">
        <el-input
          v-model="formData.partyBranch"
          type="text"
          placeholder="所在支部"
        />
      </el-form-item>

      <!-- 注册按钮 -->
      <el-button
        :loading="loading"
        type="primary"
        class="operate-button"
        @click.native.prevent="handleSignup"
      >立即注册</el-button>

      <!-- 返回按钮 -->
      <el-button
        type="primary"
        class="operate-button"
        @click.native.prevent="toLogin"
      >返回登录</el-button>

    </el-form>
  </div>
</template>

<script>
import { USER_VALIDATE_RULES } from '@/config/config';
import { signupApi } from '@/api/user';

export default {
  name: 'SignupView',
  data() {
    return {
      formData: {
        username: '',
        realName: '',
        password: '',
        repeatedPassword: '',
        gender: '',
        age: '',
        phoneNumber: '',
        partyBranch: ''
      },
      loading: false
    };
  },
  computed: {
    formRules() {
      const that = this;
      // 密码重复验证规则
      const VALIDATE_RULES = JSON.parse(JSON.stringify(USER_VALIDATE_RULES));
      VALIDATE_RULES.repeatedPassword.push({
        validator: function (rule, value, callback) {
          if (value !== that.formData.password) {
            callback(new Error('两次密码输入不一致'));
          } else {
            callback();
          }
        },
        trigger: 'change'
      });
      return {
        username: VALIDATE_RULES.username,
        realName: VALIDATE_RULES.realName,
        password: VALIDATE_RULES.password,
        repeatedPassword: VALIDATE_RULES.repeatedPassword,
        gender: VALIDATE_RULES.gender,
        age: VALIDATE_RULES.age,
        phoneNumber: VALIDATE_RULES.phoneNumber,
        partyBranch: VALIDATE_RULES.partyBranch
      };
    }
  },
  methods: {
    // 用户注册
    handleSignup() {
      const that = this;
      this.$refs.signupForm.validate(async (valid) => {
        if (valid) {
          that.loading = true;
          // 注册用户
          const response = await signupApi(that.formData);
          if (response.code === 0) {
            // 成功提示
            that.$successMessage('注册成功,请等待审核通过');
            that.$router.push('/login');
          } else {
            console.error(response);
            that.$errorMessage(response.msg || '注册失败');
          }
          that.loading = false;
        } else {
          return false;
        }
      });
    },
    // 跳转登录
    toLogin() {
      this.$router.push('/login');
    }
  }
};
</script>

<style lang="scss">
$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .signup-container .el-input input {
    color: $cursor;
  }
}

.signup-container {
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

.signup-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .signup-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
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
    margin: 0 0 20px 0;
  }
}
</style>
