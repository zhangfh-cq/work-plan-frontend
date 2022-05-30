<template>
  <div class="option-container">
    <span>选中项：</span>
    <el-button
      type="success"
      size="medium"
      icon="el-icon-check"
      :disabled="buttonDisabled"
      @click="$emit('approve-logout', { agree: true });"
    >同意注销</el-button>
    <el-button
      type="danger"
      size="medium"
      icon="el-icon-close"
      :disabled="buttonDisabled"
      @click="$emit('disapprove-logout', { agree: false })"
    >拒绝注销</el-button>
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
