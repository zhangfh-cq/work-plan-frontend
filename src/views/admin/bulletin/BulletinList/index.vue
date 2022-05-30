<template>
  <div class="container">
    <el-card shadow="always">
      <!-- 表格搜索 -->
      <table-search
        has-first
        first-operate="公告"
        :first-selected.sync="search.selected"
        :first-options="search.options"
        :first-content.sync="search.content"
        @search="handleSearch"
      />

      <!-- 公告表格 -->
      <bulletin-table
        :loading="table.loading"
        :bulletins="table.bulletins"
        @selection-change="handleSelectionChange"
        @check-bulletin="handleCheckBulletinContent"
        @update-bulletin="handleUpdateBulletin"
        @delete-bulletin="handleDeleteBulletin"
      />

      <!-- 所选公告操作按钮 -->
      <select-operate
        :delete-loading="selections.deleteLoading"
        :button-disable="table.selectedBulletins.length === 0"
        @delete-bulletin="handleDeleteBulletin"
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
    <bulletin-content
      :bulletin="sharedBulletin"
      :visible.sync="contentVisible"
    />

    <!-- 编辑计划DiaLog -->
    <update-bulletin
      :bulletin="sharedBulletin"
      :visible.sync="updateVisible"
      @refresh-bulletin="handleSearch()"
    />
  </div>
</template>

<script>
// 组件
import TableSearch from '@/components/TableSearch/index';
import BulletinTable from './BulletinTable/index';
import SelectOperate from './SelectOperate/index';
import BulletinContent from './BulletinContent/index';
import UpdateBulletin from './UpdateBulletin/index';
// 函数
import data from './functions/data';
import getBulletins from './functions/get-bulletins';
import handleSearch from './functions/handle-search';
import handleDeleteBulletin from './functions/delete-bulletin';

export default {
  name: 'BulletinList',
  components: {
    TableSearch,
    BulletinTable,
    SelectOperate,
    BulletinContent,
    UpdateBulletin
  },
  data, // 数据
  created() {
    this.handleSearch();
  },
  // 导航守卫响应路由参数变化
  async beforeRouteUpdate(to, form) {
    await this.getBulletins(to.query);
  },
  methods: {
    // 获取公告数据
    getBulletins,
    // 处理Search事件
    handleSearch,
    // 处理SelectionChange事件
    handleSelectionChange(selectedBulletins) {
      this.table.selectedBulletins = selectedBulletins;
    },
    // 处理CheckBulletinContent事件
    handleCheckBulletinContent(bulletin) {
      this.sharedBulletin = bulletin;
      this.contentVisible = true;
    },
    // 处理UpdateBulletin事件
    handleUpdateBulletin(bulletin) {
      this.sharedBulletin = bulletin;
      this.updateVisible = true;
    },
    // 处理DeleteBulletin事件
    handleDeleteBulletin,
    // 处理PageSize改变事件
    handlePageSizeChange(pageSize) {
      this.pagination.pageSize = pageSize;
      this.handleSearch();
    },
    // 处理CurrentPage改变事件
    handleCurrentPageChange(page) {
      this.pagination.currentPage = page;
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
