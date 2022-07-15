/* query相关函数 */

/**
 * @description: 获取url query参数
 * @param {string} name
 * @return {any}
 */
export function getQueryString(name?: string): any {
  const url = window.location.search
  const theRequest: any = {}
  if (url.indexOf('?') != -1) {
    const str = url.substr(1)
    const strs = str.split('&')
    for (let i = 0; i < strs.length; i++) {
      theRequest[strs[i].split('=')[0]] = decodeURIComponent(strs[i].split('=')[1])
    }
  }
  if (!name) {
    return theRequest
  }
  return theRequest[name] ? theRequest[name] : ''
}

/**
 * 替换url的指定参数
 * @param {*} url 需要替换的url
 * @param {*} name 参数名称
 * @param {*} value 替换的值
 */
export function replaceQueryString(url: string, name: string, value: string) {
  const re = new RegExp(name + '=[^&]*', 'gi')
  return url.replace(re, name + '=' + value)
}
