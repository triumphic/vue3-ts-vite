import { appAgentBol } from './context'

// 跳转页面
// type 默认0  1:打开新的webview并关闭当前; 0: 打开新的webview, urlPrefix： url通用前缀，url: 需要带 / 路径
export function $gotoURL(url: string, type = 0, urlPrefix = '') {
  // 如果urlPrefix为空  并且  url参数的值不是以http、wflks:、wf:开头，，，判断为true
  if (!urlPrefix && !(/^http/.test(url) || /^wflks:/.test(url) || /^wf:/.test(url))) {
    urlPrefix = `${window.location.origin}/hobby-party`
  }
  let path = `${urlPrefix}${url}`
  if (type == 1) {
    // 页面url添加isCloseView参数
    // router.afterEach监听路由参数，关闭上一个页面的webView
    if (path.indexOf('?') == -1) {
      path += '?'
    } else {
      path += '&'
    }
    path += 'isCloseStackPage=1'
  }
  if (appAgentBol()) {
    path = path.replace(/^http/g, 'wflk')
  }
  window.location.href = path
}
