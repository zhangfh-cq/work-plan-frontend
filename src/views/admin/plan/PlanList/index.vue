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
        @selection-change="handleSelectionChange"
        @check-plan="handleCheckPlanContent"
        @check-complete="handleCheckPlanComplete"
        @check-update="handleCheckPlanUpdate"
        @update-plan="handleUpdatePlan"
        @delete-plan="handleDeletePlan"
      />

      <!-- 所选计划操作按钮 -->
      <select-operate
        :unlock-loading="table.unlockLoading"
        :lock-loading="table.lockLoading"
        :delete-loading="table.deleteLoading"
        :button-disable="table.selectedPlans.length === 0"
        @unlock-plan="handleUnlockPlan"
        @lock-plan="handleLockPlan"
        @delete-plan="handleDeletePlan"
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

    <!-- 计划完成情况Dialog -->
    <complete-status
      :plan="sharedPlan"
      :visible.sync="completeVisible"
    />

    <!-- 更新历史Dialog -->
    <update-history
      :plan="sharedPlan"
      :visible.sync="updateHistoryVisible"
    />

    <!-- 编辑计划DiaLog -->
    <update-plan
      :plan="sharedPlan"
      :visible.sync="updateVisible"
      @refresh-plan="handleSearch()"
    />
  </div>
</template>

<script>
// 组件
import TableSearch from '@/components/TableSearch/index';
import PlanTable from './PlanTable/index';
import SelectOperate from './SelectOperate/index';
import PlanContent from '@/components/PlanContent/index';
import CompleteStatus from './CompleteStatus/index';
import UpdateHistory from './UpdateHistory/index';
import UpdatePlan from './UpdatePlan/index';
// 函数
import data from './functions/data';
import getPlans from './functions/get-plans';
import handleSearch from './functions/handle-search';
import handleDeletePlan from './functions/delete-plan';
import handleUnlockPlan from './functions/unlock-plan';
import handleLockPlan from './functions/lock-plan';

export default {
  name: 'PlanList',
  components: {
    TableSearch,
    PlanTable,
    SelectOperate,
    PlanContent,
    CompleteStatus,
    UpdateHistory,
    UpdatePlan
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
    // 处理SelectionChange事件
    handleSelectionChange(selectedPlans) {
      this.table.selectedPlans = selectedPlans;
    },
    // 处理CheckPlanContent事件
    handleCheckPlanContent(plan) {
      this.sharedPlan = plan;
      this.contentVisible = true;
    },
    // 处理CheckPlanComplete事件
    handleCheckPlanComplete(plan) {
      this.sharedPlan = plan;
      this.completeVisible = true;
    },
    // 处理CheckPlanUpdate事件
    handleCheckPlanUpdate(plan) {
      this.sharedPlan = plan;
      this.updateHistoryVisible = true;
    },
    // 处理UpdatePlan事件
    handleUpdatePlan(plan) {
      this.sharedPlan = plan;
      this.updateVisible = true;
    },
    // 处理DeletePlan事件
    handleDeletePlan,
    // 处理UnlockPlan事件
    handleUnlockPlan,
    // 处理lockPlan事件
    handleLockPlan,
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
