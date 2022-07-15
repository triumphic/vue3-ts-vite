<template>
  <template v-if="appAgentBol() || devMode === 'mobile'">
    <div ref="titleBarRef" class="title-bar" :style="{ paddingTop: statusHeight + 'px', backgroundColor: bgColor }">
      <div class="title-bar__nav">
        <SvgIcon class="title-bar__nav-left" name="back-arrow" :color="titleColor" @click="beforeBack" />
        <div class="title-bar__nav-title" :style="{ color: titleColor }">
          {{ titleText }}
        </div>
        <div class="title-bar__nav-right">
          <slot name="right"></slot>
        </div>
      </div>
    </div>
    <div v-if="seat" class="title-bar-seat" :style="{ paddingTop: statusHeight + 'px' }"></div>
  </template>
  <WebTop v-else />
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, computed, onMounted, ref, nextTick } from 'vue'
import { getStatusBarHeight } from '../../utils/appbridge'
import { useRoute } from 'vue-router'
import { useUserStore } from '../../store/user'
import { useCommonStore } from '@/store/common'
import { appAgentBol } from '@/utils/context'
import { useGoBack } from '@/composables'
import SvgIcon from '@/components/SvgIcon/index.vue'
import WebTop from '@/components/WebTop/index.vue'

export default defineComponent({
  name: 'TitleBar',
  components: {
    WebTop,
    SvgIcon
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    bgColor: {
      type: String,
      default: '#fff'
    },
    titleColor: {
      type: String,
      default: '#333'
    },
    seat: {
      type: Boolean,
      default: true
    },
    beforeBack: {
      type: Function,
      default: () => {}
    }
  },
  setup(props, { attrs, emit }) {
    let state = reactive({
      statusHeight: 20
    })
    const route = useRoute()
    const titleText = computed(() => props.title || route.meta.title)

    const { setStateHeight, stateHeight } = useUserStore()
    const { setTitleBarHeight, devMode } = useCommonStore()

    setHeight()
    function beforeBack() {
      if (props.beforeBack) {
        props.beforeBack(goBack)
      } else {
        goBack()
      }
    }
    function goBack() {
      useGoBack()
    }
    const titleBarRef = ref(null)
    async function setHeight() {
      try {
        if (stateHeight !== 0) {
          state.statusHeight = stateHeight
        } else if (appAgentBol()) {
          state.statusHeight = await getTitleHeight()
          setStateHeight(state.statusHeight)
        }
      } catch (err) {
        console.log(err)
      } finally {
        nextTick(() => {
          if (titleBarRef.value) {
            let titleHeight = titleBarRef.value.clientHeight
            setTitleBarHeight(titleHeight)
          }
        })
      }
    }
    function getTitleHeight() {
      return new Promise<number>((resolve, reject) => {
        getStatusBarHeight({}, (res: string) => {
          const data = JSON.parse(res)
          let statusHeight = data.body.height
          console.log('状态栏高度', statusHeight, '像素比', window.devicePixelRatio)
          resolve(statusHeight / window.devicePixelRatio)
        })
      })
    }
    return {
      ...toRefs(state),
      beforeBack,
      titleText,
      appAgentBol,
      titleBarRef,
      devMode
    }
  }
})
</script>
<style lang="scss" scoped>
.title-bar-seat {
  width: 100%;
  height: 88px;
  box-sizing: content-box;
}

.title-bar {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2000;
  width: 100%;
  box-sizing: content-box;

  &__nav {
    position: relative;
    height: 88px;

    &-left {
      position: absolute;
      top: 50%;
      left: 24px;
      font-size: 44px;
      transform: translateY(-50%);
    }

    &-right {
      position: absolute;
      top: 50%;
      right: 32px;
      transform: translateY(-50%);
    }

    &-title {
      position: absolute;
      top: 50%;
      left: 50%;
      font-family: PingFangSC-Medium, 'PingFang SC';
      font-size: 36px;
      font-weight: 500;
      line-height: 56px;
      color: #333;
      transform: translate(-50%, -50%);
    }
  }
}
</style>
