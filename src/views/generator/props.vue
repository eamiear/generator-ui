<template>
  <section class="generator-wrapper">
    <table-base
      ref="generator"
      :height="initialHeight"
      :columns="columns"
      :fetch-data-async="fetchTableDataAsync">

     <template slot="actionBar">
       <el-button icon="el-icon-plus" @click="createRecord()">添加记录</el-button>
       <el-button type="primary" @click="refresh">刷新</el-button>
     </template>
    </table-base>

    <el-dialog :title="dialog.title" :visible.sync="dialog.visible" width="40%" :close-on-click-modal="false">
      <el-form :model="propsModel">
        <el-form-item label="键名" :label-width="dialog.labelWidth">
          <el-input v-model="propsModel.key" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="键值" :label-width="dialog.labelWidth">
          <el-input v-model="propsModel.value"></el-input>
        </el-form-item>
        <el-form-item label="描述" :label-width="dialog.labelWidth">
          <el-input v-model="propsModel.remark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog.visible = false">取 消</el-button>
        <el-button type="primary" @click="submitPropsModel">确 定</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
import TableBase from '@/assets/package/table-base'
import '@/assets/package/style/index.scss'
import API from '@/api/generator'
export default {
  data () {
    return {
      initialHeight: 500,
      query: {
        page: 1,
        limit: 10
      },
      dialog: {
        title: '新增属性',
        visible: false,
        status: 0,
        labelWidth: '50px'
      },
      propsModel: {
        key: '',
        value: '',
        status: 0,
        remark: ''
      },
      columns: [
        {
          label: '序号',
          prop: 'id',
          align: 'center'
        },
        {
          label: '键名',
          prop: 'key',
          align: 'center'
        },
        {
          label: '键值',
          prop: 'value',
          align: 'center'
        },
        {
          label: '状态',
          prop: 'status',
          align: 'center',
          formatter (status) {
            return status === 0 ? '可用' : '移除'
          }
        },
        {
          label: '描述',
          prop: 'remark',
          align: 'center'
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
    getToolboxRender (h, {id}) {
      return [
        <el-button icon="el-icon-edit" onClick={() => this.editRecord(id)}></el-button>,
        <el-button icon="el-icon-delete" onClick={() => this.deleteRecord(id)}></el-button>
      ]
    },
    async fetchTableDataAsync (pageNo, pageSize) {
      this.query.page = pageNo
      this.query.limit = pageSize
      const response = await API.getPropsList(this.query)
      if (response.code === 0) {
        return {data: response.data.list, total: response.data.total}
      }
    },
    createRecord () {
      this.dialog.visible = true
      this.dialog.status = 0
    },
    editRecord (id) {
      this.dialog.title = '编辑属性'
      this.dialog.visible = true
      this.dialog.status = 1
      API.getPropsRecord(id).then(props => {
        if (props.code === 0) {
          this.propsModel = props.data
        }
      })
    },
    deleteRecord (id) {
      this.$confirm('确认删除?', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        API.deletePropsRecord(id).then(response => {
          this.$message({
            type: response.code === 0 ? 'success' : 'error',
            message: response.code === 0 ? '删除成功' : '删除失败'
          })
          if (response.code === 0) {
            this.refresh()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    submitPropsModel () {
      API.createOrUpdateRecord(this.dialog.status, this.propsModel).then(response => {
        if (response.code === 0) {
          this.$message({
            type: 'success',
            message: '操作成功'
          })
          this.dialog.visible = false
          this.refresh()
        } else {
          this.$message({
            type: 'error',
            message: '操作失败'
          })
        }
      })
    },
    refresh () {
      const ins = this.$refs.generator.getTablePlusInstance()
      ins.reload()
    }
  }
}
</script>

<style lang="css" scoped>
.generator-wrapper{
  padding: 20px;
}
</style>
