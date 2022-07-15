import WxGuideComp from './index.vue'
import { mountComponent } from '@/composables/mount-components'

let queue = []
let instance
const WxGuide = {
  open: () => {
    instance = mountComponent(WxGuideComp)
    queue.push(instance)
  },
  close: () => {
    queue.forEach(item => {
      console.log('item:', item)
      item.unmount()
    })
    queue = []
  }
}

export { WxGuide }
