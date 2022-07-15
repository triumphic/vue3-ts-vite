import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { apSetTitle } from '@/utils/appbridge'
import { appAgentBol } from '@/utils/context'
import { useUserStore } from '@/store/user'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/404'
  },
  {
    path: '/404',
    name: 'NotFound',
    component: () => import('@/views/404/index.vue'),
    meta: {
      title: '404'
    }
  },
  {
    path: '/upgrade',
    name: 'Upgrade',
    component: () => import('@/views/upgrade/index.vue'),
    meta: {
      title: ''
    }
  }
]

const router = createRouter({
  history: createWebHistory('/hobby-party/'),
  routes
})

router.beforeEach(async (to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title as string
    apSetTitle(to.meta.title as string)
  }
  // APP中
  if (appAgentBol()) {
    // 获取token
    const { getUserInfoByApp, getDeviceNo } = useUserStore()
    const { userIdentity, deviceInfo } = useUserStore()
    if (!userIdentity.token) {
      getUserInfoByApp()
    }

    // 获取设备号
    if (!deviceInfo.deviceNo && !deviceInfo.oaid) {
      await getDeviceNo()
    }
    next()
  }
  next()
})
export default router
