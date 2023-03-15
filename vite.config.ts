import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { join, resolve } from 'path';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

export default ({ mode }) => {
  process.env = {...process.env, ...loadEnv(mode, process.cwd())};

  return defineConfig({
    plugins: [

      vue(),
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [resolve(process.cwd(), 'src/assets/images/svg')],
        // 指定symbolId格式
        symbolId: 'icon-[dir]-[name]',
      })
    ],
    resolve: {
      alias: {
        '@': join(__dirname, 'src') // setting alias
      }
    },
    base: './', // 设置打包路径
    server: {
      port: 4000, // port
      cors:true,
      // proxy
      proxy: {
        '/api': {
          target: process.env.VITE_CONFIG_URL,
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace('/api/', '/')
        }
      }
    }
  });
}


