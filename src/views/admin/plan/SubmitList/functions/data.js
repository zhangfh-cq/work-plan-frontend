import { PLAN_STATUS, SUBMIT_STATUS } from '@/config/config';

export default function data() {
  return {
    // 搜索数据
    search: {
      submitSelected: '',
      submitOptions: [
        { label: '请选择搜索条件', value: '' },
        { label: '审核记录ID', value: 'id' },
        { label: '提交者', value: 'submitter' },
        { label: '审核者', value: 'approver' },
        { label: '审核状态', value: 'status' }
      ],
      submitStatusOptions: [
        { label: SUBMIT_STATUS.APPROVED, value: SUBMIT_STATUS.APPROVED },
        { label: SUBMIT_STATUS.UNAPPROVED, value: SUBMIT_STATUS.UNAPPROVED },
        { label: SUBMIT_STATUS.AWAIT_AUDIT, value: SUBMIT_STATUS.AWAIT_AUDIT }
      ],
      submitContent: '',
      planSelected: '', // 计划选择项
      planOptions: [
        // 计划可选项
        { label: '请选择计划条件', value: '' },
        { label: '计划ID', value: 'id' },
        { label: '计划标题', value: 'title' },
        { label: '限制时间', value: 'limitDate' },
        { label: '发布者', value: 'publisher' },
        { label: '计划状态', value: 'status' }
      ],
      planStatusOptions: [
        { label: PLAN_STATUS.NORMAL, value: PLAN_STATUS.NORMAL },
        { labe: PLAN_STATUS.EXPIRED, value: PLAN_STATUS.EXPIRED },
        { label: PLAN_STATUS.LOCKED, value: PLAN_STATUS.LOCKED }
      ],
      planContent: '' // 输入内容
    },
    // 表格数据
    table: {
      loading: false, // 加载状态
      submitList: [], // 提交数组
      selectedSubmitItem: [] // 选择的提交项
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
    downloadPlanFilesVisible: false,
    renameSubmitFileVisible: false,
    sharedSubmit: null,
    sharedPlan: null
  };
}
