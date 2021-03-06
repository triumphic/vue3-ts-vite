import { createApp, Component } from 'vue'

export function mountComponent(RootComponent: Component) {
  console.log('RootComponent:', RootComponent)
  const app = createApp(RootComponent)
  const root = document.createElement('div')

  document.body.appendChild(root)

  return {
    instance: app.mount(root),
    unmount() {
      app.unmount()
      document.body.removeChild(root)
    }
  }
}
