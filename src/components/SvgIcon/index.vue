<template>
  <svg :class="svgClass" aria-hidden="true" :style="{ color: props.color }" v-on="$attrs">
    <use :xlink:href="iconName" />
  </svg>
</template>
<script lang="ts">
export default {
  name: 'SvgIcon'
}
</script>
<script setup lang="ts">
/**
 * 名称：SvgIcon
 * @param name String required
 * @param color String
 * 依赖：src/plugins/svgBuilder.js 需要在 vite中配置
 * 使用方式：
 * 在 template 中使用 <svg-icon name="bug"/>
 */
import { computed, defineProps } from 'vue'

interface Props {
  name?: string
  color?: string
}

/* data */
const props = withDefaults(defineProps<Props>(), {
  name: '',
  color: ''
}) // 获取props defineProps<{ msg: string }>()
const iconName = computed((): string => `#icon-${props.name}`)
const svgClass = computed((): string => {
  if (props.name) {
    return `svg-icon icon-${props.name}`
  } else {
    return 'svg-icon'
  }
})
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  overflow: hidden;
  vertical-align: -0.15em;
  fill: currentcolor;
}
</style>
