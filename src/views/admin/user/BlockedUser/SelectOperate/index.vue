<template>
  <div class="option-container">
    <span>选中项：</span>
    <el-button
      type="success"
      size="medium"
      icon="el-icon-check"
      :disabled="buttonDisabled"
      @click="$emit('unblock-user')"
    >解封用户</el-button>
    <el-button
      type="danger"
      size="medium"
      icon="el-icon-delete"
      :disabled="buttonDisabled"
      @click="$emit('delete-user')"
    >删除用户</el-button>
  </div>
</template>

<script>
export default {
  name: 'SelectOperate',
  props: {
    buttonDisabled: {
      type: Boolean,
      require: true,
      default: false
    }
  }
};
</script>

<style lang="scss" scoped>
// 选中项
.option-container {
  margin: 10px 10px 0;
}
</style>
