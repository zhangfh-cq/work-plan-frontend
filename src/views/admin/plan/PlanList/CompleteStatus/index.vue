<template>
  <el-dialog
    :visible.sync="visibleData"
    center
    title="计划完成情况"
    @open="handleDialogOpen"
    @closed="handleDialogClosed"
  >
    <!-- 标签 -->
    <el-tabs
      v-if="!isDestroy"
      v-model="currentTab"
      type="card"
      class="tabs-component"
      @tab-click="handleTabClick"
    >

      <!-- 已完成的用户 -->
      <el-tab-pane
        label="已完成"
        name="complete"
        lazy
      >
        <div class="data-container">
          <!-- 滚动条 -->
          已完成用户数：{{ completeUser.userCount }}
          <ul
            v-if="!isDestroy"
            v-infinite-scroll="loadData"
            :infinite-scroll-disabled="completeUser.disabled"
          >
            <li
              v-for="user of completeUser.users"
              :key="user.id"
            >
              {{ user.realName }}({{ user.username }})
            </li>
            <p
              v-if="completeUser.loading"
              class="tip-text"
            >加载中...</p>
            <p
              v-if="completeUser.noMore"
              class="tip-text"
            >没有更多了</p>
          </ul>
        </div>
      </el-tab-pane>

      <!-- 未完成的用户 -->
      <el-tab-pane
        label="未完成"
        name="incomplete"
        lazy
      >
        <div class="data-container">
          <!-- 滚动条 -->
          未完成用户数：{{ incompleteUser.userCount }}
          <ul
            v-if="!isDestroy"
            v-infinite-scroll="loadData"
            :infinite-scroll-disabled="incompleteUser.disabled"
          >
            <li
              v-for="user of incompleteUser.users"
              :key="user.id"
            >
              {{ user.realName }}({{ user.username }})
            </li>
            <p v-if="incompleteUser.loading">加载中...</p>
            <p v-if="incompleteUser.noMore">没有更多了</p>
          </ul>
        </div>
      </el-tab-pane>
    </el-tabs>
  </el-dialog>
</template>

<script>
import { getPlanCompleteStatusApi } from '@/api/plan';

function getUserData() {
  return {
    loading: false,
    noMore: false,
    disabled: false,
    users: [], // 未完成的用户列表
    userCount: 0 // 未完成的用户数
  };
}

export default {
  name: 'CompleteStatus',
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
      currentTab: 'complete', // 当前Tab
      completeUser: getUserData(),
      incompleteUser: getUserData()
    };
  },
  computed: {
    completeFlag() {
      return this.currentTab === 'complete';
    }
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
      // 重置组件数据
      that.currentTab = 'complete';
      that.completeUser = getUserData();
      that.incompleteUser = getUserData();
      await that.getCompleteStatus();
      that.isDestroy = false;
    },
    handleDialogClosed() {
      this.isDestroy = true;
    },
    // 获取完成状态
    async getCompleteStatus() {
      const that = this;
      // 使数据有序加载
      if (that.completeFlag) {
        that.completeUser.disabled = true;
        that.completeUser.loading = true;
      } else {
        that.incompleteUser.disabled = true;
        that.incompleteUser.loading = true;
      }
      // 发起请求
      const response = await getPlanCompleteStatusApi({
        id: that.plan.id,
        complete: that.completeFlag,
        start: that.completeFlag
          ? that.completeUser.users.length
          : that.incompleteUser.users.length,
        count: 10
      });

      // 响应处理
      if (response.code === 0) {
        if (that.completeFlag) {
          that.completeUser.userCount = response.data.count;
          if (response.data.users.length === 0) {
            that.completeUser.noMore = true;
            that.completeUser.disabled = true;
          } else {
            that.completeUser.noMore = false;
            that.completeUser.disabled = false;
          }
        } else {
          that.incompleteUser.userCount = response.data.count;
          if (response.data.users.length === 0) {
            that.incompleteUser.noMore = true;
            that.incompleteUser.disabled = true;
          } else {
            that.incompleteUser.noMore = false;
            that.incompleteUser.disabled = false;
          }
        }
        for (const user of response.data.users) {
          if (that.completeFlag && !that.completeUser.users.includes(user)) {
            that.completeUser.users.push(user);
          } else if (
            !that.completeFlag &&
            !that.incompleteUser.users.includes(user)
          ) {
            that.incompleteUser.users.push(user);
          }
        }
      } else {
        console.error(response);
        that.$errorNotify(response, '获取完成状况');
      }
      // 加载完成
      if (that.completeFlag) {
        that.completeUser.loading = false;
      } else {
        that.incompleteUser.loading = false;
      }
    },

    // 处理TabClick事件
    async handleTabClick(tab) {
      if (tab !== this.currentTab) {
        await this.getCompleteStatus();
      }
    },

    // 加载用户完成数据
    async loadData() {
      await this.getCompleteStatus();
    }
  }
};
</script>

<style lang="scss" scoped>
.tabs-component {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

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
      margin: 10px 0;
    }

    .tip-text {
      font-size: 14px;
      color: #909399;
      text-align: center;
    }
  }
}
</style>
