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
      resolvers: [ElementPlusResolver({ importStyle: "sass" })],
    }),
    Components({
      resolvers: [
        ElementPlusResolver({
          importStyle: "sass",
        }),
      ],
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
                    @use "@/styles/element/index.scss" as *;
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
    target: ["chrome67"],
    cssTarget: ["chrome67"],
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      //抽离js
      output: {
        compact: true,
        manualChunks: (id) => {
          if (id.includes("node_modules")) {
            const module = id
              .toString()
              .split("node_modules/")[1]
              .split("/")[0]
              .toString();
            if (["lodash", "lodash-es"].includes(module)) return "lodash";
            if (["echarts"].includes(module)) return "echarts";
            if (["csv-parse"].includes(module)) return "csvparse";
            if (id.includes("element-plus")) return "elementplus";
            if (
              ["vue", "vue-router", "vuex", "@vue", "@vueuse"].includes(module)
            )
              return "vue";
            return "vendor";
          }
        },
      },
    },
  },
});
