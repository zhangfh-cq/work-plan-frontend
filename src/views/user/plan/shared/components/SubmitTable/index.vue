<template>
  <el-table
    v-loading="loading"
    :data="submitList"
    tooltip-effect="dark"
    height="600"
  >
    <el-table-column
      prop="id"
      sortable
      width="120"
      label="提交记录ID"
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
      show-overflow-tooltip
      width="100"
      label="状态"
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
          @click="emitCheckPlanContent(scope.row)"
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
      v-if="isAwaitAudit"
      label="操作"
      align="center"
      width="140"
      fixed="right"
    >
      <template v-slot="scope">
        <el-button
          :disabled="scope.row.status==='已锁定'"
          size="medium"
          type="primary"
          icon="el-icon-edit"
          @click="emitUploadFile(scope.row)"
        >更新材料</el-button>
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
    },
    isAwaitAudit: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    emitCheckPlanContent(submitItem) {
      this.$emit('check-plan', submitItem);
    },
    emitDownloadSubmitFile(submitItem) {
      this.$emit('download-file', submitItem);
    },
    emitUploadFile(submitItem) {
      this.$emit('upload-file', submitItem);
    }
  }
};
</script>
