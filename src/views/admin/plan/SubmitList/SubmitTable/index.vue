<template>
  <el-table
    v-loading="loading"
    :data="submitList"
    tooltip-effect="dark"
    height="600"
    @selection-change="emitSelectionChange"
  >
    <el-table-column
      type="selection"
      width="55"
    />
    <el-table-column
      prop="id"
      sortable
      width="120"
      label="提交记录ID"
      align="center"
    />
    <el-table-column
      prop="submitter"
      sortable
      show-overflow-tooltip
      width="120"
      label="提交者"
      align="center"
    />
    <el-table-column
      width="150"
      label="提交文件"
      align="center"
    >
      <template v-slot="scope">
        <el-button
          :disabled="!scope.row.file"
          size="medium"
          @click="emitDownloadSubmitFile(scope.row)"
        >下载提交文件</el-button>
      </template>
    </el-table-column>
    <el-table-column
      prop="createDate"
      sortable
      width="150"
      label="提交时间"
      align="center"
    />
    <el-table-column
      prop="status"
      sortable
      show-overflow-tooltip
      width="100"
      label="状态"
      align="center"
    />
    <el-table-column
      prop="approver"
      sortable
      show-overflow-tooltip
      width="120"
      label="审核者"
      align="center"
    />
    <el-table-column
      prop="plan.id"
      sortable
      width="120"
      label="计划ID"
      align="center"
    />
    <el-table-column
      prop="plan.title"
      sortable
      show-overflow-tooltip
      width="150"
      label="计划标题"
      align="center"
    />
    <el-table-column
      width="120"
      label="计划内容"
      align="center"
    >
      <template v-slot="scope">
        <el-button
          size="medium"
          @click="emitCheckPlanContent(scope.row.plan)"
        >查看内容</el-button>
      </template>
    </el-table-column>
    <el-table-column
      prop="plan.limitDate"
      sortable
      width="150"
      label="计划限制时间"
      align="center"
    />
    <el-table-column
      prop="plan.publisher"
      sortable
      show-overflow-tooltip
      width="120"
      label="发布者"
      align="center"
    />
    <el-table-column
      prop="plan.status"
      sortable
      width="100"
      label="状态"
      align="center"
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
          type="primary"
          icon="el-icon-edit"
          @click="emitRenameSubmitFile(scope.row)"
        >重命名</el-button>
        <el-button
          size="medium"
          type="danger"
          icon="el-icon-delete"
          @click="emitDeleteSubmitItem(scope.row)"
        >删除</el-button>
      </template>
    </el-table-column>
  </el-table>

</template>

<script>
export default {
  name: 'SubmitTable',
  props: {
    loading: {
      type: Boolean,
      require: true,
      default: false
    },
    submitList: {
      type: Array,
      require: true,
      default: () => []
    }
  },
  methods: {
    emitSelectionChange(selectedSubmitItem) {
      this.$emit('selection-change', selectedSubmitItem);
    },
    emitCheckPlanContent(plan) {
      this.$emit('check-plan', plan);
    },
    emitRenameSubmitFile(submitItem) {
      this.$emit('rename-file', submitItem);
    },
    emitDownloadSubmitFile(submitItem) {
      this.$emit('download-file', submitItem);
    },
    emitDeleteSubmitItem(submitItem) {
      this.$emit('delete-submit', submitItem);
    }
  }
};
</script>
