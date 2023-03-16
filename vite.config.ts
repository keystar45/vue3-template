import vue from "@vitejs/plugin-vue";
import path from "path";
import AutoImport from "unplugin-auto-import/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import Components from "unplugin-vue-components/vite";
import { defineConfig } from "vite";

export default defineConfig({
  // ...
  plugins: [
    // ...
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    vue(),
  ],
  resolve: {
    alias: {
      "@": path.resolve("./src"), // @代替src
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        charset: false,
        additionalData: `
                    @use "@/styles/variables/light.scss" as *;
                    @use "@/styles/variables/dark.scss" as *;
                    @use "@/styles/variables/common.scss" as *;
                    @use "@/styles/mixin.scss" as *;
                    @use "@/styles/element/index.scss";
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
});
