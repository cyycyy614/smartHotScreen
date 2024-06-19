<template>
  <div class="main">
    <el-table
      ref="leftTable"
      :data="tableData"
      tooltip-effect="dark"
      max-height="450"
      :row-class-name="tableRowClassName"
      style="width: 40%; margin: 30px"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" :selectable="canBeSelect"></el-table-column>
      <el-table-column label="日期" width="120">
        <template slot-scope="scope">{{ scope.row.date }}</template>
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="120"></el-table-column>
      <el-table-column prop="address" label="地址" show-overflow-tooltip></el-table-column>
    </el-table>
    <el-table
      ref="rightTable"
      :data="tableData"
      tooltip-effect="dark"
      max-height="450"
      :row-class-name="tableRowClassName"
      style="width: 40%; margin: 30px"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" :selectable="canBeSelect"></el-table-column>
      <el-table-column label="日期" width="120">
        <template slot-scope="scope">{{ scope.row.date }}</template>
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="120"></el-table-column>
      <el-table-column prop="address" label="地址" show-overflow-tooltip></el-table-column>
    </el-table>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  data() {
    return {
      tableData: [],
    }
  },
  methods: {
    handleSelectionChange(val) {},
    scrollLeft() {
      this.rightTable.scrollTop = this.leftTable.scrollTop
    },
    scrollRight() {
      this.leftTable.scrollTop = this.rightTable.scrollTop
    },
    canBeSelect(row) {
      if (row.id % 2 === 0) {
        return true // 返回true 可以选择
      } else {
        return false // 返回false 禁止选择
      }
    },
    tableRowClassName({ row, rowIndex }) {
      if (row.id % 2 === 0) {
        return 'warning-row'
      } else if (row.diff == 0) {
        return 'success-row'
      } else {
        return 'success-row'
      }
    },
  },
  mounted() {
    for (let i = 0; i < 100; i++) {
      this.tableData.push({
        id: i,
        date: '2016-05-07',
        name: '王小虎' + i,
        address: '上海市普陀区金沙江路 1518 弄',
      })
    }

    // 设置监听
    this.leftTable = this.$refs.leftTable.bodyWrapper
    this.rightTable = this.$refs.rightTable.bodyWrapper
    this.leftTable.addEventListener('scroll', _.throttle(this.scrollLeft, 85))
    this.rightTable.addEventListener('scroll', _.throttle(this.scrollRight, 85))
  },
}
</script>

<style lang="scss" scoped>
.main {
  display: flex;
}
::v-deep .el-table {
  .warning-row {
    background: #f3c2bd;
  }
  .success-row {
    background: #f0f9eb;
  }
}
</style>
