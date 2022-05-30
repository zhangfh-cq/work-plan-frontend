<template>
  <div class="search-container">
    <!-- 搜索条件1 -->
    <el-select
      v-if="hasFirst"
      v-model="firstSelectedData"
      size="medium"
      :class="[{'full-width':hasFirst&&hasSecond},'margin-around']"
      :placeholder="`请选择${firstOperate}条件`"
      @change="handleFirstSelectedChange"
    >
      <el-option
        v-for="option of firstOptions"
        :key="option.value"
        :value="option.value"
        :label="option.label"
      />
    </el-select>
    <el-date-picker
      v-if="hasFirst&&firstSelectedData===timeKey"
      v-model="firstContentData"
      type="datetime"
      size="medium"
      class="full-width"
      placeholder="请选择日期时间"
      @change="$emit('update:first-content',firstContentData)"
    />
    <el-select
      v-if="hasFirst&&firstSelectedData===statusKey"
      v-model="firstContentData"
      size="medium"
      :style="{width:'100%'}"
      :placeholder="`请选择${firstOperate}状态`"
      @change="$emit('update:first-content',firstContentData)"
    >
      <el-option
        v-for="option of firstStatusOptions"
        :key="option.value"
        :value="option.value"
        :label="option.label"
      />
    </el-select>
    <el-input
      v-else-if="hasFirst&&firstSelectedData!==timeKey&&firstSelectedData!==statusKey"
      v-model="firstContentData"
      clearable
      type="text"
      size="medium"
      placeholder="请输入搜索条件内容"
      @change="$emit('update:first-content',firstContentData)"
      @keyup.enter.native="$emit('search')"
    />
    <!-- 搜索条件2 -->
    <el-select
      v-if="hasSecond"
      v-model="secondSelectedData"
      size="medium"
      :class="[{'full-width':hasFirst&&hasSecond},'margin-around']"
      :placeholder="`请选择${secondOperate}条件`"
      @change="handleSecondSelectedChange"
    >
      <el-option
        v-for="option of secondOptions"
        :key="option.value"
        :value="option.value"
        :label="option.label"
      />
    </el-select>
    <el-date-picker
      v-if="hasSecond&&secondSelectedData===timeKey"
      v-model="secondContentData"
      type="datetime"
      size="medium"
      class="full-width"
      placeholder="请选择日期时间"
      @change="$emit('update:second-content',secondContentData)"
    />
    <el-select
      v-else-if="hasSecond&&secondSelectedData===statusKey"
      v-model="secondContentData"
      size="medium"
      class="full-width"
      :placeholder="`请选择${secondOperate}状态`"
      @change="$emit('update:second-content',secondContentData)"
    >
      <el-option
        v-for="option of secondStatusOptions"
        :key="option.value"
        :value="option.value"
        :label="option.label"
      />
    </el-select>
    <el-input
      v-else-if="hasSecond&&secondSelectedData!==timeKey&&secondSelectedData!==statusKey"
      v-model="secondContentData"
      clearable
      type="text"
      size="medium"
      placeholder="请输入搜索条件内容"
      @change="$emit('update:second-content',secondContentData)"
      @keyup.enter.native="$emit('search')"
    />
    <el-button
      type="primary"
      size="medium"
      icon="el-icon-search"
      class="search-button"
      :loading="buttonLoading"
      @click="$emit('search')"
    >搜索</el-button>
  </div>
</template>

<script>
export default {
  name: 'TableSearch',
  props: {
    timeKey: {
      type: String,
      default: 'date'
    },
    statusKey: {
      type: String,
      default: 'status'
    },
    hasFirst: {
      type: Boolean,
      default: false
    },
    firstOperate: {
      type: String,
      default: '搜索'
    },
    firstSelected: {
      type: String,
      default: ''
    },
    firstOptions: {
      type: Array,
      default: () => []
    },
    firstStatusOptions: {
      type: Array,
      default: () => []
    },
    firstContent: {
      type: [String, Date],
      default: ''
    },
    hasSecond: {
      type: Boolean,
      default: false
    },
    secondOperate: {
      type: String,
      default: '搜索'
    },
    secondSelected: {
      type: String,
      default: ''
    },
    secondOptions: {
      type: Array,
      default: () => []
    },
    secondStatusOptions: {
      type: Array,
      default: () => []
    },
    secondContent: {
      type: [String, Date],
      default: ''
    },
    buttonLoading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      firstSelectedData: this.firstSelected,
      firstContentData: this.firstContent,
      secondSelectedData: this.secondSelected,
      secondContentData: this.secondContent
    };
  },
  methods: {
    handleFirstSelectedChange() {
      this.firstContentData = '';
      this.$emit('update:first-content', this.firstContentData);
      this.$emit('update:first-selected', this.firstSelectedData);
    },
    handleSecondSelectedChange() {
      this.secondContentData = '';
      this.$emit('update:second-content', this.secondContentData);
      this.$emit('update:second-selected', this.secondSelectedData);
    }
  }
};
</script>

<style lang="scss" scoped>
$marginSize: 10px;
// 搜索容器
.search-container {
  display: flex;
  justify-content: end;
  align-items: center;
  margin: 0 $marginSize;

  .margin-around {
    margin: $marginSize;
  }
  .full-width {
    width: 100%;
  }
  // 搜索按钮
  .search-button {
    margin: $marginSize;
  }
}
</style>
