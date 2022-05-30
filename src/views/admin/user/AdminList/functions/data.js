export default function data() {
  return {
    // 搜索相关数据
    search: {
      selectedOption: '',
      options: [
        { label: '请选择搜索项', value: '' },
        { label: '用户名称', value: 'username' },
        { label: '真实姓名', value: 'realName' },
        { label: '性别', value: 'gender' },
        { label: '年龄', value: 'age' },
        { label: '电话号码', value: 'phoneNumber' },
        { label: '所在支部', value: 'partyBranch' }
      ],
      inputContent: ''
    },
    // 表格相关数据
    table: {
      loading: false, // 表格加载状态
      adminList: [], // 表格用户列表
      selectedAdmins: [] // 选择的用户
    },
    // 分页相关数据
    pagination: {
      adminCount: 0, // 符合条件的用户数量
      pageSize: 10, // 每页显示的用户数量
      currentPage: 1 // 当前页面
    },
    AdminDialogVisible: false,
    isUpdateAdminForm: true,
    sharedAdmin: {}
  };
}
