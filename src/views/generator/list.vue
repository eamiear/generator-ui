<template>
  <section class="generator-wrapper">
    <table-base
      ref="generator"
      :height="initialHeight"
      :columns="columns"
      :fetch-data-async="fetchTableDataAsync"
      @select="selectRows"
      @select-all="selectRows">

     <template slot="actionBar">
       <el-button icon="el-icon-download" @click="generateCode()">生成代码</el-button>
       <el-button type="primary" @click="refresh">刷新</el-button>
     </template>
    </table-base>
  </section>
</template>

<script>
import TableBase from '@/assets/package/table-base'
import '@/assets/package/style/index.scss'
import API from '@/api/generator'
import Constants from '@/common/constants'
import isArray from 'lodash.isArray'
export default {
  data () {
    return {
      initialHeight: 500,
      query: {
        page: 1,
        limit: 10
      },
      selectedTableNames: [],
      columns: [
        {
          type: 'selection'
        },
        {
          label: '表名',
          prop: 'tableName',
          align: 'center'
        },
        {
          label: '描述',
          prop: 'tableComment',
          align: 'center'
        },
        {
          label: '引擎',
          prop: 'engine',
          align: 'center'
        },
        {
          label: '创建时间',
          prop: 'createTime',
          align: 'createTime'
        },
        {
          label: '操作',
          renderToolBox: this.getToolboxRender,
          align: 'center'
        }
      ]
    }
  },
  components: {
    TableBase
  },
  methods: {
    getToolboxRender (h, {tableName}) {
      return [
        <el-button icon="el-icon-download" onClick={() => this.generateCode(tableName)}></el-button>
      ]
    },
    generateCode (tableName) {
      if (tableName && !isArray(tableName)) {
        tableName = [tableName]
      } else {
        tableName = this.selectedTableNames
      }
      if (!tableName || (tableName && tableName.length === 0)) {
        alert('请选择记录!')
        return
      }
      location.href = `${Constants.BASE_API}/code?tables=` + JSON.stringify(tableName)
    },
    async fetchTableDataAsync (pageNo, pageSize) {
      this.query.page = pageNo
      this.query.limit = pageSize
      const response = await API.getTableList(this.query)
      if (response.code === 0) {
        return {data: response.data.list, total: response.data.total}
      }
    },
    refresh () {
      const ins = this.$refs.generator.getTablePlusInstance()
      ins.reload()
    },
    selectRows (row) {
      this.selectedTableNames = row.map(item => {
        return item.tableName
      })
    }
  }
}
</script>

<style lang="css" scoped>
.generator-wrapper{
  padding: 20px;
}
</style>
