import VueGtag from "vue-gtag";
import { createApp } from "vue";
import router from "./router";
import App from "./App.vue";
import "./style.scss";
import Disqus from "./plugins/disqus";

import {
  BarController,
  BarElement,
  CategoryScale,
  Chart,
  Legend,
  LinearScale,
  Tooltip,
} from "chart.js";

Chart.register(
  BarElement,
  BarController,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip
);

createApp(App)
  .use(router)
  .use(Disqus, { shortName: import.meta.env.VITE_DISQUS_SHORT_NAME }, router)
  .use(
    VueGtag,
    {
      config: { id: import.meta.env.VITE_GANALYTICS_ID },
      bootstrap: !!import.meta.env.VITE_GANALYTICS_ID,
    },
    router
  )
  .mount("#app");
