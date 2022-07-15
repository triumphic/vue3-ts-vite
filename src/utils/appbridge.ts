declare type CFN = (any: any) => any
/**
 * @param {Function} callback 回调函数
 *
 */
export function setupWebViewJavascriptBridge(callback: any) {
  if (window.WebViewJavascriptBridge) {
    return callback(window.WebViewJavascriptBridge)
  }
  if (window.WVJBCallbacks) {
    return window.WVJBCallbacks.push(callback)
  }
  window.WVJBCallbacks = [callback]
  const WVJBIframe = document.createElement('iframe')
  WVJBIframe.style.display = 'none'
  WVJBIframe.src = 'xxyp://__bridge_loaded__'
  document.documentElement.appendChild(WVJBIframe)
  setTimeout(() => {
    document.documentElement.removeChild(WVJBIframe)
  }, 0)
}

/**
 * 启用webview动桥接设置
 * @param {String} cbName 注册的函数名
 * @param {Function} fn 回调函数
 */
export function wbBridgeSetup(cbName: any, fn: CFN) {
  setupWebViewJavascriptBridge((bridge: any) => {
    // console.log('设置成功')
    if (cbName && fn) {
      // console.log('注册函数', cbName, fn)
      bridge.registerHandler(cbName, fn)
    }
  })
}

/**
 * APP功能暴露接口
 * @param {String} type 调用那个功能 setTitle | getCity | toast | enableRefresh | showProgress
 * | getUserInfo | tel | contacts | share | isLogin | wxpay | alipay
 * @param params 各个功能需要的参数
 * @param {*} cfn 设置成功后的回调函数
 *
 */
export function apwbBridge(type: string, params?: any, cfn: CFN = function () {}) {
  // console.log('调用类型: ', type, params, cfn)
  let wbB = window.WebViewJavascriptBridge
  if (!wbB) {
    setTimeout(() => {
      wbB = window.WebViewJavascriptBridge
      // alert(wbB)
      // if (!wbB) console.error('任然无法使用window.WebViewJavascriptBridge对象')
      wbB && wbB.callHandler(type, params, cfn)
    }, 0)
  } else {
    wbB.callHandler(type, params, cfn)
  }
}

/**
 * 设置webview的标题
 * @param {String} content  标题名
 * @param {*} cnf 回调函数
 */
export function apSetTitle(content: string, cfn?: CFN) {
  apwbBridge('setTitle', { title: content }, cfn)
}

/**
 * 设置是否允许页面刷新
 * @param {Int} bol 是否云讯页面刷新 1 刷新 0 不刷新
 *
 */
export function apEnableRefresh(bol: number) {
  apwbBridge('enableRefresh', { enableRefresh: bol })
}

/**
 * 定位城市
 * @param {*Function} cfn
 */
export function apGetCity(cfn?: CFN) {
  apwbBridge('getCity', undefined, cfn)
}

/**
 * 当前定位信息，经纬度城市等
 * @param  标题名
 * @param {*} cnf 回调函数
 */
export function apGetLocation(cfn: CFN) {
  apwbBridge('getLocation', undefined, cfn)
}

// 跳转页面并传值
declare interface ApOpenControllerWithParams {
  url: string
  params?: {
    [key: string]: unknown
  }
}
export function apOpenControllerWithParams(params: ApOpenControllerWithParams) {
  apwbBridge('openControllerWithParams', params)
}

/**
 * 关闭webview回传给原生参数
 * @param {Object} params  标题名
 * @param {*} cnf 回调函数
 */
export function apOperateCallback(params: any) {
  apwbBridge('operateCallback', params)
}

/**
 * toash
 * @param {*String} content 文本
 */
export function apToast(content: string | number) {
  apwbBridge('toast', { content })
}
// 设置分享按钮
declare interface ApSetRightTitleParams {
  title?: string
  textColor?: string
  gotoUrl?: string
  icon?: string
  jsMethod?: string
}
export function apSetRightTitle(params: ApSetRightTitleParams) {
  apwbBridge('setRightTitle', params)
}
// 直接关闭webview
export function apClose() {
  apwbBridge('close', undefined)
}
// 返回键
export function back() {
  apwbBridge('back', undefined)
}

// 获取顶部状态栏高度
export function getStatusBarHeight(params: any, cb: CFN) {
  apwbBridge('getStatusBarHeight', undefined, cb)
}
// 改变顶部状态栏字体颜色
declare interface SetStatusBarStyleParams {
  hidden?: 1 | 0
  style?: 1 | 2
}
export function setStatusBarStyle(params: SetStatusBarStyleParams) {
  apwbBridge('setStatusBarStyle', params)
}

// 获取底部安全区域高度
export function apGetSafeAreaHeight(cb: CFN) {
  apwbBridge('getSafeAreaHeight', undefined, cb)
}

// 保存到相册
declare interface saveImageToAlbumParams {
  imageUrl: string
}
export function saveImageToAlbum(params: saveImageToAlbumParams, cb: CFN) {
  apwbBridge('saveImageToAlbum', params, cb)
}

/**
 * @param {Number} params 分享类型 1微信 2微信朋友圈 3短信 4新浪微博 5QQ
 * @param {Function} cnf
 */
export function apAwakeShare(params: any, cnf: (() => void) | undefined) {
  apwbBridge('awakeShare', params, cnf)
}

// 配置webview是否需要弹簧效果
declare interface BouncesParams {
  bounces: number | string
}
export function apBounces(params: BouncesParams) {
  apwbBridge('bounces', params)
}

/**
 * 关闭webView侧滑功能
 * @param {*} params
 * @param {*} cfn
 */
declare interface ForbidEdgeGesParams {
  forbidStatus: number | string
}
export function apForbidEdgeGes(params: ForbidEdgeGesParams) {
  apwbBridge('forbidEdgeGes', params)
}

// 复制
declare interface CopyToClipboardParams {
  content: number | string
}
export function apCopyToClipboard(params: CopyToClipboardParams, cfn: CFN) {
  apwbBridge('copyToClipboard', params, cfn)
}

// 获取复制内容
export function apGetClipboardContent(cfn: CFN) {
  apwbBridge('getClipboardContent', undefined, cfn)
}

// 是否登录
export function apIsLogin(cfn: CFN) {
  apwbBridge('isLogin', undefined, cfn)
}

// 本地获取token
export function getUserInfo(cfn: CFN) {
  apwbBridge('getUserInfo', undefined, cfn)
}

// closeSkid
export function apcloseSkid(cfn: CFN) {
  apwbBridge('closeSkid', undefined, cfn)
}

// 获取当前app权限状态
declare interface CheckPermissionParams {
  type: number
}
export function aqcheckPermission(params: CheckPermissionParams, cfn: () => any) {
  apwbBridge('checkPermission', params, cfn)
}

// 跳转到应用设置页面
export function aqgotoAppSetting() {
  apwbBridge('gotoAppSetting')
}

// 用浏览器打开
declare interface apopenWithBrowserParams {
  openUrl: string
}
export function apopenWithBrowser(params: apopenWithBrowserParams) {
  apwbBridge('openWithBrowser', params)
}

// 打电话
declare interface TelParams {
  telNumber: string | number
}
export function apTel(phoneNum: TelParams) {
  apwbBridge('tel', phoneNum)
}

// 去掉ios键盘顶部工具栏
export function apDeleteInputAccessoryView() {
  apwbBridge('deleteInputAccessoryView')
}

// 监听ios键盘高度
export function apMonitorKeyboard(cb: CFN) {
  apwbBridge('monitorKeyboard', cb)
}

// 获取移动设备号
export function apGetDeviceNo(cb: CFN) {
  apwbBridge('getDeviceNo', undefined, cb)
}

// 关闭苹果左滑功能
export function apReturn() {
  apwbBridge('closeInteractivePopGestureRecognizer')
}

// 打开苹果左滑功能
export function apNoReturn() {
  apwbBridge('openInteractivePopGestureRecognizer')
}

// 关闭安卓左滑功能
declare interface SetBackInterceptorParams {
  jsMethod?: string
}
export function apAndReturn(params: SetBackInterceptorParams) {
  apwbBridge('setBackInterceptor', params)
}

// 定义分享站外
declare interface ApShareChannelParams {
  sceneType: string | number
  objectId: string | number
  channelType: string | number
  title?: string
  desc?: string
  coverUrl?: string
  h5Url?: string
  posterUrl?: string
}
export function apShareChannel(params: ApShareChannelParams, cfn: CFN) {
  apwbBridge('shareChannel', params, cfn)
}
// 关闭webview并跳转
export function apdismissPresentContrllerAndJump(param: any) {
  apwbBridge('dismissPresentContrllerAndJump', param)
}
