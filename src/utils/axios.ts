import axios, { AxiosInstance } from 'axios';
import { message } from 'ant-design-vue';
// import { getStorage } from "./storage";
const baseUrl = process.env.BASE_URL
console.log(baseUrl)

interface Config {
  baseURL?:string,
  headers?:object
}

class Request {
  constructor(public baseUrl:string,public queue?:object){
  }
  getInsideConfig() {
    const config:Config = {
      baseURL: this.baseUrl,
      headers: {
        // 请求头
        // Authorization: 'Bearer ' + getToken(),
        // username: getStorage('userInfo')
      }
    }
    return config
  }
  // 拦截
  interceptors(instance: AxiosInstance, url:string) {
    // 拦截请求
    instance.interceptors.request.use(config => {
      // 处理config
      return config
    })
    // 拦截响应
    instance.interceptors.response.use(
      res => {
        let data = res.data
        if (data.rescode !== 0) {
          message.error(data.msg)
          return Promise.reject(data)
        } else {
          return res
        }
      },
      error => {
        // 处理错误
        console.log(error)
        return { error: '发生错误' }
      }
    )
  }
  request(options:any) {
    const instance = axios.create() //创建实例对象
    options = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance, options.url)
    return instance(options)
  }
}
const server = new Request(baseUrl)
export default server