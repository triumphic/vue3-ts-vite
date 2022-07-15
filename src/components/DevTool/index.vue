<template>
  <div class="dev-tool">
    <div v-if="testToolShow" class="test-btn">
      <div @click="toolListShow = true">测试工具</div>
      <div class="close" @click="testToolShow = false">X</div>
    </div>
    <div v-if="toolListShow" class="tool-list">
      <div class="list-close" @click="toolListShow = false">X</div>
      <div class="item">
        <div class="label">链接</div>
        <div class="operation">
          <input v-model="linkValue" class="op-input" type="text" />
          <div class="operation-btn" @click="toLink(linkValue)">go</div>
        </div>
      </div>
      <div class="item">
        <div class="label">路由</div>
        <div class="operation">
          <input v-model="pathValue" class="op-input" type="text" />
          <div class="operation-btn" @click="toPath(pathValue)">go</div>
        </div>
      </div>
      <div class="btn-box">
        <div class="item" @click="reload">reload</div>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const router = useRouter()
    const state = reactive({
      testToolShow: true,
      toolListShow: false,
      linkValue: '',
      pathValue: ''
    })
    function toLink(val) {
      window.location.href = val
    }
    function toPath(val) {
      router.push({
        path: val
      })
    }
    function reload() {
      window.location.reload()
    }
    return {
      toLink,
      toPath,
      reload,
      ...toRefs(state)
    }
  }
})
</script>
<style lang="scss" scoped>
.dev-tool {
  position: fixed;
  z-index: 10000;

  .test-btn {
    position: fixed;
    bottom: 200px;
    width: 160px;
    height: 40px;
    padding-left: 20px;
    font-size: 12px;
    line-height: 40px;
    color: #fff;
    background-color: #07c160;
  }

  .close {
    position: absolute;
    top: 0;
    right: 0;
    width: 40px;
    height: 40px;
  }

  .tool-list {
    position: fixed;
    top: 400px;
    left: 50%;
    width: 700px;
    padding-right: 6px;
    background-color: rgb(163, 210, 241);
    border-top: 1px solid rgb(156, 156, 156);
    border-right: 1px solid rgb(156, 156, 156);
    border-left: 1px solid rgb(156, 156, 156);
    transform: translateX(-50%);

    .list-close {
      position: absolute;
      top: -40px;
      right: -40px;
      width: 40px;
      height: 40px;
    }

    .item {
      display: flex;
      width: 100%;
      height: 80px;
      line-height: 80px;
      color: rgb(53, 53, 53);
      border-bottom: 1px solid rgb(156, 156, 156);

      .label {
        width: 120px;
        text-align: center;
      }

      .operation {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;

        &-btn {
          width: 80px;
          height: 60px;
          line-height: 60px;
          text-align: center;
          background-color: #07c160;
        }

        .op-input {
          width: 500px;
          height: 60px;
        }
      }
    }

    .btn-box {
      padding: 10px;

      .item {
        width: fit-content;
        padding: 0 10px;
        background-color: #07c160;
      }
    }
  }
}
</style>
