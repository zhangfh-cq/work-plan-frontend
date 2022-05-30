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

      <!-- 计划表格 -->
      <plan-table
        :loading="table.loading"
        :plans="table.plans"
        @check-plan="handleCheckPlanContent"
        @upload-file="handleUploadFile"
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

    <!-- 计划内容Dialog -->
    <plan-content
      :plan="sharedPlan"
      :visible.sync="contentVisible"
    />

    <!-- 上传材料计划DiaLog -->
    <upload-file
      :plan="sharedPlan"
      :visible.sync="uploadFileVisible"
      @refresh-plan="handleSearch()"
    />
  </div>
</template>

<script>
// 组件
import TableSearch from '@/components/TableSearch/index';
import PlanTable from './plan-table/index';
import PlanContent from '@/components/PlanContent/index';
import UploadFile from '../shared/components/UploadFile/index';
// 函数
import data from './functions/data';
import getPlans from './functions/get-plans';
import handleSearch from '../shared/functions/handle-search';

export default {
  name: 'AwaitSubmitView',
  components: {
    TableSearch,
    PlanTable,
    PlanContent,
    UploadFile
  },
  data, // 数据
  created() {
    this.handleSearch();
  },
  // 导航守卫响应路由参数变化
  async beforeRouteUpdate(to, form) {
    await this.getPlans(to.query);
  },
  methods: {
    // 获取计划数据
    getPlans,
    // 处理Search事件
    handleSearch,
    // 处理CheckPlanContent事件
    handleCheckPlanContent(plan) {
      this.sharedPlan = plan;
      this.contentVisible = true;
    },
    // 处理UploadFile事件
    handleUploadFile(plan) {
      this.sharedPlan = plan;
      this.uploadFileVisible = true;
    },
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
