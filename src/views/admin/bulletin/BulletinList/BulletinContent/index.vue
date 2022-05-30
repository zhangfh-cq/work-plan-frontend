<template>
  <el-dialog
    :visible.sync="visibleData"
    :title="bulletin?bulletin.title:''"
    center
  >
    <div class="container">
      <!-- 公告内容 -->
      <p class="content">{{ bulletin?bulletin.content:'' }}</p>

      <!-- 发布信息 -->
      <div class="footer">
        <p>{{ bulletin?bulletin.publisher:'' }} 于 {{ bulletin?bulletin.createDate:'' }} 发布</p>
      </div>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'BulletinContent',
  props: {
    visible: {
      type: Boolean,
      require: true,
      default: false
    },
    bulletin: {
      type: Object,
      require: true,
      default: () => {}
    }
  },
  data() {
    return {
      visibleData: false
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
  methods: {}
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-content: center;
  .content {
    font-size: 18px;
  }
  .footer {
    font-size: 14px;
    color: #909399;
    text-align: right;
  }
}
</style>
