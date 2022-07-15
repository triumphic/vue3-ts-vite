import type { AxiosRequestConfig, AxiosResponse, AxiosResponseHeaders } from 'axios'

export interface RequestInterceptors<T> {
  // 请求拦截
  requestInterceptors?: (config: AxiosRequestConfig) => Promise<AxiosRequestConfig> | AxiosRequestConfig
  requestInterceptorsCatch?: (err: any) => any
  // 响应拦截
  responseInterceptors?: (config: T) => T
  responseInterceptorsCatch?: (err: any) => any
}

// 自定义传入的参数
export interface RequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: RequestInterceptors<T>
  noShowLoading?: boolean
  noShowDefaultError?: boolean
  noStringify?: boolean
}
export interface CancelRequestSource {
  [index: string]: () => void
}

export interface ResponseData<T = any, D = any> {
  data: T
  status: number
  statusText?: string
  headers: AxiosResponseHeaders
  config?: RequestConfig<D>
  request?: any
}
