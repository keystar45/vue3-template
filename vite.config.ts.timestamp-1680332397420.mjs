// vite.config.ts
import vue from "file:///D:/product-market/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import path from "path";
import AutoImport from "file:///D:/product-market/node_modules/unplugin-auto-import/dist/vite.js";
import { ElementPlusResolver } from "file:///D:/product-market/node_modules/unplugin-vue-components/dist/resolvers.mjs";
import Components from "file:///D:/product-market/node_modules/unplugin-vue-components/dist/vite.mjs";
import { defineConfig } from "file:///D:/product-market/node_modules/vite/dist/node/index.js";
var vite_config_default = defineConfig({
  plugins: [
    AutoImport({
      resolvers: [ElementPlusResolver({ importStyle: "sass" })]
    }),
    Components({
      resolvers: [
        ElementPlusResolver({
          importStyle: "sass"
        })
      ]
    }),
    vue()
  ],
  resolve: {
    alias: {
      "@": path.resolve("./src")
    }
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
                    `
      }
    }
  },
  server: {
    host: "0.0.0.0",
    port: 8e3,
    open: true,
    fs: {
      strict: false,
      allow: []
    }
  },
  build: {
    target: ["chrome67"],
    cssTarget: ["chrome67"],
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        compact: true,
        manualChunks: (id) => {
          if (id.includes("node_modules")) {
            const module = id.toString().split("node_modules/")[1].split("/")[0].toString();
            if (["lodash", "lodash-es"].includes(module))
              return "lodash";
            if (["echarts"].includes(module))
              return "echarts";
            if (["csv-parse"].includes(module))
              return "csvparse";
            if (id.includes("element-plus"))
              return "elementplus";
            if (["vue", "vue-router", "vuex", "@vue", "@vueuse"].includes(module))
              return "vue";
            return "vendor";
          }
        }
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxwcm9kdWN0LW1hcmtldFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxccHJvZHVjdC1tYXJrZXRcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L3Byb2R1Y3QtbWFya2V0L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHZ1ZSBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tdnVlXCI7XG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xuaW1wb3J0IEF1dG9JbXBvcnQgZnJvbSBcInVucGx1Z2luLWF1dG8taW1wb3J0L3ZpdGVcIjtcbmltcG9ydCB7IEVsZW1lbnRQbHVzUmVzb2x2ZXIgfSBmcm9tIFwidW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvcmVzb2x2ZXJzXCI7XG5pbXBvcnQgQ29tcG9uZW50cyBmcm9tIFwidW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvdml0ZVwiO1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgLy8gLi4uXG4gIHBsdWdpbnM6IFtcbiAgICAvLyAuLi5cbiAgICBBdXRvSW1wb3J0KHtcbiAgICAgIHJlc29sdmVyczogW0VsZW1lbnRQbHVzUmVzb2x2ZXIoeyBpbXBvcnRTdHlsZTogXCJzYXNzXCIgfSldLFxuICAgIH0pLFxuICAgIENvbXBvbmVudHMoe1xuICAgICAgcmVzb2x2ZXJzOiBbXG4gICAgICAgIEVsZW1lbnRQbHVzUmVzb2x2ZXIoe1xuICAgICAgICAgIGltcG9ydFN0eWxlOiBcInNhc3NcIixcbiAgICAgICAgfSksXG4gICAgICBdLFxuICAgIH0pLFxuICAgIHZ1ZSgpLFxuICBdLFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgIFwiQFwiOiBwYXRoLnJlc29sdmUoXCIuL3NyY1wiKSwgLy8gQFx1NEVFM1x1NjZGRnNyY1xuICAgIH0sXG4gIH0sXG4gIGNzczoge1xuICAgIHByZXByb2Nlc3Nvck9wdGlvbnM6IHtcbiAgICAgIHNjc3M6IHtcbiAgICAgICAgY2hhcnNldDogZmFsc2UsXG4gICAgICAgIGFkZGl0aW9uYWxEYXRhOiBgXG4gICAgICAgICAgICAgICAgICAgIEB1c2UgXCJAL3N0eWxlcy92YXJpYWJsZXMvbGlnaHQuc2Nzc1wiIGFzICo7XG4gICAgICAgICAgICAgICAgICAgIEB1c2UgXCJAL3N0eWxlcy92YXJpYWJsZXMvZGFyay5zY3NzXCIgYXMgKjtcbiAgICAgICAgICAgICAgICAgICAgQHVzZSBcIkAvc3R5bGVzL3ZhcmlhYmxlcy9jb21tb24uc2Nzc1wiIGFzICo7XG4gICAgICAgICAgICAgICAgICAgIEB1c2UgXCJAL3N0eWxlcy9taXhpbi5zY3NzXCIgYXMgKjtcbiAgICAgICAgICAgICAgICAgICAgQHVzZSBcIkAvc3R5bGVzL2VsZW1lbnQvaW5kZXguc2Nzc1wiIGFzICo7XG4gICAgICAgICAgICAgICAgICAgIGAsXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG4gIHNlcnZlcjoge1xuICAgIGhvc3Q6IFwiMC4wLjAuMFwiLFxuICAgIHBvcnQ6IDgwMDAsXG4gICAgb3BlbjogdHJ1ZSxcbiAgICBmczoge1xuICAgICAgc3RyaWN0OiBmYWxzZSxcbiAgICAgIGFsbG93OiBbXSxcbiAgICB9LFxuICB9LFxuICBidWlsZDoge1xuICAgIHRhcmdldDogW1wiY2hyb21lNjdcIl0sXG4gICAgY3NzVGFyZ2V0OiBbXCJjaHJvbWU2N1wiXSxcbiAgICBjaHVua1NpemVXYXJuaW5nTGltaXQ6IDE1MDAsXG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgLy9cdTYyQkRcdTc5QkJqc1xuICAgICAgb3V0cHV0OiB7XG4gICAgICAgIGNvbXBhY3Q6IHRydWUsXG4gICAgICAgIG1hbnVhbENodW5rczogKGlkKSA9PiB7XG4gICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKFwibm9kZV9tb2R1bGVzXCIpKSB7XG4gICAgICAgICAgICBjb25zdCBtb2R1bGUgPSBpZFxuICAgICAgICAgICAgICAudG9TdHJpbmcoKVxuICAgICAgICAgICAgICAuc3BsaXQoXCJub2RlX21vZHVsZXMvXCIpWzFdXG4gICAgICAgICAgICAgIC5zcGxpdChcIi9cIilbMF1cbiAgICAgICAgICAgICAgLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICBpZiAoW1wibG9kYXNoXCIsIFwibG9kYXNoLWVzXCJdLmluY2x1ZGVzKG1vZHVsZSkpIHJldHVybiBcImxvZGFzaFwiO1xuICAgICAgICAgICAgaWYgKFtcImVjaGFydHNcIl0uaW5jbHVkZXMobW9kdWxlKSkgcmV0dXJuIFwiZWNoYXJ0c1wiO1xuICAgICAgICAgICAgaWYgKFtcImNzdi1wYXJzZVwiXS5pbmNsdWRlcyhtb2R1bGUpKSByZXR1cm4gXCJjc3ZwYXJzZVwiO1xuICAgICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKFwiZWxlbWVudC1wbHVzXCIpKSByZXR1cm4gXCJlbGVtZW50cGx1c1wiO1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICBbXCJ2dWVcIiwgXCJ2dWUtcm91dGVyXCIsIFwidnVleFwiLCBcIkB2dWVcIiwgXCJAdnVldXNlXCJdLmluY2x1ZGVzKG1vZHVsZSlcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgcmV0dXJuIFwidnVlXCI7XG4gICAgICAgICAgICByZXR1cm4gXCJ2ZW5kb3JcIjtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBeU8sT0FBTyxTQUFTO0FBQ3pQLE9BQU8sVUFBVTtBQUNqQixPQUFPLGdCQUFnQjtBQUN2QixTQUFTLDJCQUEyQjtBQUNwQyxPQUFPLGdCQUFnQjtBQUN2QixTQUFTLG9CQUFvQjtBQUU3QixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUUxQixTQUFTO0FBQUEsSUFFUCxXQUFXO0FBQUEsTUFDVCxXQUFXLENBQUMsb0JBQW9CLEVBQUUsYUFBYSxPQUFPLENBQUMsQ0FBQztBQUFBLElBQzFELENBQUM7QUFBQSxJQUNELFdBQVc7QUFBQSxNQUNULFdBQVc7QUFBQSxRQUNULG9CQUFvQjtBQUFBLFVBQ2xCLGFBQWE7QUFBQSxRQUNmLENBQUM7QUFBQSxNQUNIO0FBQUEsSUFDRixDQUFDO0FBQUEsSUFDRCxJQUFJO0FBQUEsRUFDTjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSyxLQUFLLFFBQVEsT0FBTztBQUFBLElBQzNCO0FBQUEsRUFDRjtBQUFBLEVBQ0EsS0FBSztBQUFBLElBQ0gscUJBQXFCO0FBQUEsTUFDbkIsTUFBTTtBQUFBLFFBQ0osU0FBUztBQUFBLFFBQ1QsZ0JBQWdCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsTUFPbEI7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sSUFBSTtBQUFBLE1BQ0YsUUFBUTtBQUFBLE1BQ1IsT0FBTyxDQUFDO0FBQUEsSUFDVjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLFFBQVEsQ0FBQyxVQUFVO0FBQUEsSUFDbkIsV0FBVyxDQUFDLFVBQVU7QUFBQSxJQUN0Qix1QkFBdUI7QUFBQSxJQUN2QixlQUFlO0FBQUEsTUFFYixRQUFRO0FBQUEsUUFDTixTQUFTO0FBQUEsUUFDVCxjQUFjLENBQUMsT0FBTztBQUNwQixjQUFJLEdBQUcsU0FBUyxjQUFjLEdBQUc7QUFDL0Isa0JBQU0sU0FBUyxHQUNaLFNBQVMsRUFDVCxNQUFNLGVBQWUsRUFBRSxHQUN2QixNQUFNLEdBQUcsRUFBRSxHQUNYLFNBQVM7QUFDWixnQkFBSSxDQUFDLFVBQVUsV0FBVyxFQUFFLFNBQVMsTUFBTTtBQUFHLHFCQUFPO0FBQ3JELGdCQUFJLENBQUMsU0FBUyxFQUFFLFNBQVMsTUFBTTtBQUFHLHFCQUFPO0FBQ3pDLGdCQUFJLENBQUMsV0FBVyxFQUFFLFNBQVMsTUFBTTtBQUFHLHFCQUFPO0FBQzNDLGdCQUFJLEdBQUcsU0FBUyxjQUFjO0FBQUcscUJBQU87QUFDeEMsZ0JBQ0UsQ0FBQyxPQUFPLGNBQWMsUUFBUSxRQUFRLFNBQVMsRUFBRSxTQUFTLE1BQU07QUFFaEUscUJBQU87QUFDVCxtQkFBTztBQUFBLFVBQ1Q7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
