import { createRouter, createWebHistory } from "vue-router";
import SeriesInfo from "./SeriesInfo.vue";
import { nextTick } from "vue";

const routes = [
  {
    path: "/",
    name: "hxh",
    component: SeriesInfo,
    meta: {
      dir: "HunterXHunter",
      title: "HUNTER×HUNTER",
    },
  },
  {
    path: "/YuYuHakusho/",
    name: "yuyu",
    meta: {
      dir: "YuYuHakusho",
      title: "Yu Yu Hakusho",
    },
    component: SeriesInfo,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "404",
    redirect: { name: "hxh" },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to) => {
  await nextTick(() => {
    const suffix = import.meta.env.VITE_TITLE_SUFFIX;
    document.title = `${to.meta.title} ${suffix}`;
  });
});

export default router;
