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
        @update-user="handleOpenUpdateDialog"
        @delete-user="handleDeleteUser"
      />

      <!-- 所选用户操作 -->
      <select-operate
        :button-disabled="table.selectedUsers.length === 0"
        @blockade-user="handleBlockadeUser"
        @delete-user="handleDeleteUser"
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

      <!-- 修改用户信息对话框 -->
      <update-user-dialog
        :visible.sync="updateUserVisible"
        :user="sharedUser"
        @refresh-data="handleSearch()"
      />
    </el-card>
  </div>
</template>

<script>
// 组件
import TableSearch from '@/components/TableSearch/index';
import UserTable from './UserTable/index';
import UpdateUserDialog from './UpdateUser/index';
import SelectOperate from './SelectOperate/index';
// 函数
import data from './functions/data';
import getUserList from './functions/get-user';
import handleSearch from './functions/handle-search';
import handleDeleteUser from './functions/delete-user';
import handleBlockadeUser from './functions/blockade-user';

export default {
  name: 'UserList',
  components: {
    TableSearch,
    UserTable,
    UpdateUserDialog,
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
    // 处理OpenUpdateDialog事件
    handleOpenUpdateDialog(user) {
      this.sharedUser = user;
      this.updateUserVisible = true;
    },
    // 处理SelectionChange事件
    handleSelectionChange(selectedUsers) {
      this.table.selectedUsers = selectedUsers;
    },
    // 处理DeleteUser事件
    handleDeleteUser,
    // 处理BlockadeUser事件
    handleBlockadeUser,
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
