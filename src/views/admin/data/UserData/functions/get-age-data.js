import { getUserAgeDataApi } from '@/api/data';

export default async function getUserAgeData() {
  const that = this;
  // 获取信息
  const response = await getUserAgeDataApi();
  // 判断响应
  if (response.code === 0) {
    // 格式化信息
    that.ageData = [];
    for (const key in response.data) {
      that.ageData.push({ name: key + '岁', value: response.data[key] });
    }
  } else {
    that.ageData.push({
      name: '数据',
      value: 100
    });
    console.error(response);
    that.$errorNotify(response, '获取用户年龄数据');
  }
}
