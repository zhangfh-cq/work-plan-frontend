<template>
  <el-table
    v-loading="loading"
    :data="bulletins"
    height="600"
    tooltip-effect="dark"
    @selection-change="emitSelectionChange"
  >
    <el-table-column
      type="selection"
      width="55"
    />
    <el-table-column
      prop="id"
      sortable
      width="100"
      label="公告ID"
      align="center"
    />
    <el-table-column
      prop="title"
      sortable
      show-overflow-tooltip
      width="150"
      label="公告标题"
      align="center"
    />
    <el-table-column
      width="120"
      label="公告内容"
      align="center"
    >
      <template v-slot="scope">
        <el-button
          size="medium"
          @click="emitCheckBulletinContent(scope.row)"
        >查看内容</el-button>
      </template>
    </el-table-column>
    <el-table-column
      prop="publisher"
      sortable
      show-overflow-tooltip
      width="120"
      label="发布者"
      align="center"
    />
    <el-table-column
      prop="createDate"
      sortable
      width="150"
      label="发布时间"
      align="center"
    />
    <el-table-column
      prop="updateDate"
      sortable
      width="150"
      label="更新时间"
      align="center"
    />

    <!-- 操作列 -->
    <el-table-column
      label="操作"
      align="center"
      width="210"
      fixed="right"
    >
      <template v-slot="scope">
        <el-button
          size="medium"
          type="primary"
          icon="el-icon-edit"
          @click="emitUpdateBulletin(scope.row)"
        >编辑</el-button>
        <el-button
          size="medium"
          type="danger"
          icon="el-icon-delete"
          @click="emitDeleteBulletin(scope.row)"
        >删除</el-button>
      </template>
    </el-table-column>
  </el-table>

</template>

<script>
export default {
  name: 'BulletinTable',
  props: {
    loading: {
      type: Boolean,
      require: true,
      default: false
    },
    bulletins: {
      type: Array,
      require: true,
      default: () => []
    }
  },
  methods: {
    emitSelectionChange(selectedBulletins) {
      this.$emit('selection-change', selectedBulletins);
    },
    emitCheckBulletinContent(bulletin) {
      this.$emit('check-bulletin', bulletin);
    },
    emitUpdateBulletin(bulletin) {
      this.$emit('update-bulletin', bulletin);
    },
    emitDeleteBulletin(bulletin) {
      this.$emit('delete-bulletin', bulletin);
    }
  }
};
</script>
