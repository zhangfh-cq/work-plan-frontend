export default function handleSearch() {
  const that = this;
  if (!that.search.selectedOption && !that.search.inputContent) {
    // 重置搜索状态
    that.$router.push({
      query: {
        start: (that.pagination.currentPage - 1) * that.pagination.pageSize,
        count: that.pagination.pageSize
      }
    });
  } else if (that.search.selectedOption && that.search.inputContent) {
    // 解析搜索参数
    const queryParams = Object.assign(
      {
        start: (that.pagination.currentPage - 1) * that.pagination.pageSize,
        count: that.pagination.pageSize
      },
      that.search.selectedOption
        ? { option: that.search.selectedOption }
        : null,
      that.search.inputContent ? { value: that.search.inputContent } : null
    );
    that.$router.push({ query: queryParams });
  }
}
