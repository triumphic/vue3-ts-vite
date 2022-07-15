export function registerOpenInstall() {
  const script = document.createElement('script')
  script.type = 'text/javascript'
  script.charset = 'UTF-8'
  script.src = 'https://web.cdn.openinstall.io/openinstall.js'
  document.getElementsByTagName('body')[0].appendChild(script)
  script.onload = () => {
    let data = window.OpenInstall.parseUrlParams()
    data = Object.assign(data, initParams(data))
    window.openInstallIns = new window.OpenInstall(
      {
        appKey: 'ftz4og',
        onready: () => {
          window.openInstallIns.schemeWakeup()
        }
      },
      data
    )
  }
}

interface initParamsType {
  contentId?: string | number
  topicId?: string | number
  shopId?: string | number
  activityId?: string | number
  globalType?: string | number
  invitationId?: string | number
  partyId?: string | number
  scId?: string | number
}

export function initParams(data: initParamsType) {
  const url = window.location.href
  const { contentId, topicId, shopId, activityId, globalType, invitationId, partyId, scId } = data
  const returnData = {
    gotoUrl: ''
  }
  if (url.indexOf('graphics') > -1) {
    returnData.gotoUrl = `wf://hobby/detail/imgTxt?contentId=${contentId}`
  } else if (url.indexOf('videoPage') > -1) {
    returnData.gotoUrl = `wf://hobby/detail/video?contentId=${contentId}`
  } else if (url.indexOf('xingmu') > -1) {
    returnData.gotoUrl = `wf://hobby/starmaku/detail?id=${scId}`
  } else if (url.indexOf('specialInfo') > -1) {
    returnData.gotoUrl = `wf://hobby/homepage/topicDetail?topicId=${topicId}`
  } else if (url.indexOf('topicInfo') > -1) {
    returnData.gotoUrl = `wf://hobby/tavern/topicDetail?topicId=${topicId}`
  } else if (url.indexOf('viewPoint') > -1) {
    returnData.gotoUrl = `wf://hobby/tavern/pointDetail?contentId=${contentId}`
  } else if (url.indexOf('themestore') > -1) {
    returnData.gotoUrl = `wf://hobby/tideMap/shopDetail?shopId=${shopId}`
  } else if (url.indexOf('activity?') > -1) {
    // ? 保留，防止路由匹配错误
    returnData.gotoUrl = `wf://hobby/tideMap/activitiesDetail?activityId=${activityId}`
  } else if (url.indexOf('pairing?') > -1) {
    // ? 保留，防止路由匹配错误
    returnData.gotoUrl = `wf://hobby/tideMap/anLiContentDetail?invitationId=${invitationId}`
  } else if (url.indexOf('active-detail?') > -1) {
    returnData.gotoUrl = `wf://hobby/detail/activity?contentId=${contentId}&contentType=${globalType}`
  } else if (url.indexOf('/activity/detail?') > -1) {
    returnData.gotoUrl = `wf://hobby/party/detail?partyId=${partyId}`
  }
  console.log('跳转app页面地址：', returnData)
  return returnData
}

export function toApp() {
  window.openInstallIns.wakeupOrInstall()
}
