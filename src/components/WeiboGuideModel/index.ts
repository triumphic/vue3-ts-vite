import WeiboGuideComp from './index.vue'
import { mountComponent } from '@/composables/mount-components'

let queue = []
let instance
const WeiboGuide = {
  open: () => {
    instance = mountComponent(WeiboGuideComp)
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

export { WeiboGuide }
