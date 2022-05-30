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
        has-second
        second-operate="计划"
        :second-selected.sync="search.planSelected"
        :second-options="search.planOptions"
        :second-status-options="search.statusOptions"
        :second-content.sync="search.planContent"
        @search="handleSearch"
      />

      <!-- 审核表格 -->
      <audit-table
        :loading="table.loading"
        :disapprove-loading="table.disapproveLoading"
        :audit-list="table.submitList"
        @selection-change="handleSelectionChange"
        @check-plan="handleCheckPlanContent"
        @download-file="handleDownloadSubmitFile"
        @approve-plan="handleApprovePlan"
        @disapprove-plan="handleDisapprovedPlan"
      />

      <!-- 所选审核项操作按钮 -->
      <select-operate
        :button-disable="table.selectedAuditItem.length === 0"
        :approve-loading="selections.approveLoading"
        :disapprove-loading="selections.disapproveLoading"
        @download-files="handleDownloadSubmitFiles"
        @approve-plan="handleApprovePlan"
        @disapprove-plan="handleDisapprovedPlan"
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
  </div>
</template>

<script>
// 组件
import TableSearch from '@/components/TableSearch/index';
import AuditTable from './AuditTable/index';
import SelectOperate from './SelectOperate/index';
import PlanContent from '@/components/PlanContent/index';
import ProgressDialog from '@/components/ProgressDialog/index';
// 函数
import data from './functions/data';
import getSubmitHistory from '../shared/functions/get-submit';
import handleSearch from '../shared/functions/handle-search';
import handleDownloadSubmitFile from '../shared/functions/download';
import handleDownloadSubmitFiles from './functions/downloadFiles';
import handleApprovePlan from './functions/approve-plan';
import handleDisapprovedPlan from './functions/disapprove-plan';

export default {
  name: 'AuditList',
  components: {
    TableSearch,
    AuditTable,
    SelectOperate,
    PlanContent,
    ProgressDialog
  },
  data, // 数据
  created() {
    this.handleSearch();
  },
  // 导航守卫响应路由参数变化
  async beforeRouteUpdate(to, form) {
    await this.getSubmitHistory(to.query, true);
  },
  methods: {
    // 获取提交数据
    getSubmitHistory,
    // 处理Search事件
    handleSearch,
    // 处理SelectionChange事件
    handleSelectionChange(selectedAuditItem) {
      this.table.selectedAuditItem = selectedAuditItem;
    },
    // 处理CheckPlanContent事件
    handleCheckPlanContent(plan) {
      this.sharedPlan = plan;
      this.contentVisible = true;
    },
    // 处理DownloadSubmitFile事件
    handleDownloadSubmitFile,
    // 处理DownloadSubmitFiles事件
    handleDownloadSubmitFiles,
    // 处理ApprovePlan事件
    handleApprovePlan,
    // 处理DisapprovedPlan事件
    handleDisapprovedPlan,
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
