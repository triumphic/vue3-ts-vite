import { defineStore } from 'pinia'
import { commonType } from './types'

export const useCommonStore = defineStore({
  id: 'common',
  state: (): commonType => ({
    titleBarHeight: 0,
    devMode: ''
  }),
  getters: {},
  actions: {
    setTitleBarHeight(titleBarHeight: number) {
      console.log('setTitleBarHeight', titleBarHeight)

      this.titleBarHeight = titleBarHeight
    },
    setDevMode(mode: string) {
      console.log('setDevMode', mode)

      this.devMode = mode
    }
  }
})
