import Request from './request'
import { AXIOS_DEFAULT_CONFIG } from '@/config'

import type { RequestConfig } from './request/types'
import { requestSuccessFunc, requestFailFunc, responseSuccessFunc, responseFailFunc } from '@/config/interceptors'

export interface MYResponse<T> {
  statusCode: number
  desc: string
  result: T
}

// 重写返回类型
interface MYRequestConfig<T, R> extends RequestConfig<MYResponse<R>> {
  data?: T
}

const request = new Request({
  baseURL: AXIOS_DEFAULT_CONFIG.baseURL as string,
  timeout: AXIOS_DEFAULT_CONFIG.timeout,
  interceptors: {
    // 请求拦截器
    requestInterceptors: requestSuccessFunc,
    requestInterceptorsCatch: requestFailFunc,
    // 响应拦截器
    responseInterceptors: responseSuccessFunc,
    responseInterceptorsCatch: responseFailFunc
  }
})

/**
 * @description: 函数的描述
 *
 * @generic D 请求参数
 * @generic T 响应结构
 * @param {MYRequestConfig} config 不管是GET还是POST请求都使用data
 * @returns {Promise}
 */
const myRequest = <D = any, T = any>(config: MYRequestConfig<D, T>) => {
  const { method = 'GET' } = config
  if (method === 'get' || method === 'GET') {
    config.params = config.data
  }
  return request.request<MYResponse<T>>(config)
}

// 取消请求
export const cancelRequest = (url: string | string[]) => request.cancelRequest(url)

// 取消全部请求
export const cancelAllRequest = () => request.cancelAllRequest()

export default myRequest
