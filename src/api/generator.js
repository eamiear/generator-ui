import service from '@/common/fetch'

const API = {
  getTableList (params) {
    return service.get('/list', {params})
  },
  getPropsList (params) {
    return service.get('/props/list', {params})
  },
  getPropsRecord (id) {
    return service.get('/props/record', {params: {id}})
  },
  createPropsRecord (props) {
    return service.post('/props/save', props)
  },
  updatePropsRecord (props) {
    return service.post('/props/update', props)
  },
  deletePropsRecord (id) {
    return service.delete('/props/delete', {params: {id}})
  },
  createOrUpdateRecord (status, props) {
    if (status === 0) {
      return this.createPropsRecord(props)
    } else {
      return this.updatePropsRecord(props)
    }
  }
}
export default API
