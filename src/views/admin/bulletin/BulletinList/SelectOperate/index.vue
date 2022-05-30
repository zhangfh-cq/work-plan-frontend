<template>
  <div class="option-container">
    <span>选中项：</span>
    <el-button
      type="danger"
      size="medium"
      icon="el-icon-delete"
      :loading="deleteLoading"
      :disabled="buttonDisable"
      @click="$emit('delete-bulletin')"
    >删除公告</el-button>
  </div>
</template>

<script>
export default {
  name: 'SelectOperate',
  props: {
    deleteLoading: {
      type: Boolean,
      require: true,
      default: false
    },
    buttonDisable: {
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
