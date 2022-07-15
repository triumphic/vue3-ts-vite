/* 数字的格式转化 */

// 取小数点后几位
export const priceFilter = (price: number, digit = 2): number => {
  let ret
  if (!price) {
    ret = 0
  } else {
    ret = price / 100
  }
  return ret.toFixed(digit)
}
// 取整数位
export const priceFront = (price: number) => {
  let ret
  if (price) {
    ret = String((price / 100).toFixed(2)).split('.')
    if (Number(ret[0]) === 0) {
      return `0.${ret[1]}`
    }
    return ret[0]
  }
  return 0
}

// 向上取整
export const priceCeil = (price: number): number => {
  let ret
  if (!price) {
    ret = 0
  } else {
    ret = price / 100
  }
  return Math.ceil(ret)
}

/**
 *@params {number} 源数据
 *@params {digit} 保留到小数点后几位
 *@return {number | string} 数值或xx万
 */
export const scientificNotationFilter = (number: number, digit = 1): string | number => {
  if (Number.isNaN(number)) return number
  if (!number) return number ?? 0
  if (number < 10000) {
    return number
  }
  const res = (number / 10000).toFixed(digit)
  return `${res}万`
}

// 数字过千、过万 转 k、w
export const n2w = (num: number): string | number => {
  if (!num) return 0
  return num >= 1e3 && num < 1e4 ? num : num >= 1e4 ? (num / 1e4).toFixed(1) + 'w' : num
}
