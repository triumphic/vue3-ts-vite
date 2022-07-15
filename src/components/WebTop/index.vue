<template>
  <div class="webtop" :class="getStateClass">
    <div class="left">
      <img src="https://oss-prod.hobby666.com/user/default_logo.png" alt="" />
    </div>
    <div class="middle">
      <div class="top">Hobby</div>
      <div class="bottom">潮流派对共创社区</div>
    </div>
    <div class="right" @click="data.bottonFunc">{{ data.bottonText }}</div>
  </div>
  <div class="webtop-seat"></div>
</template>
<script>
import { toApp } from '@/utils/openinstall'
import { defineComponent, ref, computed } from 'vue'

export default defineComponent({
  name: 'WebTop',
  setup() {
    const data = ref({
      stateStyle: 1,
      bottonText: '下载APP',
      bottonFunc: toApp
    })

    const getStateClass = computed(() => (data.value.stateStyle === 2 ? 'styleBlack' : ''))

    return {
      getStateClass,
      data,
      toApp
    }
  }
})
</script>

<style lang="scss" scoped>
.webtop-seat {
  width: 100%;
  height: 98px;
}

.webtop {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  display: flex;
  width: 100%;
  height: 98px;
  padding: 8px 24px;
  background-color: #fff;

  .left {
    width: 80px;
    height: 80px;
    margin-right: 20px;
    overflow: hidden;
    border-radius: 16px;
  }

  .middle {
    flex: 1;
    text-align: left;

    .top {
      font-family: PingFang-SC-Bold, PingFang-SC;
      font-size: 28px;
      font-weight: bold;
      line-height: 40px;
      color: #333;
    }

    .bottom {
      font-family: PingFangSC-Regular, 'PingFang SC';
      font-size: 20px;
      font-weight: 400;
      line-height: 28px;
      color: #333;
    }
  }

  .right {
    position: relative;
    top: 12px;
    width: 134px;
    height: 56px;
    font-family: PingFangSC-Regular, 'PingFang SC';
    font-size: 24px;
    font-weight: 400;
    line-height: 56px;
    color: #fff;
    text-align: center;
    background: #16d2d7;
    border-radius: 8px;
  }

  &.styleBlack {
    background: #151515;

    .top {
      color: #16d2d7;
    }

    .bottom {
      color: #fff;
    }

    .right {
      width: auto;
      height: 63px;
      padding: 0 25px;
      font-family: PingFangSC-Medium, 'PingFang SC';
      font-weight: 500;
      line-height: 63px;
      color: #fff;
      text-align: center;
      background: #16d2d7;
      border-radius: 32px;
    }
  }
}
</style>
