import { isProd } from '@/config/env'

export const getResolve = res => Promise.resolve(res)
/**
 * mock数据只对属性有效，后期会考虑新增原型装饰等
 * @param
 * @returns
 */
export const mock = function (mockData = {}) {
  return function (target, name) {
    // if (!descriptor && typeof target === 'function' && !isProd) {
    //   // 返回执行具体业务逻辑的函数
    // }
    if (!isProd) {
      target[name] = () => getResolve(mockData)
    }
    return target[name]
  }
}
