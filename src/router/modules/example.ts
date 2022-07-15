import { RouteRecordRaw } from 'vue-router'

export const my: RouteRecordRaw[] = [
  {
    path: '/my/activity',
    name: 'MyActivity',
    component: () => import('@/views/my/activity.vue'),
    meta: { title: '我的派对' }
  }
]
