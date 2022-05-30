<template>
  <el-table
    v-loading="loading"
    :data="adminList"
    show-overflow-tooltip
    tooltip-effect="dark"
    height="600"
    @selection-change="handleSelectionChange"
  >
    <el-table-column
      type="selection"
      width="55"
    />
    <el-table-column
      prop="username"
      label="用户名称"
      align="center"
      sortable
      width="120"
    />
    <el-table-column
      prop="realName"
      label="真实姓名"
      align="center"
      sortable
      width="120"
    />
    <el-table-column
      prop="gender"
      label="性别"
      align="center"
      width="80"
    />
    <el-table-column
      prop="age"
      label="年龄"
      align="center"
      sortable
      width="80"
    />
    <el-table-column
      prop="phoneNumber"
      label="电话号码"
      align="center"
      sortable
      width="120"
    />
    <el-table-column
      prop="partyBranch"
      label="所在支部"
      align="center"
      sortable
      show-overflow-tooltip
      width="150"
    />
    <el-table-column
      prop="status"
      label="用户状态"
      align="center"
      width="100"
    />
    <el-table-column
      prop="createDate"
      label="注册时间"
      align="center"
      sortable
      width="150"
    />
    <!-- 操作列 -->
    <el-table-column
      label="操作"
      align="center"
      width="230"
      fixed="right"
    >
      <template v-slot="scope">
        <el-button
          size="medium"
          type="success"
          icon="el-icon-check"
          @click="handleUnblockAdmin([scope.row])"
        >解封</el-button>
        <el-button
          size="medium"
          type="danger"
          icon="el-icon-delete"
          @click="handleDeleteAdmin([scope.row])"
        >删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: 'AdminTable',
  props: {
    loading: {
      type: Boolean,
      require: true,
      default: false
    },
    adminList: {
      type: Array,
      require: true,
      default: () => []
    }
  },
  methods: {
    handleSelectionChange(admins) {
      this.$emit('selection-change', admins);
    },
    handleUnblockAdmin(admin) {
      this.$emit('unblock-admin', admin);
    },
    handleDeleteAdmin(admin) {
      this.$emit('delete-admin', admin);
    }
  }
};
</script>
