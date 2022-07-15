import MTAH5 from 'mta-h5-analysis'

export default function tongji(eventID: any, data: any, type: string, methods = 'sendEvent') {
  try {
    console.log('事件数据：', eventID, data)
    if (type === 'self' && window.xxH5) {
      // console.log('事件数据：', eventID, data)
      // window.xxH5[methods](eventID, data) ??不能用
      switch (methods) {
        case 'sendEvent': // 点击事件
          window.xxH5.sendEvent(eventID, data)
          break
        case 'sendExposure': // 曝光事件
          window.xxH5.sendExposure(eventID, data)
          break
        case 'sendCommon': // 通用事件
          window.xxH5.sendCommon(eventID, data)
          break
        case 'sendSf': // 浏览事件
          window.xxH5.sendEvent(eventID, data, 'sf')
      }
    } else {
      MTAH5.clickStat(eventID, data)
    }
  } catch (error) {
    console.log('统计错误: ', error)
  }
}
