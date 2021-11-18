import axios from "axios";
import { ElMessage } from 'element-plus'
import router from '../router'

// 响应拦截器，内部根据返回值，重新组装，统一管理
axios.interceptors.response.use(res => {
  // 业务逻辑判断
  if (res.status && res.status == 200) {
    if (res.data.code == 500 || res.data.code == 401 || res.data.code == 403) {
      ElMessage({
        showClose: true,
        message: res.data.message,
        type: 'error',
        center: true,
      })
      return;
    }
    if (res.data.message) {
      ElMessage({
        showClose: true,
        message: res.data.message,
        type: 'success',
        center: true,
      })
    }
  }
  return res.data;
}, error => {
  if (error.response.code == 504 || error.response.code == 404) {
    ElMessage({
      showClose: true,
      message: '服务器被吃了( ╯□╰ )',
      type: 'error',
      center: true,
    })
  } else if (error.response.code == 403) {
    ElMessage({
      showClose: true,
      message: '权限不足，请联系管理员！',
      type: 'error',
      center: true,
    })
  } else if (error.response.code == 401) {
    ElMessage({
      showClose: true,
      message: '请先登录！',
      type: 'error',
      center: true,
    })
    router.replace('/')
  } else {
    if (error.response.data.message) {
      ElMessage({
        showClose: true,
        message: error.response.data.message,
        type: 'error',
        center: true,
      })
    } else {
      ElMessage({
        showClose: true,
        message: '未知错误！',
        type: 'error',
        center: true,
      })
    }
  }
  return;
})

let base = ''
// post请求
export const postRequest = (url, params) => {
  return axios({
    method: 'post',
    url: `${base}${url}`,
    data: params
  })
}