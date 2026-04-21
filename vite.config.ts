import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // 加载对应环境的环境变量
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      port: 5173,
      // 开发环境代理配置
      proxy: {
        [env.VITE_API_URL]: {
          target: env.VITE_API_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(new RegExp(`^${env.VITE_API_URL}`), ''),
        },
      },
    },
    build: {
      // 生产环境配置
      outDir: mode === 'production' ? 'dist' : `dist-${mode}`,
      sourcemap: mode === 'development',
    },
  }
})
