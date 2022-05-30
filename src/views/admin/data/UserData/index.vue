<template>
  <div class="container">
    <!-- 饼状图Card -->
    <el-card
      shadow="always"
      class="card"
    >
      <div class="pie-container">
        <!-- 年龄图容器 -->
        <div
          id="age-container"
          class="chart-container"
        />
        <!-- 性别图容器 -->
        <div
          id="gender-container"
          class="chart-container"
        />
      </div>
    </el-card>
  </div>
</template>

<script>
import getUserAgeData from './functions/get-age-data';
import getUserGenderData from './functions/get-gender-data';

export default {
  name: 'UserData',
  data() {
    return {
      ageData: [],
      genderData: []
    };
  },
  async mounted() {
    await this.getUserAgeData();
    await this.getUserGenderData();
    this.drawAgeChart();
    this.drawGenderChart();
  },
  methods: {
    getUserAgeData,
    getUserGenderData,
    drawAgeChart() {
      // 初始化echarts
      const genderChart = this.$echarts.init(
        document.getElementById('age-container')
      );
      // 设置配置
      genderChart.setOption({
        title: { text: '用户年龄数据分析' },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        series: [{ name: '用户年龄', type: 'pie', data: this.ageData }]
      });
    },
    drawGenderChart() {
      // 初始化echarts
      const genderChart = this.$echarts.init(
        document.getElementById('gender-container')
      );
      // 设置配置
      genderChart.setOption({
        title: { text: '用户性别数据分析' },
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
          data: ['男', '女']
        },
        series: [{ name: '用户性别', type: 'pie', data: this.genderData }]
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  .card {
    margin: 10px;
    // 饼状图卡片容器
    .pie-container {
      display: flex;
      justify-content: space-around;
      align-items: center;
      // 图表容器
      .chart-container {
        width: 600px;
        height: 400px;
      }
    }
  }
}
</style>
