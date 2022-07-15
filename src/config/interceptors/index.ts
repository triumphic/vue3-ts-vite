import { CONSOLE_REQUEST_ENABLE, CONSOLE_RESPONSE_ENABLE } from '../index'
import qs from 'qs'
import { useUserStore } from '@/store/user'
import { getQueryString } from '@/utils/query'
import { appAgentBol } from '@/utils/context'
import type { RequestConfig, ResponseData } from '@/utils/service/request/types'
import { Toast } from 'vant'
import { Loading } from '@/components/Loading'

function regContentType(config: RequestConfig) {
  const spReg = /elephant\/api\/public\/auth|order\/address\/save/
  const contentType = String(config.headers['Content-Type'])
  return contentType === undefined || (/x-www-form-urlencoded/.test(contentType) && !spReg.test(config.url))
}

export async function requestSuccessFunc(config: RequestConfig) {
  const { userIdentity, deviceInfo, getUserInfoByApp } = useUserStore()
  !config.noShowLoading && Loading.open()

  // 开启请求参数打印
  CONSOLE_REQUEST_ENABLE && console.info('请求参数打印:', `url: ${config.url}`, config)

  const { token } = userIdentity
  if (token) {
    config.headers.Token = token
  } else if (getQueryString('token')) {
    config.headers.Token = getQueryString('token')
  } else if (appAgentBol()) {
    const userInfo = await getUserInfoByApp()
    if (userInfo?.token) {
      config.headers.Token = userInfo.token
    }
  }

  // 设备号
  const { deviceNo, oaid } = deviceInfo
  if (deviceNo) config.headers['Device-Id'] = deviceNo
  if (oaid) config.headers['Oa-Id'] = oaid

  if (config.noStringify) return config
  // 处理请求体携带参数格式
  const Method = config.method.toLocaleLowerCase()
  if (['post', 'put', 'delete'].includes(Method)) {
    if (regContentType(config)) config.data = qs.stringify(config.data)
  }
  return config
}

export function requestFailFunc(error: {
  noShowLoading: boolean
  noShowDefaultError: boolean
  message: string | number
}) {
  error && !error.noShowLoading && Loading.clear()
  error && !error.noShowDefaultError && Toast(error.message as string)
  return Promise.reject(error) // 在调用的那边可以拿到(catch)你想返回的错误信息
}

export function responseSuccessFunc(res: ResponseData) {
  // 开启请求参数打印
  CONSOLE_RESPONSE_ENABLE && console.info('响应数据打印:', `url: ${res.config.url}`, res.data)
  const reqUrl = res.config.url
  const result = res.data
  // 开启响应数据打印
  res.config && !res.config.noShowLoading && Loading.clear()
  const spReg = /writeImages|elephant\/api\/public\/auth|getLoginSmsCode|submitWithdrawApply|imgSendVerCode/
  if (spReg.test(reqUrl)) {
    return result
  }

  switch (result.code) {
    case 200:
      return result.data
    default: {
      // 业务中还会有一些特殊 code 逻辑，我们可以在这里做统一处理，也可以下方它们到业务层
      if (result.code === -200 && appAgentBol()) {
        console.log('唤起登录')
        const { resetUserInfo } = useUserStore()
        resetUserInfo()
        window.location.href = 'wf://hobby/login/login?bridgeJsName=loginReloadPage' // 去登录
        return Promise.reject(result)
      }
      const msg = result.msg || result.msg || `业务错误:${result.code}`
      if (res.config && !res.config.noShowDefaultError) {
        Toast(msg)
      }
      return Promise.reject(result)
    }
  }
}
export function responseFailFunc(err: { response: ResponseData; message: string }) {
  if (err && err.response) {
    switch (err.response.status) {
      case 400:
        err.message = '请求错误'
        break

      case 401:
        err.message = '未授权，请登录'
        break

      case 403:
        err.message = '拒绝访问'
        break

      case 404:
        err.message = `请求地址出错: ${err.response.config.url}`
        break

      case 408:
        err.message = '请求超时'
        break

      case 500:
        err.message = '服务器内部错误'
        break

      case 501:
        err.message = '服务未实现'
        break

      case 502:
        err.message = '网关错误'
        break

      case 503:
        err.message = '服务不可用'
        break

      case 504:
        err.message = '网关超时'
        break

      case 505:
        err.message = 'HTTP版本不受支持'
        break

      default:
        err.message = '出现未知错误'
        break
    }
  }
  err && err.message && Toast(err.message)
  Loading.clear()
  return Promise.reject(err)
}
