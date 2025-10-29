import axios from 'axios'

export default defineNuxtPlugin(() => {
  const api = axios.create({
    baseURL: 'http://localhost:3000/api'
  })

  // Interceptor para adicionar token automaticamente
  api.interceptors.request.use((config) => {
    if (process.client) {
      const token = localStorage.getItem('token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }
    return config
  })

  return {
    provide: {
      api
    }
  }
})