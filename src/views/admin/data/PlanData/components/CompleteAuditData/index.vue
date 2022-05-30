<template>
  <el-card
    shadow="always"
    class="pie-card"
  >
    <div class="search-container">
      <el-input
        v-model.number="planId"
        clearable
        type="text"
        class="id-input"
        placeholder="请输入计划ID"
        @keyup.enter.native="handleGetPlanData(planId)"
      />
      <el-button
        type="primary"
        icon="el-icon-search"
        class="id-search"
        :loading="buttonLoading"
        @click="handleGetPlanData(planId)"
      >获取数据</el-button>
    </div>

    <div class="plan-container">
      <!--完成情况容器 -->
      <div
        id="complete-container"
        class="chart-container"
      />
      <!-- 审核情况容器 -->
      <div
        id="audit-container"
        class="chart-container"
      />
    </div>
  </el-card>
</template>

<script>
import { getPlanCompleteDataApi } from '@/api/data';
import { getPlanAuditDataApi } from '@/api/data';
import { SUBMIT_STATUS } from '@/config/config';

export default {
  name: 'CompleteAuditData',
  data() {
    return {
      planId: null,
      buttonLoading: false
    };
  },
  async mounted() {
    await this.handleGetPlanData(this.planId);
  },
  methods: {
    getPlanCompleteData,
    getPlanAuditData,
    drawCompleteChart,
    drawAuditChart,
    async handleGetPlanData(planId) {
      this.buttonLoading = true;
      await this.getPlanCompleteData({ id: planId });
      await this.getPlanAuditData({ id: planId });
      this.buttonLoading = false;
      this.drawCompleteChart();
      this.drawAuditChart();
    }
  }
};

// 获取计划完成情况
async function getPlanCompleteData(params) {
  const that = this;
  // 获取信息
  const response = await getPlanCompleteDataApi(params);
  // 判断响应
  if (response.code === 0) {
    // 格式化信息
    that.completeData = [];
    that.completeData.push({
      name: '已完成',
      value: response.data.completed || 0
    });
    that.completeData.push({
      name: '未完成',
      value: response.data.incomplete || 0
    });
  } else {
    that.completeData.push({
      name: '数据',
      value: 0
    });
    console.error(response);
    that.$errorNotify(response, '获取用户年龄数据');
  }
}

// 计划审核状态情况
async function getPlanAuditData(params) {
  const that = this;
  // 获取信息
  const response = await getPlanAuditDataApi(params);
  // 判断响应
  if (response.code === 0) {
    // 格式化信息
    that.auditData = [];
    that.auditData.push({
      name: SUBMIT_STATUS.APPROVED,
      value: response.data.approveCount || 0
    });
    that.auditData.push({
      name: SUBMIT_STATUS.AWAIT_AUDIT,
      value: response.data.awaitAuditCount || 0
    });
    that.auditData.push({
      name: SUBMIT_STATUS.UNAPPROVED,
      value: response.data.unapprovedCount || 0
    });
  } else {
    that.auditData.push({
      name: '数据',
      value: 0
    });
    console.error(response);
    that.$errorNotify(response, '获取用户年龄数据');
  }
}

// 绘制完成情况图
function drawCompleteChart() {
  // 初始化echarts
  const completeChart = this.$echarts.init(
    document.getElementById('complete-container')
  );
  // 设置配置
  completeChart.setOption({
    title: { text: '计划完成情况数据分析' },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      icon: 'circle',
      align: 'left',
      x: 'right',
      y: 'bottom',
      data: ['已完成', '未完成']
    },
    series: [{ name: '计划完成情况', type: 'pie', data: this.completeData }]
  });
}

// 绘制审核情况图
function drawAuditChart() {
  // 初始化echarts
  const auditChart = this.$echarts.init(
    document.getElementById('audit-container')
  );
  // 设置配置
  auditChart.setOption({
    title: { text: '计划审核情况数据分析' },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      icon: 'circle',
      align: 'left',
      x: 'right',
      y: 'bottom',
      data: [
        SUBMIT_STATUS.APPROVED,
        SUBMIT_STATUS.UNAPPROVED,
        SUBMIT_STATUS.AWAIT_AUDIT
      ]
    },
    series: [{ name: '计划审核情况', type: 'pie', data: this.auditData }]
  });
}
</script>

<style lang="scss" scoped>
@mixin margin {
  margin: 10px;
}

.pie-card {
  @include margin;
  .search-container {
    display: flex;
    justify-content: end;
    align-items: center;
    .id-input {
      @include margin;
    }
    .id-search {
      @include margin;
    }
  }
  // 图表容器
  .chart-container {
    width: 600px;
    height: 400px;
  }
  // 计划容器
  .plan-container {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
}
</style>
