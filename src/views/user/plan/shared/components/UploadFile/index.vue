<template>
  <el-dialog
    :visible.sync="visibleData"
    center
    title="上传计划材料"
    @open="handleDialogOpen"
    @closed="handleDialogClosed"
  >
    <div
      v-if="!isDestroy"
      id="container"
    >
      <el-upload
        ref="upload"
        :auto-upload="false"
        action="#"
        drag
        :limit="1"
        :multiple="false"
        :before-upload="handleBeforeUpload"
        :on-progress="handleOnProgress"
        :http-request="handleUploadFile"
      >
        <i class="el-icon-upload" />
        <div>将文件拖到此处，或<em>点击上传</em></div>
        <template v-slot:tip>
          <p class="tip-text">上传文件大小不能超过100MB</p>
        </template>
      </el-upload>

      <!-- 进度条 -->
      <el-progress
        v-if="progressVisible"
        :percentage="percentage"
        text-inside
        :stroke-width="20"
      />

      <!-- 上传工作材料 -->
      <div class="bottom-container">
        <el-button
          type="primary"
          icon="el-icon-upload"
          class="upload-button"
          :loading="uploadButtonLoading"
          @click="submitUpload"
        >上传工作材料</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { submitPlanFileApi } from '@/api/plan';

export default {
  name: 'UploadFile',
  props: {
    visible: {
      type: Boolean,
      require: true,
      default: false
    },
    plan: {
      type: Object,
      require: true,
      default: () => {}
    }
  },
  data() {
    return {
      visibleData: false,
      isDestroy: true,
      progressVisible: false,
      percentage: 0,
      uploadButtonLoading: false
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
    },
    handleDialogClosed() {
      this.isDestroy = true;
    },
    handleBeforeUpload(file) {
      if (file.size / 1024 / 1024 > 100) {
        this.$message({
          type: 'error',
          center: true,
          message: '文件不能大于100MB'
        });
        return false;
      } else {
        return true;
      }
    },
    handleOnProgress(event) {
      this.percentage = event.percentage;
    },
    // 文件上传
    async handleUploadFile(param) {
      const that = this;
      that.uploadButtonLoading = true;
      that.progressVisible = true;
      // 发起请求
      const formData = new FormData();
      formData.append('file', param.file);
      formData.append('id', that.plan.id);
      const response = await submitPlanFileApi(formData, param.onProgress);
      if (response.code === 0) {
        that.$successNotify('上传工作计划材料');
        param.onSuccess();
        setTimeout(function () {
          that.$emit('refresh-plan');
          that.visibleData = false;
        }, 2000);
      } else {
        that.$errorNotify(response, '上传工作计划材料');
        param.onError();
        that.progressVisible = true;
      }
      that.uploadButtonLoading = false;
    },
    submitUpload() {
      this.$refs.upload.submit();
    }
  }
};
</script>

<style lang="scss" scoped>
#container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin: 10px;

  .tip-text {
    font-size: 14px;
    color: #909399;
    text-align: center;
  }
  // 底部盒子
  .bottom-container {
    display: flex;
    justify-content: center;
    align-content: center;
    padding: 10px;
    // 按钮
    .upload-button {
      padding: 15px;
    }
  }
}
</style>
