import vue from "@vitejs/plugin-vue";
import path from "path";
import { defineConfig } from "vite";
import { visualizer } from "rollup-plugin-visualizer";
import viteCompression from "vite-plugin-compression";
import imagemin from "unplugin-imagemin/vite";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";

export default defineConfig({
  plugins: [vue(), imagemin(), visualizer({ open: true })],
  resolve: {
    alias: {
      "@": path.resolve("./src"), // @代替src
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "@/styles/index.scss";
        `,
      },
    },
  },
  server: {
    host: "0.0.0.0",
    port: 8000,
    open: true,
    fs: {
      strict: false,
      allow: [],
    },
  },
  build: {
    assetsDir: "assets",
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "CyberLogin",
      fileName: (format) => `cyber-login.${format}.js`,
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ["vue"],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: "Vue",
        },
        // chunkFileNames: '/assets/js/[name]-[hash].js',
        // entryFileNames: '/assets/js/[name]-[hash].js',
        // assetFileNames: '/assets/[ext]/[name]-[hash].[ext]',
      },
    },
  },
});
