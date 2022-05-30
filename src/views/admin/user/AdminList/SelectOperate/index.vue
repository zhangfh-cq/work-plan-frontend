<template>
  <div class="option-container">
    <span class="option-item">操作：</span>
    <el-button
      type="primary"
      size="medium"
      icon="el-icon-plus"
      class="option-item"
      @click="$emit('add-admin')"
    >添加管理员</el-button>
    <el-button
      type="warning"
      size="medium"
      icon="el-icon-warning-outline"
      class="option-item"
      :disabled="buttonDisabled"
      @click="$emit('blockade-admin')"
    >封禁选中管理员</el-button>
    <el-button
      type="danger"
      size="medium"
      icon="el-icon-delete"
      class="option-item"
      :disabled="buttonDisabled"
      @click="$emit('delete-admin')"
    >删除选中管理员</el-button>
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
