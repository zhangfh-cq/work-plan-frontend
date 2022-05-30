<template>
  <el-dialog
    :visible.sync="visibleData"
    center
    title="编辑计划"
    @open="handleDialogOpen"
    @closed="handleDialogClosed"
  >
    <div
      v-if="!isDestroy"
      id="container"
    >
      <el-form
        ref="planForm"
        :rules="formRules"
        :model="formData"
      >
        <!-- 标题 -->
        <el-form-item
          label="标题"
          prop="title"
        >
          <el-input
            v-model="formData.title"
            clearable
            show-word-limit
            maxlength="50"
            type="text"
            placeholder="请输入工作计划标题"
          />
        </el-form-item>

        <!-- 内容 -->
        <el-form-item
          label="内容"
          prop="content"
        >
          <el-input
            v-model="formData.content"
            :autosize="{minRows:5,maxRows:15}"
            show-word-limit
            maxlength="1000"
            type="textarea"
            placeholder="请输入工作计划内容"
          />
        </el-form-item>

        <!-- 限制时间 -->
        <el-form-item
          label="限制时间"
          prop="limitDate"
        >
          <el-date-picker
            v-model="formData.limitDate"
            type="datetime"
            placeholder="请选择限制时间"
          />
        </el-form-item>

        <!-- 计划材料 -->
        <el-form-item label="限制时间">
          <el-upload
            ref="upload"
            :auto-upload="false"
            action="#"
            drag
            :limit="1"
            :multiple="false"
            :on-change="handleOnUploadChange"
            :before-upload="handleBeforeUpload"
            :on-progress="handleOnProgress"
            :http-request="handleUpdatePlan"
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
        </el-form-item>

        <!-- 更改备注 -->
        <el-form-item
          label="备注"
          prop="changeComments"
        >
          <el-input
            v-model="formData.changeComments"
            :autosize="{minRows:3,maxRows:6}"
            show-word-limit
            maxlength="300"
            type="textarea"
            placeholder="请输入更改备注"
          />
        </el-form-item>

        <!-- 发布计划 -->
        <div class="bottom-container">
          <el-button
            type="primary"
            icon="el-icon-edit"
            class="update-button"
            :loading="updateButtonLoading"
            @click="submitUpload"
          >更新工作计划</el-button>
        </div>
      </el-form>
    </div>
  </el-dialog>
</template>

<script>
import { updatePlanAPi } from '@/api/plan';
import { PLAN_VALIDATE_RULES } from '@/config/config';

export default {
  name: 'UpdatePlan',
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
      formData: {
        title: '',
        content: '',
        limitDate: '',
        planFile: '',
        changeComments: ''
      },
      formRules: {
        title: PLAN_VALIDATE_RULES.title,
        content: PLAN_VALIDATE_RULES.content,
        limitDate: PLAN_VALIDATE_RULES.limitDate,
        planFile: PLAN_VALIDATE_RULES.planFile,
        changeComments: PLAN_VALIDATE_RULES.changeComments
      },
      file: {},
      progressVisible: false,
      percentage: 0,
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
      const that = this;
      that.isDestroy = false;
      // 遍历重置组件数据
      Object.entries(that.formData).forEach(function ([key, value]) {
        that.formData[key] = that.plan[key] ? that.plan[key] : '';
      });
      that.formData.limitDate = new Date(that.formData.limitDate);
    },
    handleDialogClosed() {
      this.isDestroy = true;
      this.progressVisible = false;
    },
    handleOnUploadChange(file) {
      this.file = file;
    },
    handleBeforeUpload(file) {
      if (file.size / 1024 / 1024 > 100) {
        this.errorMessage('文件不能大于100MB');
        return false;
      } else {
        return true;
      }
    },
    handleOnProgress(event) {
      this.percentage = event.percentage;
    },
    // 发布计划
    async handleUpdatePlan(param) {
      const that = this;
      that.$refs.planForm.validate(async function (valid) {
        if (valid) {
          that.updateButtonLoading = true;
          that.progressVisible = true;
          // 发起请求
          const formData = new FormData();
          formData.append('id', that.plan.id);
          formData.append('title', that.formData.title);
          formData.append('content', that.formData.content);
          formData.append(
            'limitDate',
            new Date(that.formData.limitDate).toISOString()
          );
          formData.append('file', param.file);
          formData.append('changeComments', that.formData.changeComments);
          const response = await updatePlanAPi(formData, param.onProgress);
          if (response.code === 0) {
            that.$successNotify('工作计划更新');
            param.onSuccess();
            that.$emit('refresh-plan');
            setTimeout(function () {
              that.visibleData = false;
            }, 1500);
          } else {
            console.error(response);
            that.$errorNotify(response, '工作计划更新');
            param.onError();
            that.file = {};
            that.progressVisible = false;
          }
          that.updateButtonLoading = false;
        } else {
          return false;
        }
      });
    },
    submitUpload() {
      const that = this;
      if (that.file && JSON.stringify(that.file) !== '{}') {
        this.$refs.upload.submit();
      } else {
        that.$refs.planForm.validate(async function (valid) {
          if (valid) {
            that.updateButtonLoading = true;
            // 发起请求
            const formData = new FormData();
            formData.append('id', that.plan.id);
            formData.append('title', that.formData.title);
            formData.append('content', that.formData.content);
            formData.append(
              'limitDate',
              new Date(that.formData.limitDate).toISOString()
            );
            formData.append('changeComments', that.formData.changeComments);
            const response = await updatePlanAPi(formData);
            if (response.code === 0) {
              that.$successNotify('工作计划更新');
              that.$emit('refresh-plan');
              that.visibleData = false;
            } else {
              console.error(response);
              that.$errorNotify(response, '工作计划更新');
            }
            that.updateButtonLoading = false;
          } else {
            return false;
          }
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
#container {
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
    // 编辑计划按钮
    .update-button {
      padding: 15px;
    }
  }
}
</style>
