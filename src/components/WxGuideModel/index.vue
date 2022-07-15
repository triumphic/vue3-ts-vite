<template>
  <div v-if="show" class="shareGuideMask" @click.self="visibleChange(false)">
    <div>
      <img class="share-img" src="../../assets/img/share-giude.png" alt="" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { WxGuide } from './index'

let show = ref(true)
function visibleChange(val) {
  show.value = val
  WxGuide.close()
}
</script>

<style scoped lang="scss">
.shareGuideMask {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);

  &__img {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1000;
    width: 328px;
    height: 180px;
  }

  .share-img {
    position: fixed;
    top: 0;
    right: 40px;
    width: 500px;
    height: auto;
  }
}
</style>
