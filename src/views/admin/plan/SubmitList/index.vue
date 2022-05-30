<template>
  <div class="container">
    <el-card shadow="always">
      <!-- 审核搜索 -->
      <table-search
        has-first
        first-operate="提交"
        time-key="limitDate"
        status-key="status"
        :first-selected.sync="search.submitSelected"
        :first-options="search.submitOptions"
        :first-content.sync="search.submitContent"
        :first-status-options="search.submitStatusOptions"
        has-second
        second-operate="计划"
        :second-selected.sync="search.planSelected"
        :second-options="search.planOptions"
        :second-status-options="search.planStatusOptions"
        :second-content.sync="search.planContent"
        @search="handleSearch"
      />

      <!-- 提交表格 -->
      <submit-table
        :loading="table.loading"
        :submit-list="table.submitList"
        @selection-change="handleSelectionChange"
        @check-plan="handleCheckPlanContent"
        @download-file="handleDownloadSubmitFile"
        @rename-file="handleRenameSubmitFile"
        @delete-submit="handleDeleteSubmit"
      />

      <!-- 所选审核项操作按钮 -->
      <select-operate
        :button-disable="table.selectedSubmitItem.length === 0"
        @delete-submit="handleDeleteSubmit"
        @download-plan-files="handleDownloadPlanFiles"
      />

      <!-- 分页 -->
      <el-pagination
        :total="pagination.dataCount"
        :page-size="pagination.pageSize"
        :current-page="pagination.currentPage"
        class="pagination"
        layout="total,sizes,prev,pager,next,jumper"
        @size-change="handlePageSizeChange"
        @current-change="handleCurrentPageChange"
      />
    </el-card>

    <!-- 下载进度条Dialog -->
    <progress-dialog
      :visible="progress.visible"
      :percentage="progress.percentage"
    />

    <!-- 计划内容Dialog -->
    <plan-content
      :plan="sharedPlan"
      :visible.sync="contentVisible"
    />

    <!-- 重命名提交文件Dialog -->
    <rename-submit-file
      :visible.sync="renameSubmitFileVisible"
      :submit-item="sharedSubmit"
      @refresh-submit="handleRefreshSubmit"
    />

    <!-- 下载计划所有提交文件Dialog -->
    <download-plan-files :visible.sync="downloadPlanFilesVisible" />
  </div>
</template>

<script>
// 组件
import TableSearch from '@/components/TableSearch/index';
import SubmitTable from './SubmitTable/index';
import SelectOperate from './SelectOperate/index';
import PlanContent from '@/components/PlanContent/index';
import RenameSubmitFile from './RenameSubmitFile/index';
import DownloadPlanFiles from './DownloadPlanFiles/index';
import ProgressDialog from '@/components/ProgressDialog/index';
// 函数
import data from './functions/data';
import getSubmitHistory from '../shared/functions/get-submit';
import handleDownloadSubmitFile from '../shared/functions/download';
import handleSearch from '../shared/functions/handle-search';
import handleDeleteSubmit from './functions/delete-submit';

export default {
  name: 'SubmitList',
  components: {
    TableSearch,
    SubmitTable,
    SelectOperate,
    PlanContent,
    DownloadPlanFiles,
    ProgressDialog,
    RenameSubmitFile
  },
  data, // 数据
  created() {
    this.handleSearch();
  },
  // 导航守卫响应路由参数变化
  async beforeRouteUpdate(to, form) {
    await this.getSubmitHistory(to.query);
  },
  methods: {
    // 获取提交数据
    getSubmitHistory,
    // 处理Search事件
    handleSearch,
    // 处理SelectionChange事件
    handleSelectionChange(selectedSubmitItem) {
      this.table.selectedSubmitItem = selectedSubmitItem;
    },
    // 处理CheckPlanContent事件
    handleCheckPlanContent(plan) {
      this.sharedPlan = plan;
      this.contentVisible = true;
    },
    // 处理DownloadSubmitFile事件
    handleDownloadSubmitFile,
    // 处理DownloadPlanFiles事件
    handleDownloadPlanFiles() {
      this.downloadPlanFilesVisible = true;
    },
    // 处理RenameSubmitFile事件
    handleRenameSubmitFile(submitItem) {
      this.sharedSubmit = submitItem;
      this.renameSubmitFileVisible = true;
    },
    // 处理RefreshSubmit事件
    handleRefreshSubmit() {
      this.handleSearch();
    },
    // 处理DeleteSubmit事件
    handleDeleteSubmit,
    // 处理PageSize改变事件
    handlePageSizeChange(pageSize) {
      this.pagination.pageSize = pageSize;
      this.handleSearch();
    },
    // 处理CurrentPage改变事件
    handleCurrentPageChange(newPage) {
      this.pagination.currentPage = newPage;
      this.handleSearch();
    }
  }
};
</script>

<style lang="scss" scoped>
$marginSize: 10px;

.container {
  margin: $marginSize;
  // 分页组件
  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: $marginSize;
  }
}
</style>
