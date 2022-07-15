<template>
  <!-- 调试工具 -->
  <DevTool v-if="!isProd && OPEN_DEV_TOOL" />
  <router-view></router-view>
</template>
<script>
import { defineComponent, computed, defineAsyncComponent, watch } from 'vue'
import { useRoute } from 'vue-router'
import { getQueryString } from '@/utils/query'
import { appAgentBol } from '@/utils/context'
import { registerOpenInstall } from '@/utils/openinstall'
import { env } from './config/env'
import { OPEN_DEV_TOOL } from './config/index'
import { useUserStore } from '@/store/user'
import { useCommonStore } from '@/store/common'

// import { Loading } from './components/Loading'
// import { WxGuide } from './components/WxGuideModel'
// import { WeiboGuide } from './components/WeiboGuideModel'

export default defineComponent({
  components: {
    DevTool: defineAsyncComponent(() => import('@/components/DevTool/index.vue'))
  },
  setup() {
    const isProd = env === 'prod'
    const { muUserMetaInfo } = useUserStore()
    const isApp = computed(() => appAgentBol())
    const route = useRoute()
    const titleName = computed(() => route.meta.title)
    if (!appAgentBol()) {
      registerOpenInstall()
    }
    // Loading.open({ color: 'red', duration: 2000 })
    // WeiboGuide.open()
    // setTimeout(() => {
    //   Loading.clear()
    // }, 1000)
    setUserInfo()
    function setUserInfo() {
      const token = getQueryString('token') || null
      const userId = getQueryString('userId') || null
      if (!appAgentBol()) {
        if (token && token !== 'null') {
          muUserMetaInfo({
            token, // 安卓这里是tokenID
            userId
          })
        }
      }
    }

    watch(route, () => {
      const { setDevMode, devMode } = useCommonStore()
      if (!devMode) {
        const devMode = route.query.dev_mode
        devMode && setDevMode(devMode)
      }
    })

    return {
      appAgentBol,
      isApp,
      isProd,
      OPEN_DEV_TOOL,
      titleName
    }
  }
})
</script>

<style lang="scss">
@import './styles/mixin.scss';
@import './styles/base.scss';
@import './styles/index.scss';
</style>
