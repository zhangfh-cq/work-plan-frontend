<template>
  <div class="option-container">
    <span>选中项：</span>
    <el-button
      type="success"
      size="medium"
      icon="el-icon-unlock"
      :loading="unlockLoading"
      :disabled="buttonDisable"
      @click="$emit('unlock-plan')"
    >解锁计划</el-button>
    <el-button
      type="warning"
      size="medium"
      icon="el-icon-lock"
      :disabled="buttonDisable"
      :loading="lockLoading"
      @click="$emit('lock-plan')"
    >锁定计划</el-button>
    <el-button
      type="danger"
      size="medium"
      icon="el-icon-delete"
      :loading="deleteLoading"
      :disabled="buttonDisable"
      @click="$emit('delete-plan')"
    >删除计划</el-button>
  </div>
</template>

<script>
export default {
  name: 'SelectOperate',
  props: {
    unlockLoading: {
      type: Boolean,
      require: true,
      default: false
    },
    lockLoading: {
      type: Boolean,
      require: true,
      default: false
    },
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
