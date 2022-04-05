import Vue from 'vue'
import axios from 'axios'

const axiosIns = axios.create({
  baseURL: 'http://localhost:3000/api'
})

Vue.prototype.$api = axiosIns

export default axiosIns