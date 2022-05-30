export default function handleSearch() {
  const that = this;
  if (
    !that.search.submitSelected &&
    !that.search.submitContent &&
    !that.search.planSelected &&
    !that.search.planContent
  ) {
    // 重置数据
    that.$router.push({
      query: {
        start: (that.pagination.currentPage - 1) * that.pagination.pageSize,
        count: that.pagination.pageSize
      }
    });
  } else if (
    (that.search.submitSelected && that.search.submitContent) ||
    (that.search.planSelected && that.search.planContent)
  ) {
    if (that.search.planSelected === 'limitDate') {
      that.search.planContent = new Date(
        that.search.planContent
      ).toLocaleString();
    }
    // 解析搜索参数
    const queryParams = Object.assign(
      {
        start: (that.pagination.currentPage - 1) * that.pagination.pageSize,
        count: that.pagination.pageSize
      },
      that.search.submitSelected
        ? { 'submit-option': that.search.submitSelected }
        : null,
      that.search.submitContent
        ? { 'submit-value': that.search.submitContent }
        : null,
      that.search.planSelected
        ? { 'plan-option': that.search.planSelected }
        : null,
      that.search.planContent ? { 'plan-value': that.search.planContent } : null
    );
    that.$router.push({ query: queryParams });
  }
}
