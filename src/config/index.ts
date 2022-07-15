import { envConfig } from './env'
// axios 默认配置
export const AXIOS_DEFAULT_CONFIG = {
  timeout: 36000,
  baseURL: envConfig.VITE_APP_API_BASE_URL
}

// 还有一些方便开发的配置
export const CONSOLE_REQUEST_ENABLE = false // 开启请求参数打印
export const CONSOLE_RESPONSE_ENABLE = false // 开启响应参数打印
export const isLocal = !(window.location.href.indexOf('https') > -1 || window.location.port === '3010')
export const OPEN_DEV_TOOL = false // 打开h5调试工具
