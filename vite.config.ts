import vue from "@vitejs/plugin-vue";
import path from "path";
import { defineConfig } from "vite";
import { visualizer } from "rollup-plugin-visualizer";
import UnpluginElementPlus from "unplugin-element-plus/vite";
import viteCompression from "vite-plugin-compression";
import imagemin from "unplugin-imagemin/vite";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";

export default defineConfig({
  plugins: [
    vue(),
    visualizer({ open: true }),
    // UnpluginElementPlus({
    //   ignoreComponents: ["AutoResizer"],
    // }),
  ],
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
      external: ["vue", "element-plus", "@element-plus/icons-vue"],
      output: {
        globals: {
          vue: "Vue",
          "@element-plus/icons-vue": "IconsVue",
          "element-plus": "ElementPlus",
        },
      },
    },
  },
});
