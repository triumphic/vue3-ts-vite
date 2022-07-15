import request from '@/utils/service'

export function auth(params = {}, config = {}) {
  return request({
    method: 'POST',
    url: 'elephant/api/public/auth',
    params,
    ...config
  })
}

export function getSign(params = {}, config = {}) {
  return request({
    method: 'POST',
    url: 'api/v1/wechat/sign',
    headers: {
      'Content-Type': 'application/json'
    },
    params,
    ...config
  })
}
