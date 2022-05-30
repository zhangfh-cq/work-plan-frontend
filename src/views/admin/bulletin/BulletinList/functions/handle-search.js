export default function handleSearch() {
  const that = this;
  if (!that.search.selected && !that.search.content) {
    // 重置搜索数据
    that.$router.push({
      query: {
        start: (that.pagination.currentPage - 1) * that.pagination.pageSize,
        count: that.pagination.pageSize
      }
    });
  } else if (that.search.selected && that.search.content) {
    // 解析搜索参数
    const queryParams = Object.assign(
      {
        start: (that.pagination.currentPage - 1) * that.pagination.pageSize,
        count: that.pagination.pageSize
      },
      that.search.selected ? { option: that.search.selected } : null,
      that.search.content ? { value: that.search.content } : null
    );
    that.$router.push({ query: queryParams });
  }
}
