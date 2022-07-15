/* 时间格式转换 */

/**
 * 将一个日期分解为年，月，日
 * @param {Date|String} date 日期
 */
function resolveDate(date: string | number | Date) {
  if (typeof date === 'string') date = parseInt(date)
  if (typeof date === 'number') date = new Date(date)
  if (date instanceof Date) {
    return {
      year: date.getFullYear(),
      month: date.getMonth(),
      date: date.getDate()
    }
  }
  return null
}
/**
 * 返回 2017-08-18 的日期格式
 * @param {Object} dateObj  分解后的日期格式
 */
export function dateFormatBar(dateObj: any) {
  dateObj = resolveDate(dateObj)
  // debugger
  let month = dateObj.month + 1
  let date = dateObj.date
  if (month < 10) month = '0' + month
  if (date < 10) date = '0' + date
  return dateObj.year + '-' + month + '-' + date
}

/**
 * 返回 20170818 的日期格式
 * @param {Object} dateObj  分解后的日期格式
 */
export function dateFormatMMdd(dateObj: any) {
  dateObj = resolveDate(dateObj)
  // debugger
  let month = dateObj.month + 1
  let date = dateObj.date
  if (month < 10) month = '0' + month
  if (date < 10) date = '0' + date
  return dateObj.year + '' + month + '' + date
}

/**
 * @params {number} duration 时间毫秒
 * @return {string} h:m:s | m:s
 */
export const filtetDuration = (duration: number): string => {
  duration /= 1000
  if (!duration) return ''
  const h = Math.floor(duration / 3600)
  let m: number | string = Math.floor((duration % 3600) / 60)
  let s: number | string = Math.floor(duration % 60)
  m = m < 10 ? `0${m}` : m
  s = s < 10 ? `0${s}` : s
  return h > 0 ? `${h}:${m}:${s}` : `${m}:${s}`
}

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string}
 */
export function parseTime(time: string | number | Date, cFormat: string) {
  if (!time) return
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date: Date
  if (typeof time === 'object') {
    date = time
  } else {
    if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
      time = parseInt(time)
    }
    if (typeof time === 'number' && time.toString().length === 10) {
      time *= 1000
    }
    date = new Date(time)
  }
  const formatObj: any = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return timeStr
}
