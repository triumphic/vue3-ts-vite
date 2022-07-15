import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import buriedPoint from './utils/buriedPoint'
import { Toast } from 'vant'
import 'default-passive-events'

window.$tj = buriedPoint

const app = createApp(App)
app.use(store).use(router).use(Toast).mount('#app')
app.config.errorHandler = (err: unknown, vm, info) => {
  console.error(err, vm, info)
}
