<template>
  <div class="option-container">
    <span>选中项：</span>
    <el-button
      type="primary"
      size="medium"
      icon="el-icon-download"
      :disabled="buttonDisable"
      @click="$emit('download-files')"
    >下载文件</el-button>
    <el-button
      type="success"
      size="medium"
      icon="el-icon-check"
      :loading="approveLoading"
      :disabled="buttonDisable"
      @click="$emit('approve-plan')"
    >通过提交</el-button>
    <el-button
      type="danger"
      size="medium"
      icon="el-icon-close"
      :loading="disapproveLoading"
      :disabled="buttonDisable"
      @click="$emit('disapprove-plan')"
    >退回提交</el-button>
  </div>
</template>

<script>
export default {
  name: 'SelectOperate',
  props: {
    buttonDisable: {
      type: Boolean,
      require: true,
      default: false
    },
    approveLoading: {
      type: Boolean,
      require: true,
      default: false
    },
    disapproveLoading: {
      type: Boolean,
      require: true,
      default: false
    }
  }
};
</script>

<style lang="scss" scoped>
.option-container {
  margin: 10px 10px 0;
}
</style>
