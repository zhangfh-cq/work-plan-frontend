<template>
  <el-dialog
    :visible.sync="visibleData"
    center
    :modal="false"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :title="percentage===100?'文件下载完成':'文件下载中'"
    destroy-on-close
  >
    <!-- 进度条 -->
    <el-progress
      v-if="percentageData!==0"
      :percentage="percentageData"
      :stroke-width="24"
      text-inside
    />
  </el-dialog>
</template>

<script>
export default {
  name: 'ProgressDialog',
  props: {
    visible: {
      type: Boolean,
      require: true,
      default: false
    },
    percentage: {
      type: Number,
      require: true,
      default: 0
    }
  },
  data() {
    return {
      visibleData: false,
      percentageData: this.percentage
    };
  },
  watch: {
    visible() {
      this.visibleData = this.visible;
    },
    visibleData() {
      this.$emit('update:visible', this.visibleData);
    },
    percentage() {
      this.percentageData = this.percentage;
    }
  }
  // methods: {
  //   handleDialogClosed() {
  //     this.percentageData = 0;
  //   }
  // }
};
</script>
