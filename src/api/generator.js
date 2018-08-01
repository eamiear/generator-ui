import service from '@/common/fetch'

const API = {
  getTableList (params) {
    return service.get('/list', {params})
  }
}
export default API
