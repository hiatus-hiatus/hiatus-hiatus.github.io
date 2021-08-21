import { Plugin, reactive } from "vue";
import { App } from "@vue/runtime-core";
import load from "./load";
import { Router } from "vue-router";

type DisqusOptions = {
  shortName: string;
  router: Router;
  enabled: boolean;
};

const plugin: Plugin = {
  install(app: App, config: DisqusOptions, router): any {
    const getUrl = () => {
      const host = window.location.host;
      const protocol = window.location.protocol;
      return `${protocol}//${host}${router.currentRoute.value.fullPath}`;
    };

    const reset = () => {
      if (window.DISQUS) {
        window.DISQUS.reset({
          reload: true,
          config: function () {
            this.page.url = getUrl();
          },
        });
      }
    };
    const disqus = reactive({
      ready: false,
      reset,
    });

    app.provide("$disqus", disqus);

    if (config.shortName) {
      load(config.shortName).then(() => {
        disqus.ready = true;
      });
    } else {
      console.warn("Missing disqus shortname");
    }
  },
};

export default plugin;
