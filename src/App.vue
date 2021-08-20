<template>
  <div class="section">
    <div class="section-title main" @click="showArcs = !showArcs">
      HUNTER×HUNTER Hiatus Chart
      <button class="fab">Arcs</button>
    </div>
    <main-chart :issues-by-year="issuesByYear" />
    <arcs-info :arcs="arcs" />
  </div>
  <article class="section" v-if="seriesInfo.faq">
    <div class="section-title">Frequently Asked Questions</div>
    <faq :items="seriesInfo.faq" />
  </article>
  <major-streaks :issues="issues" v-if="issues.length > 0" />
  <trend-by-year :issues-by-year="issuesByYear" v-if="!loading" />
  <attribution />
</template>

<script lang="ts">
import { computed, defineComponent, provide, ref } from "vue";
import HelloWorld from "./components/HelloWorld.vue";
import Issue from "./components/IssueBlock.vue";
import ArcsInfo from "./ArcsInfo.vue";

import useLoadInfo from "./http/useLoadInfo";
import useLoadIssues from "./http/useLoadIssues";
import Attribution from "./components/Attributtion.vue";
import Faq from "./components/Faq.vue";
import MajorStreaks from "./components/MajorStreaks.vue";
import MainChart from "./components/MainChart.vue";
import TrendByYear from "./components/TrendByYear.vue";

export default defineComponent({
  name: "App",
  components: {
    TrendByYear,
    MainChart,
    MajorStreaks,
    Faq,
    Attribution,
    ArcsInfo,
    Issue,
    HelloWorld,
  },

  setup() {
    const showArcs = ref(false);
    const { seriesInfo, loading: infoLoading } = useLoadInfo();
    const { issues, loading: issuesLoading } = useLoadIssues();

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
  margin-top: 30px;
}
</style>
