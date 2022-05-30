<template>
  <el-dialog
    center
    title="重命名用户提交文件"
    :visible.sync="visibleData"
    @open="handleDialogOpen"
    @closed="handleDialogClosed"
  >
    <div
      v-if="!isDestroy"
      id="container"
    >
      <el-form
        ref="renameForm"
        :rules="formRules"
        :model="formData"
      >
        <!-- 提交文件名 -->
        <el-form-item
          label="文件名"
          prop="planFile"
        >
          <el-input
            v-model="formData.planFile"
            type="text"
            placeholder="请输入新的提交文件名"
            @keyup.enter.native="updateSubmitFileName"
          />
        </el-form-item>

        <!-- 更改按钮 -->
        <div class="bottom-container">
          <el-button
            type="primary"
            icon="el-icon-edit"
            class="update-button"
            :loading="updateButtonLoading"
            @click="updateSubmitFileName"
          >更新提交文件名</el-button>
        </div>
      </el-form>
    </div>
  </el-dialog>
</template>

<script>
import { PLAN_VALIDATE_RULES } from '@/config/config';
import { renameSubmitFileApi } from '@/api/plan';

export default {
  name: 'RenameSubmitFile',
  props: {
    visible: {
      type: Boolean,
      require: true,
      default: false
    },
    submitItem: {
      type: Object,
      require: true,
      default: () => {}
    }
  },
  data() {
    return {
      visibleData: false,
      isDestroy: true,
      formData: {
        planFile: ''
      },
      formRules: {
        planFile: PLAN_VALIDATE_RULES.planFile
      },
      updateButtonLoading: false
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
    handleDialogOpen() {
      this.isDestroy = false;
      this.formData.planFile = this.submitItem ? this.submitItem.file : '';
    },
    handleDialogClosed() {
      this.isDestroy = true;
    },
    // 更新提交文件名
    async updateSubmitFileName() {
      const that = this;
      that.$refs.renameForm.validate(async function (valid) {
        if (valid) {
          that.updateButtonLoading = true;
          // 发起请求
          const response = await renameSubmitFileApi({
            id: that.submitItem.id,
            newName: that.formData.planFile
          });
          // 处理响应
          if (response.code === 0) {
            that.$successNotify('重命名提交文件');
            that.$emit('refresh-submit');
            setTimeout(function () {
              that.visibleData = false;
            }, 1000);
          } else {
            console.error(response);
            that.$errorNotify(response, '重命名提交文件');
          }
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
#container {
  margin: 10px;
  // 底部盒子
  .bottom-container {
    display: flex;
    justify-content: center;
    align-content: center;
    padding: 10px;
    // 下载按钮
    .update-button {
      padding: 15px;
    }
  }
}
</style>
