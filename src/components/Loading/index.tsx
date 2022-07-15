import { ComponentPublicInstance } from 'vue'
import LoadingComp from './index.vue'
import { mountComponent } from '@/composables/mount-components'

interface LoadingOptions {
  loadingText: string
  duration: number
  color: string
  size: string
  textSize: string
  textColor: string
  vertical: boolean
}

let queue = []
const defaultOptions: LoadingOptions = {
  loadingText: '',
  duration: 0,
  color: '#c9c9c9',
  size: '30px',
  textSize: '14px',
  textColor: '#c9c9c9',
  vertical: true
}

export type ComponentInstance = ComponentPublicInstance<any, any>
let instance
const Loading = {
  open: (options?) => {
    Object.assign(defaultOptions, options)

    instance = mountComponent({
      setup() {
        return () => <LoadingComp {...defaultOptions} />
      }
    })
    queue.push(instance)
    if (options.duration) {
      setTimeout(() => {
        instance.unmount()
      }, options.duration)
    }
  },
  clear: () => {
    queue.forEach(item => {
      item.unmount()
    })
    queue = []
  }
}
export default Loading
export { Loading }
