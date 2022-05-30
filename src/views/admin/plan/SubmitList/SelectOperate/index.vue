<template>
  <div class="container">
    <div class="option-container">
      <span>选中项：</span>
      <el-button
        type="danger"
        size="medium"
        icon="el-icon-delete"
        :disabled="buttonDisable"
        @click="$emit('delete-submit')"
      >删除记录</el-button>
    </div>
    <div class="option-container">
      <span>额外操作：</span>
      <el-button
        type="primary"
        size="medium"
        icon="el-icon-download"
        @click="$emit('download-plan-files')"
      >下载计划提交文件</el-button>
    </div>
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
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: start;
  align-items: center;
  margin: 10px 0;

  .option-container {
    margin: 0 10px;
  }
}
</style>
