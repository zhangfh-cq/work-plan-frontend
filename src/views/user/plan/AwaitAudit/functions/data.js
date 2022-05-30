import { PLAN_STATUS } from '@/config/config';

export default function data() {
  return {
    // 搜索数据
    search: {
      selected: '', // 计划选择项
      options: [
        // 计划可选项
        { label: '请选择搜索条件', value: '' },
        { label: '计划ID', value: 'id' },
        { label: '计划标题', value: 'title' },
        { label: '限制时间', value: 'limitDate' },
        { label: '发布者', value: 'publisher' },
        { label: '计划状态', value: 'status' }
      ],
      statusOptions: [
        { label: PLAN_STATUS.NORMAL, value: PLAN_STATUS.NORMAL },
        { labe: PLAN_STATUS.EXPIRED, value: PLAN_STATUS.EXPIRED },
        { label: PLAN_STATUS.LOCKED, value: PLAN_STATUS.LOCKED }
      ],
      content: '' // 输入内容
    },
    // 表格数据
    table: {
      loading: false, // 加载状态
      submitList: [] // 提交数组
    },
    // 分页数据
    pagination: {
      dataCount: 0, // 符合条件的数据数量
      pageSize: 10, // 每页显示的数据数量
      currentPage: 1 // 当前页面
    },
    progress: {
      visible: false,
      percentage: 0
    },
    contentVisible: false,
    uploadFileVisible: false,
    sharedPlan: null
  };
}
