### Loading组件使用
import { Loading } from './components/Loading'

打开方法：

    Loading.open({ color: 'red', duration: 2000 })

可传入的参数有：
    loadingText: 加载文案

    duration: loading持续时间,默认为0，一直展示

    color: 颜色，默认#c9c9c9

    size: 加载图标大小，默认单位px, 默认30px

    textSize: 文字大小，默认单位px, 默认14px

    textColor: 文字颜色，默认#c9c9c9

    vertical: 是否垂直排列图标和文字内容，默认false


关闭方法：
    Loading.clear()