<template>
  <el-dialog
    :visible.sync="visibleData"
    center
    title="编辑历史记录"
    @open="handleDialogOpen"
    @closed="handleDialogClosed"
  >
    <!-- 更新历史 -->
    <div
      v-if="!isDestroy"
      class="data-container"
    >
      <!-- 滚动条 -->
      <ul
        v-infinite-scroll="loadData"
        :infinite-scroll-disabled="data.disabled"
      >
        该计划共有 {{ data.count }} 条编辑记录
        <li
          v-for="history of data.updateHistory"
          :key="history.id"
        >
          <p>{{ history.updater }} 编辑于 {{ history.date }}</p>
          <p>编辑备注：{{ history.changeComments }}</p>
        </li>
        <p
          v-if="data.loading"
          class="tip-text"
        >加载中...</p>
        <p
          v-if="data.noMore"
          class="tip-text"
        >没有更多了</p>
      </ul>
    </div>
  </el-dialog>
</template>

<script>
import { getPlanUpdateHistoryAPi } from '@/api/plan';

function getData() {
  return {
    loading: false,
    noMore: false,
    disabled: false,
    updateHistory: [],
    count: 0
  };
}

export default {
  name: 'UpdateHistory',
  props: {
    visible: {
      type: Boolean,
      require: true,
      default: false
    },
    plan: {
      type: Object,
      require: true,
      default: () => {}
    }
  },
  data() {
    return {
      visibleData: false, // Dialog Visible
      isDestroy: true,
      data: getData()
    };
  },
  watch: {
    visible() {
      this.visibleData = this.visible;
    },
    visibleData() {
      this.$emit('update:visible', this.visibleData);
    }
  },
  methods: {
    async handleDialogOpen() {
      const that = this;
      that.isDestroy = false;
      // 重置组件数据
      that.data = getData();
      await that.getUpdateHistory();
    },
    handleDialogClosed() {
      this.isDestroy = true;
    },
    // 获取更新历史
    async getUpdateHistory() {
      const that = this;
      that.data.loading = true;
      // 使数据有序加载
      that.data.disabled = true;
      // 发起请求
      const response = await getPlanUpdateHistoryAPi({
        id: that.plan.id,
        start: that.data.updateHistory.length,
        count: 10
      });
      // 响应处理
      if (response.code === 0) {
        that.data.count = response.data.count;
        if (response.data.updateHistory.length === 0) {
          that.data.noMore = true;
          that.data.disabled = true;
        } else {
          that.data.noMore = false;
          that.data.disabled = false;
        }
        for (const history of response.data.updateHistory) {
          history.date = new Date(history.date).toLocaleString();
          that.data.updateHistory.push(history);
        }
      } else {
        console.error(response);
        that.$errorNotify(response, '获取编辑历史');
      }
      that.data.loading = false;
    },

    // 加载用户完成数据
    async loadData() {
      await this.getUpdateHistory();
    }
  }
};
</script>

<style lang="scss" scoped>
// 数据显示容器
.data-container {
  width: 100%;
  height: 400px;
  overflow: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  li {
    width: 100%;
    margin: 20px 0;
  }

  .tip-text {
    font-size: 14px;
    color: #909399;
    text-align: center;
  }
}
</style>
