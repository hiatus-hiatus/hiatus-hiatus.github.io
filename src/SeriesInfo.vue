<template>
  <div :class="{ loading: loading }">
    <div class="section">
      <div class="section-title main" @click="showArcs = !showArcs">
        {{ seriesInfo.name }} Hiatus Chart
      </div>
      <button class="fab" @click="showArcs = !showArcs" v-show="!loading">
        Arcs
      </button>
      <main-chart :issues-by-year="issuesByYear" :loading="loading" />
      <arcs-info :arcs="arcs" v-if="!loading" />
    </div>
    <article class="section" v-if="seriesInfo.showFaq && !loading">
      <div class="section-title">Frequently Asked Questions</div>
      <faq :items="seriesInfo.faq" :latest-release="latestRelease" />
    </article>
    <major-streaks
      :issues="issues"
      v-if="!loading"
      :threshold="seriesInfo.streaksThreshold"
    />
    <related-links />
    <trend-by-year :issues-by-year="issuesByYear" v-if="!loading" />
    <disqus />
    <attribution :series-info="seriesInfo" v-if="!loading" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, provide, ref } from "vue";
import Issue from "./components/IssueBlock.vue";
import ArcsInfo from "./ArcsInfo.vue";

import useLoadInfo from "./http/useLoadInfo";
import useLoadIssues from "./http/useLoadIssues";
import Attribution from "./components/Attributtion.vue";
import Faq from "./components/Faq.vue";
import MajorStreaks from "./components/MajorStreaks.vue";
import MainChart from "./components/MainChart.vue";
import TrendByYear from "./components/TrendByYear.vue";
import { useRoute } from "vue-router";
import RelatedLinks from "./components/RelatedLinks.vue";
import Disqus from "./plugins/disqus/Disqus.vue";

export default defineComponent({
  name: "SeriesInfo",
  components: {
    Disqus,
    RelatedLinks,
    TrendByYear,
    MainChart,
    MajorStreaks,
    Faq,
    Attribution,
    ArcsInfo,
    Issue,
  },

  setup() {
    const route = useRoute();

    const showArcs = ref(false);
    const { seriesInfo, loading: infoLoading } = useLoadInfo(route.meta.dir);
    const { issues, loading: issuesLoading } = useLoadIssues(route.meta.dir);

    const loading = computed(() => {
      return infoLoading.value || issuesLoading.value;
    });

    const latestRelease = computed(() => {
      return issues.value.find((issue) => issue.released);
    });

    provide(
      "arcs",
      computed(() => {
        return seriesInfo.value.arcs;
      })
    );
    provide("showArcs", showArcs);

    const legend = new Map<string, ArcInfo>(
      Object.entries({
        released: {
          key: "released",
          color: "released",
          name: "Appears in Jump",
        },
        hiatus: {
          key: "hiatus",
          color: "hiatus",
          name: "Hiatus",
        },
      })
    );

    const arcs = computed(() => {
      if (showArcs.value) {
        return seriesInfo.value.arcs;
      } else {
        return legend;
      }
    });

    return {
      seriesInfo,
      issues,
      arcs,
      showArcs,
      loading,
      latestRelease,
    };
  },

  computed: {
    issuesByYear(): Map<number, IssueInfo[]> {
      let group: Map<number, IssueInfo[]> = new Map();

      for (const issue of this.issues) {
        const issues = group.get(issue.year) || [];
        issues.push(issue);
        group.set(issue.year, issues);
      }

      for (const issues of group.values()) {
        issues.reverse();
      }

      return group;
    },
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>