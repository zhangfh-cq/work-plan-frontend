<template>
  <el-dialog
    :visible.sync="visibleData"
    center
    title="公告历史记录"
    @open="handleDialogOpen"
    @closed="handleDialogClosed"
  >
    <!-- 历史记录 -->
    <div
      v-if="!isDestroy"
      class="data-container"
    >
      <!-- 滚动条 -->
      <ul
        v-infinite-scroll="loadData"
        :infinite-scroll-disabled="data.disabled"
      >
        系统共有 {{ data.count }} 条公告记录
        <li
          v-for="bulletin of data.bulletinHistory"
          :key="bulletin.id"
        >
          <p class="bulletin-title">{{ bulletin.title }}</p>
          <p>{{ bulletin.content }}</p>
          <p>{{ bulletin.publisher }} 于 {{ bulletin.createDate }} 发布</p>
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
import { getBulletinApi } from '@/api/bulletin';

function getData() {
  return {
    loading: false,
    noMore: false,
    disabled: false,
    bulletinHistory: [],
    count: 0
  };
}

export default {
  name: 'BulletinHistory',
  props: {
    visible: {
      type: Boolean,
      require: true,
      default: false
    }
  },
  data() {
    return {
      visibleData: false,
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
      this.isDestroy = false;
      await this.getBulletinHistory();
    },
    handleDialogClosed() {
      this.isDestroy = true;
    },
    // 获取更新历史
    async getBulletinHistory() {
      const that = this;
      that.data.loading = true;
      // 使数据有序加载
      that.data.disabled = true;
      // 发起请求
      const response = await getBulletinApi({
        start: that.data.bulletinHistory.length,
        count: 10
      });
      // 响应处理
      if (response.code === 0) {
        that.data.count = response.data.count;
        if (response.data.bulletins.length === 0) {
          that.data.noMore = true;
          that.data.disabled = true;
        } else {
          that.data.noMore = false;
          that.data.disabled = false;
        }
        for (const bulletin of response.data.bulletins) {
          // 格式化时间
          bulletin.createDate = new Date(bulletin.createDate).toLocaleString();
          bulletin.updateDate = new Date(bulletin.updateDate).toLocaleString();
          that.data.bulletinHistory.push(bulletin);
        }
      } else {
        console.error(response);
        that.$errorNotify(response, '获取公告历史');
      }
      that.data.loading = false;
    },

    // 加载完成数据
    async loadData() {
      await this.getBulletinHistory();
    }
  }
};
</script>

<style lang="scss" scoped>
// 数据显示容器
.data-container {
  width: 100%;
  height: 600px;
  overflow: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  li {
    width: 100%;
    margin: 20px 0;

    // 公告标题
    .bulletin-title {
      text-align: center;
      font-size: 18px;
    }
  }

  .tip-text {
    font-size: 14px;
    color: #909399;
    text-align: center;
  }
}
</style>
