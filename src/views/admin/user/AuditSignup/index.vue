<template>
  <div class="container">
    <el-card shadow="always">
      <!-- 用户搜索 -->
      <table-search
        has-first
        first-operate="用户"
        :first-selected.sync="search.selectedOption"
        :first-options="search.options"
        :first-content.sync="search.inputContent"
        @search="handleSearch"
      />

      <!-- 用户表格 -->
      <user-table
        :loading="table.loading"
        :user-list="table.userList"
        @selection-change="handleSelectionChange"
        @approve-signup="handleAuditUser"
        @disapprove-signup="handleAuditUser"
      />

      <!-- 操作所选用户 -->
      <select-operate
        :button-disabled="table.selectedUsers.length === 0"
        @approve-signup="handleAuditUser"
        @disapprove-signup="handleAuditUser"
      />

      <!-- 分页 -->
      <el-pagination
        layout="total,sizes,prev,pager,next,jumper"
        :total="pagination.userCount"
        :page-size="pagination.pageSize"
        :current-page="pagination.currentPage"
        class="pagination"
        @size-change="handlePageSizeChange"
        @current-change="handleCurrentPageChange"
      />
    </el-card>
  </div>
</template>

<script>
// 组件
import TableSearch from '@/components/TableSearch/index';
import UserTable from './UserTable/index';
import SelectOperate from './SelectOperate/index';
// 函数
import data from './functions/data';
import getUserList from './functions/get-user';
import handleSearch from './functions/handle-search';
import handleAuditUser from './functions/audit-user';

export default {
  name: 'AuditSignup',
  components: {
    TableSearch,
    UserTable,
    SelectOperate
  },
  data,
  created() {
    this.handleSearch();
  },
  async beforeRouteUpdate(to, form) {
    await this.getUserList(to.query);
  },
  methods: {
    // 获取用户列表
    getUserList,
    // 搜索用户
    handleSearch,
    // 处理SelectionChange事件
    handleSelectionChange(selectedUsers) {
      this.table.selectedUsers = selectedUsers;
    },
    // 审核用户
    handleAuditUser,
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
  // 分页
  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: $marginSize;
  }
}
</style>
