// user
export type userType = {
  userIdentity: {
    token: string
    userId: null | number | string
    openId: string
    SecretUid: string
  }
  deviceInfo: {
    deviceNo: null | number | string
    oaid: null | number | string
  }
  loginStatus: boolean
  stateHeight: number
  titleBarHeight: number
}

// commonType
export type commonType = {
  titleBarHeight: number
  devMode: string
}
