import { apGetLocation } from '@/utils/appbridge'

// App右上角图标2x,3x图判断
export function checktellCancel(imgName: string) {
  // 获取适口大小
  const phoneviewport = window.devicePixelRatio

  const iconurl = {
    urlLowversion: 'https://cdn.xiaoxiangyoupin.com/image/' + imgName + '@2x.png',
    url2x: 'https://cdn.xiaoxiangyoupin.com/image/' + imgName + '@2x.png',
    url3x: 'https://cdn.xiaoxiangyoupin.com/image/' + imgName + '@3x.png'
  }
  // 获取app版本号
  const ua = navigator.userAgent
  const reg = /instalment\/([\d]+)\.([\d]+)\.([\d]+)/
  const rets = ua.match(reg)
  if (!rets) {
    return iconurl.urlLowversion
  }
  const ret1 = Number(rets[1])
  const ret2 = Number(rets[2])
  const ret3 = Number(rets[3])
  if (ret1 < 3 || (ret1 === 3 && ret2 < 5) || (ret1 === 3 && ret2 === 5 && ret3 < 8)) {
    return iconurl.urlLowversion
  }
  if (phoneviewport >= 3) {
    return iconurl.url3x
  }
  if (phoneviewport >= 2) {
    return iconurl.url2x
  }
  if (phoneviewport < 2) {
    return iconurl.urlLowversion
  }
}

export function assert(condition: any, msg: any) {
  if (!condition) throw new Error(`[Apior] ${msg}`)
}

export function lazyLoadSrcMatch(url: string) {
  return url && url.match(/\/upload\/manager\/(\d+)x(\d+)_(\d+)/)
}

// 获取当前城市定位信息
export function getLocationInfo() {
  return new Promise((resolve, reject) => {
    apGetLocation((res: string) => {
      const info = JSON.parse(res).body
      if (info && JSON.stringify(info) !== '{}') {
        const lon = info.longitude
        const lat = info.latitude
        const city = info.city
        resolve({
          lon,
          lat,
          city
        })
      } else {
        reject(info)
      }
    })
  })
}

export function getFontSize() {
  const docElement = document.documentElement
  const pageWidth = docElement.getBoundingClientRect ? docElement.getBoundingClientRect().width : docElement.clientWidth
  const fontSize = Math.max(pageWidth, docElement.clientWidth) / 10
  return fontSize
}
