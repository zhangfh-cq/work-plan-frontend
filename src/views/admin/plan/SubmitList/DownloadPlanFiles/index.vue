<template>
  <el-dialog
    :visible.sync="visibleData"
    center
    title="下载计划所有提交文件"
    @open="handleDialogOpen"
    @closed="handleDialogClosed"
  >
    <div
      v-if="!isDestroy"
      id="container"
    >
      <el-form
        ref="downloadForm"
        :rules="formRules"
        :model="formData"
      >
        <!-- 计划ID -->
        <el-form-item
          label="计划ID"
          prop="planId"
        >
          <el-input
            v-model.number="formData.planId"
            type="text"
            placeholder="请输入工作计划ID"
          />
        </el-form-item>

        <!-- 提交记录状态 -->
        <el-form-item
          label="提交状态"
          prop="submitStatus"
        >
          <el-select
            v-model="formData.submitStatus"
            size="medium"
            placeholder="请选择提交记录状态"
          >
            <el-option
              v-for="option of statusOptions"
              :key="option.value"
              :value="option.value"
              :label="option.label"
            />
          </el-select>
        </el-form-item>
        <!-- 进度条 -->
        <el-progress
          v-if="progress.visible"
          :percentage="progress.percentage"
          :stroke-width="26"
          text-inside
          class="progress"
        />

        <!-- 下载文件 -->
        <div class="bottom-container">
          <el-button
            type="primary"
            icon="el-icon-download"
            class="download-button"
            :loading="downloadButtonLoading"
            @click="downloadPlanFiles"
          >下载所有提交文件</el-button>
        </div>
      </el-form>
    </div>
  </el-dialog>
</template>

<script>
import { PLAN_VALIDATE_RULES, SUBMIT_STATUS } from '@/config/config';
import { downloadPlanAllSubmitFileApi } from '@/api/plan';

export default {
  name: 'DownloadPlanFiles',
  props: {
    visible: {
      type: Boolean,
      require: true,
      default: false
    }
  },
  data() {
    return {
      visibleData: false,
      isDestroy: true,
      statusOptions: [
        { label: '全部', value: '' },
        { label: SUBMIT_STATUS.AWAIT_AUDIT, value: SUBMIT_STATUS.AWAIT_AUDIT },
        { label: SUBMIT_STATUS.APPROVED, value: SUBMIT_STATUS.APPROVED },
        { label: SUBMIT_STATUS.UNAPPROVED, value: SUBMIT_STATUS.UNAPPROVED }
      ],
      formData: {
        planId: '',
        submitStatus: ''
      },
      formRules: {
        planId: PLAN_VALIDATE_RULES.id
      },
      progress: {
        visible: false,
        percentage: 0
      },
      downloadButtonLoading: false
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
    async downloadPlanFiles() {
      const that = this;
      that.$refs.downloadForm.validate(async function (valid) {
        if (valid) {
          that.downloadButtonLoading = true;
          that.progress.visible = true;
          // 判断参数
          const params = Object.assign(
            { id: that.formData.planId },
            that.formData.submitStatus
              ? { option: 'status', value: that.formData.submitStatus }
              : null
          );
          // 发起请求
          const response = await downloadPlanAllSubmitFileApi(
            params,
            that.progress
          );
          // 处理响应
          if (response.type === 'application/json') {
            that.progress.visible = false;
            // 读取错误信息并提示
            const fileReader = new FileReader();
            fileReader.addEventListener('loadend', function (event) {
              console.error(response);
              that.errorNotify(JSON.parse(event.target.result), '文件下载');
            });
            fileReader.readAsText(response);
          } else {
            // 创建a标签并触发点击事件
            const aTag = document.createElement('a');
            aTag.href = window.URL.createObjectURL(response);
            aTag.download = 'files.zip';
            aTag.click();
          }
          setTimeout(function () {
            that.progress.visible = false;
            that.progress.percentage = 0;
            that.downloadButtonLoading = false;
          }, 1500);
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
    .download-button {
      padding: 15px;
    }
  }
}
</style>
