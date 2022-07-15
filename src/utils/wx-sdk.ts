import wx from 'weixin-js-sdk'
import { getSign } from '@/api/wx.js'

window.__wxsdk_isRegisterOk = false

/**
 * 微信分享初始化数据（微信公众号H5、微信内置浏览器H5）
 */
export const initShareData = {
  apiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'],
  config: {
    link: window.location.href,
    imgUrl: 'https://hobby-prod.oss-cn-hangzhou.aliyuncs.com/h5/static/common/shareCover.png',
    title: 'Hobby',
    desc: '潮流派对共创社区'
  }
}

/**
 * 获取微信分享所需的签名信息
 * @param {function} cb
 * @param {array} jsApiList
 */
export function registerWxSdk(jsApiList: string[], cb: () => void) {
  window.__wxsdk_isRegisterOk = false
  return getSign({
    url: window.location.href
  })
    .then((res: any) => {
      const { appId, timestamp, nonceStr, signature } = res
      initSdk({ appId, timestamp, nonceStr, signature }, jsApiList, cb)
    })
    .catch(() => {
      console.error('---获取微信公众签名失败---')
    })
}

interface wxConfig {
  appId: any
  timestamp: any
  nonceStr: any
  signature: any
}
/**
 * 微信配置项
 * @param {*} configData
 * @param {*} jsApiList
 * @param {*} cb
 * @param {*} debug
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export function initSdk(wxConfig: wxConfig, jsApiList: string[], cb: Function, debug = false) {
  wx.config({
    debug, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: wxConfig.appId, // 必填，公众号的唯一标识
    timestamp: wxConfig.timestamp, // 必填，生成签名的时间戳
    nonceStr: wxConfig.nonceStr, // 必填，生成签名的随机串
    signature: wxConfig.signature, // 必填，签名
    jsApiList // 必填，需要使用的JS接口列表
  })
  wx.ready(() => {
    console.log('微信分享初始化成功')
    window.__wxsdk_isRegisterOk = true
    cb()
  })
  wx.error((err: any) => {
    console.log('微信分享错误', err)
  })
}

/**
 * 整理微信分享所需的数据,并且注册签名
 * @param {*} shareConfig 微信分享所需的信息
 */
/**
 * 整理微信分享所需的数据,并且注册签名
 * @param {*} shareConfig 微信分享所需的信息
 */

interface wxShareType {
  apiList: string[]
  config: {
    link: string
    imgUrl: string
    title: string
    desc: string
  }
}
export function wxShare(shareConfig: wxShareType) {
  let jsApiList = initShareData.apiList
  let config = initShareData.config

  if (shareConfig && shareConfig.apiList) {
    jsApiList = shareConfig.apiList
  }

  if (shareConfig && shareConfig.config) {
    config = shareConfig.config
  }

  const cb = function () {
    wx.onMenuShareTimeline(config) // 朋友圈
    wx.onMenuShareAppMessage(config) // 好友
  }

  // 初始化过sdk 就直接配置分享数据
  if (window.__wxsdk_isRegisterOk) {
    cb()
  } else {
    registerWxSdk(jsApiList, cb)
  }
}
