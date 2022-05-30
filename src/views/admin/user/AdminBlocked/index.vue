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
      <admin-table
        :loading="table.loading"
        :admin-list="table.adminList"
        @selection-change="handleSelectionChange"
        @unblock-admin="handleUnblockAdmin"
        @delete-admin="handleDeleteAdmin"
      />

      <!-- 操作所选用户按钮 -->
      <select-operate
        :button-disabled="table.selectedAdmins.length === 0"
        @unblock-admin="handleUnblockAdmin"
        @delete-admin="handleDeleteAdmin"
      />

      <!-- 分页 -->
      <el-pagination
        layout="total,sizes,prev,pager,next,jumper"
        :total="pagination.adminCount"
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
import AdminTable from './AdminTable/index';
import SelectOperate from './SelectOperate/index';
// 函数
import data from './functions/data';
import getAdminList from './functions/get-admin';
import handleSearch from './functions/handle-search';
import handleUnblockAdmin from './functions/unblock-admin';
import handleDeleteAdmin from './functions/delete-admin';

export default {
  name: 'AdminBlocked',
  components: {
    TableSearch,
    AdminTable,
    SelectOperate
  },
  data,
  created() {
    this.handleSearch();
  },
  async beforeRouteUpdate(to, form) {
    await this.getAdminList(to.query);
  },
  methods: {
    // 获取管理员列表
    getAdminList,
    // 搜索管理员
    handleSearch,
    // 处理SelectionChange事件
    handleSelectionChange(selectedAdmins) {
      this.table.selectedAdmins = selectedAdmins;
    },
    // 处理UnblockAdmin事件
    handleUnblockAdmin,
    // 处理DeleteAdmin事件
    handleDeleteAdmin,
    // 处理PageSizeChange事件
    handlePageSizeChange(pageSize) {
      this.pagination.pageSize = pageSize;
      this.handleSearch();
    },
    // 处理CurrentPageChange事件
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
