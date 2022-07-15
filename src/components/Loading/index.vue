<template>
  <div class="loading" teleport="body">
    <div class="loading__container" ref="containerDom">
      <van-loading
        type="spinner"
        :color="props.color"
        :size="props.size"
        :text-size="props.textSize"
        :text-color="props.textColor"
        :vertical="props.vertical"
        >{{ loadingText }}</van-loading
      >
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  loadingText: {
    type: String,
    default: ''
  },
  duration: {
    type: Number,
    default: 0
  },
  color: {
    type: String,
    default: '#c9c9c9'
  },
  size: {
    type: Number || String,
    default: '30px'
  },
  textSize: {
    type: Number || String,
    default: '14px'
  },
  textColor: {
    type: String,
    default: '#c9c9c9'
  },
  vertical: Boolean
})

console.log('props:', props)
</script>

<style scoped lang="scss">
.loading {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10000;
  width: 100%;
  height: 100%;
}

.loading__container {
  position: absolute;
  top: 600px;
  right: 0;
  left: 0;
  display: flex;
  width: fit-content;
  height: 120px;
  padding: 30px;
  margin: 0 auto;
  color: white;
  text-align: center;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 12px;
  align-items: center;
  justify-content: center;
}
</style>
