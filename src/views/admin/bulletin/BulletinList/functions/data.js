export default function data() {
  return {
    // 搜索数据
    search: {
      selected: '', // 选择项
      options: [
        // 可选项
        { label: '请选择搜索项', value: '' },
        { label: '公告ID', value: 'id' },
        { label: '公告标题', value: 'title' },
        { label: '发布者', value: 'publisher' }
      ],
      content: '' // 输入内容
    },
    // 表格数据
    table: {
      loading: false, // 加载状态
      bulletins: [], // 公告数组
      selectedBulletins: [] // 选择的计划
    },
    selections: {
      deleteLoading: false
    },
    // 分页数据
    pagination: {
      dataCount: 0, // 符合条件的数据数量
      pageSize: 10, // 每页显示的数据数量
      currentPage: 1 // 当前页面
    },
    contentVisible: false,
    updateVisible: false,
    sharedBulletin: null
  };
}
