import { getBulletinApi } from '@/api/bulletin';

export default async function getBulletins(customParams) {
  const that = this;
  that.bulletinLoading = true;
  // 参数处理
  let params;
  if (!customParams) {
    params = { start: 0, count: 1 };
  }
  // 获取公告列表
  const response = await getBulletinApi({ ...params });
  // 判断响应
  if (response.code === 0) {
    if (!customParams) {
      if (response.data.bulletins.length > 0) {
        that.bulletin = response.data.bulletins[0]; // 最新公告
        // 格式化时间
        that.bulletin.createDate = new Date(
          that.bulletin.createDate
        ).toLocaleString();
        that.bulletin.updateDate = new Date(
          that.bulletin.updateDate
        ).toLocaleString();
      } else {
        that.bulletin.title = '暂无公告';
        that.bulletin.content = '';
      }
    } else {
      that.bulletins = response.data.bulletins; // 公告列表
      // 格式化时间
      for (const bulletins of that.table.bulletins) {
        bulletins.createDate = new Date(bulletins.createDate).toLocaleString();
        bulletins.updateDate = new Date(bulletins.updateDate).toLocaleString();
      }
    }
  } else {
    console.error(response);
    that.$errorNotify(response, '获取公告');
  }
  that.bulletinLoading = false;
}
