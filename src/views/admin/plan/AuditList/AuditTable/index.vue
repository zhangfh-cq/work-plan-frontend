<template>
  <el-table
    v-loading="loading"
    :data="auditList"
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
      width="210"
      fixed="right"
    >
      <template v-slot="scope">
        <el-button
          size="medium"
          type="success"
          icon="el-icon-check"
          @click="emitApprovePlan(scope.row)"
        >通过</el-button>
        <el-button
          size="medium"
          type="danger"
          icon="el-icon-close"
          @click="emitDisapprovedPlan(scope.row)"
        >退回</el-button>
      </template>
    </el-table-column>
  </el-table>

</template>

<script>
export default {
  name: 'AuditTable',
  props: {
    loading: {
      type: Boolean,
      require: true,
      default: false
    },
    auditList: {
      type: Array,
      require: true,
      default: () => []
    }
  },
  methods: {
    emitSelectionChange(selectedAuditItem) {
      this.$emit('selection-change', selectedAuditItem);
    },
    emitCheckPlanContent(plan) {
      this.$emit('check-plan', plan);
    },
    emitDownloadSubmitFile(auditItem) {
      this.$emit('download-file', auditItem);
    },
    emitApprovePlan(auditItem) {
      this.$emit('approve-plan', auditItem);
    },
    emitDisapprovedPlan(auditItem) {
      this.$emit('disapprove-plan', auditItem);
    }
  }
};
</script>
