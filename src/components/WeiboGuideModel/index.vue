<!-- 微博下载引导 -->
<template>
  <div v-if="show" class="weiboGuide" @click.self="visibleChange(false)">
    <div class="imgBox">
      <img src="../../assets/img/tishiwenzi@2x.png" alt="箭头" />
      <span class="desc">点击右上角，选择浏览器打开</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { WeiboGuide } from './index'

let show = ref(true)
function visibleChange(val) {
  show.value = val
  WeiboGuide.close()
}
</script>

<style scoped lang="scss">
.weiboGuide {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.5);

  .imgBox {
    position: relative;
    top: 32px;
    height: 124px;

    img {
      position: absolute;
      right: 30px;
      width: 465px;
      height: 124px;
    }

    .desc {
      position: absolute;
      right: 130px;
      bottom: 5px;
      font-family: PingFangSC-Regular, 'PingFang SC';
      font-size: 28px;
      font-weight: 400;
      line-height: 40px;
      color: #fff;
    }
  }
}
</style>
