<template>
  <div class="container">
    <el-card shadow="always">
      <!-- 计划搜索 -->
      <table-search
        has-first
        first-operate="计划"
        time-key="limitDate"
        status-key="status"
        :first-selected.sync="search.selected"
        :first-options="search.options"
        :first-status-options="search.statusOptions"
        :first-content.sync="search.content"
        @search="handleSearch"
      />

      <!-- 提交表格 -->
      <submit-table
        :loading="table.loading"
        :submit-list="table.submitList"
        @check-plan="handleCheckPlanContent"
        @download-file="handleDownloadSubmitFile"
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
import SubmitTable from '../shared/components/SubmitTable/index';
import PlanContent from '@/components/PlanContent/index';
import ProgressDialog from '@/components/ProgressDialog/index';
// 函数
import data from './functions/data';
import getSubmitList from '../shared/functions/get-submit';
import handleSearch from '../shared/functions/handle-search';
import handleDownloadSubmitFile from '../shared/functions/download';
// 常量
import { SUBMIT_STATUS } from '@/config/config';

export default {
  name: 'PassedView',
  components: {
    TableSearch,
    SubmitTable,
    PlanContent,
    ProgressDialog
  },
  data, // 数据
  created() {
    this.handleSearch();
  },
  // 导航守卫响应路由参数变化
  async beforeRouteUpdate(to, form) {
    await this.getSubmitList(to.query, SUBMIT_STATUS.APPROVED);
  },
  methods: {
    // 获取提交数据
    getSubmitList,
    // 处理Search事件
    handleSearch,
    // 处理CheckPlanContent事件
    handleCheckPlanContent(submitItem) {
      this.sharedPlan = submitItem.plan;
      this.contentVisible = true;
    },
    // 处理DownloadSubmitFile事件
    handleDownloadSubmitFile,
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
