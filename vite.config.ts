import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  let aliases = {};
  if (mode == "production") {
    aliases = {
      vue: "https://cdn.jsdelivr.net/npm/vue@3.2.4/dist/vue.runtime.esm-browser.prod.js",
      luxon: "https://cdn.jsdelivr.net/npm/luxon@2.0.2/build/es6/luxon.js",
      "chart.js":
        "https://cdn.jsdelivr.net/npm/chart.js@3.5.1/dist/chart.esm.js",
    };
  }
  return {
    plugins: [vue()],
    base: "/chart-tests",
    build: {
      rollupOptions: {},
    },
    resolve: {
      alias: {
        ...aliases,
      },
    },
  };
});
