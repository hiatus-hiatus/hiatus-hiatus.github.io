import { createApp } from "vue";
import App from "./App.vue";
import "./style.scss";
import router from "./router";

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

createApp(App).use(router).mount("#app");
