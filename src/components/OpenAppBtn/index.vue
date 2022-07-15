<template>
  <div v-if="!isApp()" class="open-app-btn" @click="toApp">打开APP，发现更多精彩</div>
</template>
<script setup>
import { toApp } from '@/utils/openinstall'
import { appAgentBol as isApp } from '@/utils/context'
</script>
<style lang="scss" scoped>
.open-app-btn {
  position: fixed;
  bottom: calc(env(safe-area-inset-bottom) + 30px);
  left: 50%;
  z-index: 99;
  width: 520px;
  height: 80px;
  font-size: 28px;
  font-weight: 400;
  line-height: 80px;
  color: #fff;
  text-align: center;
  background: #16d2d7;
  border-radius: 48px;
  transform: translateX(-50%);
}
</style>
