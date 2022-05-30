<template>
  <div class="container">
    <!-- 系统公告 -->
    <el-card
      shadow="always"
      class="card-container bulletin-card"
    >
      <!-- 卡片Header -->
      <template v-slot:header>
        <div class="bulletin-card-header">
          <span class="card-title">系统公告</span>
          <el-button
            type="primary"
            size="small"
            @click="handleCheckBulletins"
          >查看更多</el-button>
        </div>
      </template>
      <!-- 公告 -->
      <el-skeleton
        v-if="bulletinLoading"
        :rows="5"
        animated
      />
      <div
        v-else
        class="bulletin-container"
      >
        <p class="bulletin-title">{{ bulletin.title }}</p>
        <p>{{ bulletin.content }}</p>
      </div>
    </el-card>

    <!-- 用户信息 -->
    <el-card
      shadow="always"
      class="card-container"
    >
      <el-skeleton
        v-if="userInfoLoading"
        :rows="5"
        animated
      />
      <el-descriptions
        v-else
        title="用户信息"
      >
        <!-- 修改信息按钮 -->
        <template v-slot:extra>
          <el-button
            type="primary"
            size="small"
            icon="el-icon-edit-outline"
            @click="handleUpdateUserInfo"
          >修改</el-button>
        </template>
        <!-- 用户信息描述 -->
        <el-descriptions-item label="ID">{{ user.id }}</el-descriptions-item>
        <el-descriptions-item label="用户名称">{{ user.username }}</el-descriptions-item>
        <el-descriptions-item label="真实姓名">{{ user.realName }}</el-descriptions-item>
        <el-descriptions-item label="性    别">{{ user.gender }}</el-descriptions-item>
        <el-descriptions-item label="年    龄">{{ user.age }}</el-descriptions-item>
        <el-descriptions-item label="电话号码">{{ user.phoneNumber }}</el-descriptions-item>
        <el-descriptions-item label="所在支部">{{ user.partyBranch }}</el-descriptions-item>
        <el-descriptions-item label="角    色">{{ user.role }}</el-descriptions-item>
        <el-descriptions-item label="用户状态">{{ user.status }}</el-descriptions-item>
        <el-descriptions-item label="注册时间">{{ user.createDate }}</el-descriptions-item>
        <el-descriptions-item label="更新时间">{{ user.updateDate }}</el-descriptions-item>
      </el-descriptions>
    </el-card>

    <!-- 公告历史Dialog -->
    <bulletin-history :visible.sync="bulletinHistoryVisible" />

    <!-- 更新用户信息Dialog -->
    <update-user-info
      :visible.sync="updateUserVisible"
      :user="user"
      @refresh-user-info="handleRefreshUserInfo"
    />
  </div>
</template>

<script>
// 组件
import BulletinHistory from './BulletinHistory/index';
import UpdateUserInfo from './UpdateUserInfo/index';
// 函数
import getBulletins from './functions/get-bulletins';
import getUserInfo from './functions/get-user';

export default {
  name: 'HomeView',
  components: {
    BulletinHistory,
    UpdateUserInfo
  },
  data() {
    return {
      bulletinLoading: false,
      userInfoLoading: false,
      bulletin: {
        title: '系统公告',
        content: '公告详情'
      },
      bulletins: [],
      user: {},
      bulletinHistoryVisible: false,
      updateUserVisible: false
    };
  },
  async created() {
    // 组件创建时拉取数据
    this.getBulletins();
    this.getUserInfo();
  },
  methods: {
    // 获取公告
    getBulletins,
    // 获取用户信息
    getUserInfo,
    // 处理leCheckBulletins事件
    handleCheckBulletins() {
      this.bulletinHistoryVisible = true;
    },
    // 处理UpdateUserInfo事件
    handleUpdateUserInfo() {
      this.updateUserVisible = true;
    },
    // 处理RefreshUserInfo事件
    handleRefreshUserInfo() {
      this.getUserInfo();
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  .card-container {
    margin: 20px;
    // 公告Card Header
    .bulletin-card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .card-title {
        font-weight: bold;
      }
    }
    // 公告容器
    .bulletin-container {
      overflow: auto;
      line-height: 1.4;
      letter-spacing: 1;
      // 公告标题
      .bulletin-title {
        text-align: center;
        font-size: 18px;
      }
    }
  }
  .bulletin-card {
    height: 300px;
  }
}
</style>
