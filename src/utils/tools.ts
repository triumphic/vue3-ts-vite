/* 工具函数方法 */

export function scrollTop() {
  document.body.scrollTop = 0
}

/**
 * @description: 组合函数并返回
 * @param func
 * @return func
 */
export const compose = function compose(...funcs: any[]) {
  if (funcs.length === 0) {
    return (arg: any) => arg
  }
  if (funcs.length === 1) {
    return funcs[0]
  }
  return funcs.reduce(
    (a, b) =>
      (...args: any) =>
        a(b(...args))
  )
}

/**
 * 防抖
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce(func: any, wait: number, immediate: boolean): any {
  let timeout: NodeJS.Timeout, args: any, context: any, timestamp: number, result: any

  const later = function () {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) {
          context = null
          args = null
        }
      }
    }
  }

  return function (...args: any) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = null
      args = null
    }

    return result
  }
}

/**
 * 节流
 * @param {Function} func
 * @param {number} wait
 * @return {*}
 */
export function throttle(func: { apply: (arg0: any, arg1: any[]) => void }, wait: number): any {
  // 上一次执行 fn 的时间
  let previous = 0
  // 将 throttle 处理结果当作函数返回
  return function (...args: any) {
    // 获取当前时间，转换成时间戳，单位毫秒
    const now = +new Date()
    // 将当前时间和上一次执行函数的时间进行对比
    // 大于等待时间就把 previous 设置为当前时间并执行函数 fn
    if (now - previous > wait) {
      previous = now
      func.apply(this, args)
    }
  }
}
