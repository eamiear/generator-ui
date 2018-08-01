import axios from 'axios'

const service = axios.create({
  baseURL: 'http://192.168.231.67:6060/ura/generator',
  timeout: 16000
})

service.interceptors.request.use(config => {
  // setHeader()
  return config
}, error => {
  Promise.reject(error)
})

service.interceptors.response.use(({data}) => {
  return data
}, error => {
  return Promise.reject(error)
})

export default service
