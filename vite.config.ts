import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'
import svgr from 'vite-plugin-svgr'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
    plugins: [react(), svgr()],
    // 不要强行覆盖 process.env；用 import.meta.env 即可
    build: {
        outDir: 'extension',
        emptyOutDir: true,           // ✅ 清理旧产物，避免“旧代码假象”
        sourcemap: true,             // ✅ 调试友好
        minify: false,              // ✅ 调试友好
        target: 'chrome120',         // 可选：按你的 Chrome 版本设置
        lib: {
            entry: resolve(__dirname, 'src/index.tsx'),
            name: 'content',
            formats: ['iife'],         // 内容脚本用 IIFE 最稳
            fileName: () => 'thothContent.js', // ✅ 与 manifest 对齐的稳定文件名
        },
        rollupOptions: {
            // ✅ 不 external React，直接打包进内容脚本，省事且不受页面 CSP 影响
            // external: [],

            output: {
                // 如果你确保没有动态 import，可以不加；加上可避免意外分包
                inlineDynamicImports: true,  // ✅ 保证单文件输出
                // 如果未来 external react 才需要下面这个：
                // globals: { react: 'React', 'react-dom': 'ReactDOM' },
            },
        },
    },
})
