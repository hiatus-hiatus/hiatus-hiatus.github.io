import { createRouter, createWebHashHistory } from "vue-router";
import SeriesInfo from "./SeriesInfo.vue";

const routes = [
  {
    path: "/",
    name: "hxh",
    component: SeriesInfo,
  },
  {
    path: "/YuYuHakusho",
    name: "yuyu",
    meta: {
      dir: "YuYuHakusho",
    },
    component: SeriesInfo,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
