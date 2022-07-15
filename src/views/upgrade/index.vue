<template>
  <div class="page-view">
    <TitleBar title="" title-color="#fff" bg-color="#161617" :beforeBack="beforeBack"> </TitleBar>
    <div class="update-view">
      <div class="app-container">
        <div class="app-footer-bg flex-column flex-h-center flex-v-center">
          <i class="app-des"></i>
          <i class="app-button" @click="updateApp"></i>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript" setup>
import { apopenWithBrowser } from '@/utils/appbridge'
import { isArd } from '@/utils/context'
import TitleBar from '@/components/TitleBar/index.vue'

function beforeBack(back) {
  back()
}
function updateApp() {
  const link = isArd()
    ? 'https://oss-prod.hobby666.com/release-android/hobby_release_gw.apk'
    : 'https://apps.apple.com/cn/app/hobby-%E6%BD%AE%E6%B5%81%E6%8E%A2%E5%BA%97%E5%85%B1%E5%88%9B%E7%A4%BE%E5%8C%BA/id1596735106'
  apopenWithBrowser({ openUrl: link })
}
</script>

<style lang="scss">
.update-view {
  background: #000;
}

.app-container {
  position: relative;
  height: 1470px;
  background: url('@/assets/img/upgrade/app_bg.png') no-repeat;
  background-size: cover;
}

.app-footer-bg {
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  height: 418px;
  background: url('@/assets/img/upgrade/app-footer-bg.png') no-repeat;
  background-size: cover;

  .app-des {
    width: 480px;
    height: 52px;
    background: url('@/assets/img/upgrade/app-footer-des.png') no-repeat;
    background-size: 100% auto;
  }

  .app-button {
    width: 400px;
    height: 96px;
    margin-top: 20px;
    background: url('@/assets/img/upgrade/app-button.png') no-repeat;
    background-size: 100% auto;
  }
}
</style>
