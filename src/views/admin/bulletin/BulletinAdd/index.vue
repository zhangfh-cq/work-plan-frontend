<template>
  <div id="container">
    <el-form
      ref="bulletinForm"
      :rules="formRules"
      :model="formData"
    >
      <!-- 标题 -->
      <el-form-item
        label="公告标题"
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
        label="公告内容"
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

      <!-- 发布公告 -->
      <div class="bottom-container">
        <el-button
          type="primary"
          icon="el-icon-plus"
          class="publish-button"
          :loading="publishButtonLoading"
          @click="publishBulletin"
        >发布公告</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import { addBulletinApi } from '@/api/bulletin';
import { BULLETIN_VALIDATE_RULES } from '@/config/config';

export default {
  name: 'BulletinAdd',
  data() {
    return {
      formData: {
        title: '',
        content: ''
      },
      formRules: {
        title: BULLETIN_VALIDATE_RULES.title,
        content: BULLETIN_VALIDATE_RULES.content
      },
      publishButtonLoading: false
    };
  },
  methods: {
    publishBulletin() {
      const that = this;
      that.$refs.bulletinForm.validate(async function (valid) {
        if (valid) {
          that.publishButtonLoading = true;
          // 发起请求
          const response = await addBulletinApi(that.formData);
          if (response.code === 0) {
            that.$successNotify('公告发布');
          } else {
            console.error(response);
            that.$errorNotify(response, '公告发布');
          }
          that.publishButtonLoading = false;
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
  margin: 30px;
  // 底部盒子
  .bottom-container {
    display: flex;
    justify-content: center;
    align-content: center;
    padding: 10px;
    // 发布按钮
    .publish-button {
      padding: 15px;
    }
  }
}
</style>
