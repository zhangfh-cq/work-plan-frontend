<template>
  <el-table
    v-loading="loading"
    :data="plans"
    tooltip-effect="dark"
    height="600"
  >
    <el-table-column
      prop="id"
      sortable
      width="100"
      label="计划ID"
      align="center"
    />
    <el-table-column
      prop="title"
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
      prop="limitDate"
      sortable
      width="150"
      label="限制时间"
      align="center"
    />
    <el-table-column
      prop="publisher"
      sortable
      show-overflow-tooltip
      width="120"
      label="发布者"
      align="center"
    />
    <el-table-column
      prop="status"
      sortable
      width="100"
      label="状态"
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
      width="140"
      fixed="right"
    >
      <template v-slot="scope">
        <el-button
          :disabled="scope.row.status==='已锁定'"
          size="medium"
          type="primary"
          icon="el-icon-upload2"
          @click="emitUploadFile(scope.row)"
        >提交材料</el-button>
      </template>
    </el-table-column>
  </el-table>

</template>

<script>
export default {
  name: 'PlanTable',
  props: {
    loading: {
      type: Boolean,
      require: true,
      default: false
    },
    plans: {
      type: Array,
      require: true,
      default: () => []
    }
  },
  methods: {
    emitCheckPlanContent(plan) {
      this.$emit('check-plan', plan);
    },
    emitUploadFile(plan) {
      this.$emit('upload-file', plan);
    }
  }
};
</script>
