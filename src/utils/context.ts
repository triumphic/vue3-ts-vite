/* 判断当前运行环境 */

import { getQueryString } from './query'

export const isSina = !!navigator.userAgent.toLowerCase().match(/sinaFQ/i)
// 是否是小象
export const isXxyp = !!navigator.userAgent.toLowerCase().match(/instalment/i)

const appUseragent = /instalment|sinaFQ|enjoylife|hobby/
const wxUseragent = 'micromessenger'

/**
 * 当前是否在APP中
 * @param userAgent 可以传入userAgent判断，方便支持服务端渲染
 *
 */
export function appAgentBol(userAgent?: string) {
  const ua = userAgent || navigator.userAgent
  if (ua.match(appUseragent)) {
    return true
  }
  return false
}

/**
 * 当前是否在微信中
 * @param userAgent 可以传入userAgent判断，方便支持服务端渲染
 *
 */
export function wxAgentBol(userAgent?: string) {
  const ua = (userAgent && userAgent.toLocaleLowerCase()) || navigator.userAgent.toLocaleLowerCase()
  if (ua.match(wxUseragent)) {
    return true
  }
  return false
}

/**
 * 当前环境是否移动端
 * @param {*} userAgent
 * @returns
 */
export function isMobile(userAgent?: string) {
  const ua = userAgent || navigator.userAgent
  if (
    ua.match(
      /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
    )
  ) {
    return true // 移动端
  }
  return false // PC端
}

export function getAndroidVersion() {
  const ua = navigator.userAgent.toLowerCase()
  let version = null
  if (ua.indexOf('android') > 0) {
    const reg = /android [\d._]+/gi
    const info = ua.match(reg)
    version = (info + '').replace(/[^0-9|_.]/gi, '').replace(/_/gi, '.') // 得到版本号4.2.2
    version = parseInt(version.split('.')[0]) // 得到版本号第一位
  }

  return version
}

// 设备系统判断
export function isArd() {
  const u = navigator.userAgent
  const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1
  return isAndroid
}

export function isIos() {
  return !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
}

// 获取app版本
export function getAppVersion() {
  const ua = navigator.userAgent
  const reg = /hobby\/(\d)\.(\d)\.(\d{0,100})/
  const rets = ua.match(reg)
  if (rets) {
    return String(rets[1]) + '.' + rets[2] + '.' + rets[3]
  }
  return getQueryString('appVersion')
}

// 版本号比较 返回 大于 greater 等于 equal 小于 less 版本号一定是xx.xx.xx 三个数值段组成
export function appVersionCompare(v1, v2) {
  if (!v1 || !v2) {
    return ''
  }
  const v1Arr = v1.split('.')
  const v2Arr = v2.split('.')
  if (v1Arr.length !== 3 || v2Arr.length !== 3) {
    return ''
  }
  if (v1Arr[0] === v2Arr[0]) {
    if (v1Arr[1] === v2Arr[1]) {
      if (v1Arr[2] === v2Arr[2]) {
        return 'equal'
      }
      return v1Arr[2] > v2Arr[2] ? 'greater' : 'less'
    }
    return v1Arr[1] > v2Arr[1] ? 'greater' : 'less'
  }
  return v1Arr[0] > v2Arr[0] ? 'greater' : 'less'
}
