<template>
  <el-dialog
    :visible.sync="visibleData"
    :title="plan?plan.title:''"
    center
  >
    <div class="container">
      <!-- 计划内容 -->
      <p class="content">{{ plan?plan.content:'' }}</p>
      <el-button
        :disabled="plan?!plan.planFile:true"
        :loading="buttonLoading"
        type="primary"
        icon="el-icon-download"
        @click="handleDownloadPlanFile"
      >下载工作材料</el-button>
      <!-- 进度条 -->
      <el-progress
        v-if="progress.visible"
        :percentage="progress.percentage"
        :stroke-width="26"
        text-inside
        class="progress"
      />

      <p>请于 {{ plan?plan.limitDate:'' }} 前上传相关材料</p>

      <!-- 计划信息 -->
      <div class="footer">
        <p>{{ plan?plan.publisher:'' }} 于 {{ plan?plan.createDate:'' }} 发布</p>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { downloadPlanFileApi } from '@/api/plan';

export default {
  name: 'PlanContent',
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
      buttonLoading: false,
      visibleData: false,
      progress: {
        visible: false,
        percentage: 0
      }
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
    async handleDownloadPlanFile() {
      const that = this;
      // 发起请求
      that.buttonLoading = true;
      that.progress.visible = true;
      const response = await downloadPlanFileApi(
        { id: that.plan.id },
        that.progress
      );
      // 处理响应
      if (response.type === 'application/json') {
        that.progress.visible = false;
        // 读取错误信息并提示
        const fileReader = new FileReader();
        fileReader.addEventListener('loadend', function (event) {
          that.errorNotify(JSON.parse(event.target.result), '文件下载');
        });
        fileReader.readAsText(response);
      } else {
        // 创建a标签并触发点击事件
        const aTag = document.createElement('a');
        aTag.href = window.URL.createObjectURL(response);
        aTag.download = that.plan.planFile;
        aTag.click();
      }
      setTimeout(function () {
        that.progress.visible = false;
        that.progress.percentage = 0;
        that.buttonLoading = false;
      }, 1500);
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-content: center;
  .content {
    font-size: 18px;
  }
  .progress {
    margin: 10px 0;
  }
  .footer {
    font-size: 14px;
    color: #909399;
    text-align: right;
  }
}
</style>
