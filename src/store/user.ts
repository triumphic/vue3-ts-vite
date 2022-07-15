import { defineStore } from 'pinia'
import { getUserInfo, apGetDeviceNo } from '../utils/appbridge'
import { userType } from './types'

export const useUserStore = defineStore({
  id: 'user', // id必填，且需要唯一
  state: (): userType => ({
    userIdentity: {
      // 用户信息
      token: '',
      userId: null,
      openId: '',
      SecretUid: ''
    },
    deviceInfo: {
      // 设备信息
      deviceNo: null,
      oaid: null
    },
    loginStatus: false, // 登录组件显示状态
    stateHeight: 0,
    titleBarHeight: 0 // titleBar组件的高度
  }),
  getters: {},
  actions: {
    muUserMetaInfo(userInfo: { token?: string; userId?: any; openId?: string; SecretUid?: string }) {
      this.userIdentity = { ...this.userIdentity, ...userInfo }
    },
    setLoginStatus(status: boolean) {
      this.loginStatus = status
    },
    setStateHeight(stateHeight: number) {
      this.stateHeight = stateHeight
    },
    setTitleBarHeight(titleBarHeight: number) {
      window.console.log('titleBarHeight-store:', titleBarHeight)
      this.titleBarHeight = titleBarHeight
    },
    setDeviceNo(deviceInfo: { deviceNo: any; oaid: any }) {
      this.deviceInfo = deviceInfo
    },
    resetUserInfo() {
      this.userIdentity = {
        token: '',
        userId: null,
        openId: '',
        SecretUid: ''
      }
    },
    getUserInfoByApp() {
      window.console.log('getUserInfoByApp')
      return new Promise<{ userId: string; token: string }>((resolve, reject) => {
        try {
          getUserInfo((res: string) => {
            const userInfo = JSON.parse(res).body
            const userId = userInfo.userId || null
            const token = userInfo.token || null
            this.muUserMetaInfo({ userId, token })
            resolve({ userId, token })
          })
        } catch (error) {
          reject(error)
        }
      })
    },
    getDeviceNo() {
      return new Promise(resolve => {
        try {
          apGetDeviceNo((res: string) => {
            const deviceInfo = JSON.parse(res).body
            this.setDeviceNo(deviceInfo)
            resolve('getDeviceNo success')
          })
        } catch (error) {
          resolve('getDeviceNo fail')
        }
      })
    }
  },
  persist: {
    enabled: true,
    strategies: [
      {
        paths: ['userIdentity'],
        storage: window.sessionStorage
      }
    ]
  }
})
