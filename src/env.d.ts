/* eslint-disable @typescript-eslint/no-explicit-any */
/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}
declare interface Window {
  xxH5: any
  WebViewJavascriptBridge: any
  WVJBCallbacks: any
  $tj: any
  OpenInstall: any
  openInstallIns: any
  __wxsdk_isRegisterOk: boolean
}
interface ImportMeta {
  readonly env: ImportMetaEnv
}
