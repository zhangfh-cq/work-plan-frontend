import { getUserGenderDataApi } from '@/api/data';

export default async function getUserGenderData() {
  const that = this;
  // 获取用户信息
  const response = await getUserGenderDataApi();
  // 判断响应
  if (response.code === 0) {
    // 格式化信息
    that.genderData = [];
    that.genderData.push({ name: '男', value: response.data.man });
    that.genderData.push({ name: '女', value: response.data.woman });
  } else {
    that.genderData.push({
      name: '数据',
      value: 100
    });
    console.error(response);
    that.$errorNotify(response, '获取用户性别数据');
  }
}
