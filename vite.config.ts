import { defineConfig, loadEnv } from 'vite'
import { chunkSplitPlugin } from 'vite-plugin-chunk-split'
import mkcert from 'vite-plugin-mkcert'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'
import { createHtmlPlugin } from 'vite-plugin-html'
import vue from '@vitejs/plugin-vue'
import styleImport from 'vite-plugin-style-import'
import * as path from 'path'
import legacy from '@vitejs/plugin-legacy'
import viteCompression from 'vite-plugin-compression'
import { visualizer } from 'rollup-plugin-visualizer'
import { viteVConsole } from 'vite-plugin-vconsole'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { svgBuilder } from './src/plugins/svgBuilder'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd())
  const isProd = mode === 'prod'
  return {
    plugins: [
      chunkSplitPlugin({
        customSplitting: {
          'vant-vendor': ['vant'],
          'components-util': [/src\/components/, /src\/utils/]
        }
      }),
      vue(),
      vueJsx({}),
      mkcert(),
      styleImport({
        // resolves: [VantResolve()]
        libs: [
          {
            libraryName: 'vant',
            // esModules: true,
            resolveStyle: name => `/node_modules/vant/es/${name}/style`
          }
        ]
      }),
      Components({
        dts: true,
        dirs: ['src/components'], // 按需加载的文件夹
        resolvers: [VantResolver()] // ElementPlus按需加载
      }),
      createHtmlPlugin({
        minify: true,
        /**
         * 如果你想将 `index.html`存放在指定文件夹，可以修改它，否则不需要配置
         * @default index.html
         */
        template: 'public/index.html',
        /**
         * 需要注入 index.html ejs 模版的数据
         */
        inject: {
          data: {
            mode,
            command
            // injectScript: command === 'build'
            //   ? '<script src="https://cdn.basestonedata.com/jlib/basere2.js"></script>'
            //   : ''
          }
        }
      }),
      legacy({
        // for ie11
        targets: ['ie >= 11', 'chrome >= 42'],
        additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
        polyfills: ['es.promise.finally', 'es/map', 'es/set'],
        modernPolyfills: ['es.promise.finally']
      }),
      viteCompression({
        verbose: true,
        disable: false,
        threshold: 10240,
        algorithm: 'gzip',
        ext: '.gz'
      }),
      visualizer(),
      viteVConsole({
        entry: path.resolve(__dirname, './src/main.ts').replace(/\\/g, '/'),
        localEnabled: !isProd,
        enabled: !isProd,
        config: {
          theme: 'light'
        }
      }),
      svgBuilder('./src/assets/svg/')
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@api': path.resolve(__dirname, './src/api'),
        '@assets': path.resolve(__dirname, './src/assets'),
        '@utils': path.resolve(__dirname, './src/utils')
      }
    },
    define: {
      'process.env': {}
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "./src/styles/mixin.scss";'
        }
      }
    },
    server: {
      // 开启https后dev环境会启用http2
      https: true,
      port: '3010',
      open: false,
      host: '0.0.0.0'
      // hmr: {
      //   host: 'localhost',
      //   protocol: 'ws',
      // },
    },
    base: command == 'serve' ? '/' : env.VITE_APP_WEBPACK_PATH,
    build: {
      target: 'es2015',
      // target: 'chrome58',
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: isProd,
          drop_debugger: isProd
        }
      },
      rollupOptions: {
        external: [] // https://rollupjs.org/guide/en/#big-list-of-options
      }
    }
  }
})
