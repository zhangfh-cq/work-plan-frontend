<template>
  <div class="container">
    <el-card shadow="always">
      <!-- 管理员搜索 -->
      <table-search
        has-first
        first-operate="管理员"
        :first-selected.sync="search.selectedOption"
        :first-options="search.options"
        :first-content.sync="search.inputContent"
        @search="handleSearch"
      />

      <!-- 管理员表格 -->
      <admin-table
        :loading="table.loading"
        :admin-list="table.adminList"
        @selection-change="handleSelectionChange"
        @update-admin="handleOpenUpdateDialog"
        @delete-admin="handleDeleteAdmin"
      />

      <!-- 修改/添加用户对话框 -->
      <admin-dialog
        :visible.sync="AdminDialogVisible"
        :is-update-form="isUpdateAdminForm"
        :admin="sharedAdmin"
        @refresh-data="handleSearch()"
      />

      <!-- 底部操作 -->
      <select-operate
        :button-disabled="table.selectedAdmins.length === 0"
        @add-admin="handleAddAdmin"
        @blockade-admin="handleBlockadeAdmin"
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
import AdminDialog from './AdminDialog/index';
import SelectOperate from './SelectOperate/index';
// 函数
import data from './functions/data';
import getAdminList from './functions/get-admin';
import handleSearch from './functions/handle-search';
import handleDeleteAdmin from './functions/delete-admin';
import handleBlockadeAdmin from './functions/blockade-admin';

export default {
  name: 'AdminList',
  components: {
    TableSearch,
    AdminTable,
    AdminDialog,
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
    // 处理OpenUpdateDialog事件
    handleOpenUpdateDialog(admin) {
      this.isUpdateAdminForm = true;
      this.sharedAdmin = { ...admin };
      this.AdminDialogVisible = true;
    },
    // 处理AddAdmin事件
    handleAddAdmin() {
      this.isUpdateAdminForm = false;
      this.AdminDialogVisible = true;
    },
    // 处理DeleteAdmin事件
    handleDeleteAdmin,
    // 处理BlockadeAdmin事件
    handleBlockadeAdmin,
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
