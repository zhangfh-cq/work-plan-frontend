<template>
  <el-table
    v-loading="loading"
    :data="plans"
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
    <el-table-column
      width="150"
      label="完成情况"
      align="center"
    >
      <template v-slot="scope">
        <el-button
          size="medium"
          @click="emitCheckPlanComplete(scope.row)"
        >查看完成情况</el-button>
      </template>
    </el-table-column>
    <el-table-column
      width="150"
      label="编辑历史"
      align="center"
    >
      <template v-slot="scope">
        <el-button
          size="medium"
          @click="emitCheckPlanUpdate(scope.row)"
        >查看编辑历史</el-button>
      </template>
    </el-table-column>

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
          @click="emitUpdatePlan(scope.row)"
        >编辑</el-button>
        <el-button
          size="medium"
          type="danger"
          icon="el-icon-delete"
          @click="emitDeletePlan(scope.row)"
        >删除</el-button>
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
    emitSelectionChange(selectedPlans) {
      this.$emit('selection-change', selectedPlans);
    },
    emitCheckPlanContent(plan) {
      this.$emit('check-plan', plan);
    },
    emitCheckPlanComplete(plan) {
      this.$emit('check-complete', plan);
    },
    emitCheckPlanUpdate(plan) {
      this.$emit('check-update', plan);
    },
    emitUpdatePlan(plan) {
      this.$emit('update-plan', plan);
    },
    emitDeletePlan(plan) {
      this.$emit('delete-plan', plan);
    }
  }
};
</script>
