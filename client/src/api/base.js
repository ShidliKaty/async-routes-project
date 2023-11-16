import axios from "axios"

export const baseApi = axios.create({ baseURL: import.meta.env.VITE_API_URL })

//to slow down app

if (import.meta.env.VITE_SLOW_API === "true") {
    baseApi.interceptors.response.use(res => {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(res)
        }, 1000)
      })
    })
  }