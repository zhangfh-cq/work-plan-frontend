<template>
  <el-dialog
    :visible.sync="visibleData"
    center
    title="编辑公告"
    @open="handleDialogOpen"
    @closed="handleDialogClosed"
  >
    <div
      v-if="!isDestroy"
      id="container"
    >
      <el-form
        ref="bulletinForm"
        :rules="formRules"
        :model="formData"
      >
        <!-- 标题 -->
        <el-form-item
          label="标题"
          prop="title"
        >
          <el-input
            v-model="formData.title"
            clearable
            show-word-limit
            maxlength="30"
            type="text"
            placeholder="请输入公告标题"
          />
        </el-form-item>

        <!-- 内容 -->
        <el-form-item
          label="内容"
          prop="content"
        >
          <el-input
            v-model="formData.content"
            :autosize="{minRows:10,maxRows:15}"
            show-word-limit
            maxlength="500"
            type="textarea"
            placeholder="请输入公告内容"
          />
        </el-form-item>

        <!-- 更新公告 -->
        <div class="bottom-container">
          <el-button
            type="primary"
            icon="el-icon-edit"
            class="update-button"
            :loading="updateButtonLoading"
            @click="updateBulletin"
          >更新公告</el-button>
        </div>
      </el-form>
    </div>
  </el-dialog>
</template>

<script>
import { updateBulletinApi } from '@/api/bulletin';
import { BULLETIN_VALIDATE_RULES } from '@/config/config';

export default {
  name: 'UpdateBulletin',
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
      visibleData: false,
      isDestroy: true,
      formData: {
        title: '',
        content: ''
      },
      formRules: {
        title: BULLETIN_VALIDATE_RULES.title,
        content: BULLETIN_VALIDATE_RULES.content
      },
      updateButtonLoading: false
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
    handleDialogOpen() {
      const that = this;
      that.isDestroy = false;
      // 遍历重置组件数据
      Object.entries(that.formData).forEach(function ([key, value]) {
        that.formData[key] = that.bulletin[key] ? that.bulletin[key] : '';
      });
    },
    handleDialogClosed() {
      this.isDestroy = true;
    },
    async updateBulletin() {
      const that = this;
      that.$refs.bulletinForm.validate(async function (valid) {
        if (valid) {
          that.updateButtonLoading = true;
          // 发起请求
          const data = Object.assign({ id: that.bulletin.id }, that.formData);
          const response = await updateBulletinApi(data);
          if (response.code === 0) {
            that.$successNotify('公告更新');
            that.$emit('refresh-bulletin');
            that.visibleData = false;
          } else {
            console.error(response);
            that.$errorNotify(response, '公告更新');
          }
          that.updateButtonLoading = false;
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
#container {
  margin: 10px;

  .tip-text {
    font-size: 14px;
    color: #909399;
    text-align: center;
  }
  // 底部盒子
  .bottom-container {
    display: flex;
    justify-content: center;
    align-content: center;
    padding: 10px;
    // 编辑按钮
    .update-button {
      padding: 15px;
    }
  }
}
</style>
