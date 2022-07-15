import router from '@/router'
import { appAgentBol } from '@/utils/context'

import { back } from '@/utils/appbridge'

export function useGoBack() {
  if (appAgentBol() && window.history.length <= 1) {
    back()
  } else {
    router.go(-1)
  }
}
