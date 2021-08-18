<template>
  <div class="section">
    <div class="section-title">
      HUNTER×HUNTER Hiatus Chart
    </div>
    <yearly-issues :issues-by-year="issuesByYear"/>
    <arcs-info :arcs="seriesInfo.arcs"/>

  </div>
</template>

<script lang="ts">
import {computed, defineComponent, onMounted, ref} from 'vue'
import HelloWorld from './components/HelloWorld.vue'
import Issue from "./components/IssueBlock.vue";
import YearlyIssues from "./components/YearlyIssues.vue";
import ArcsInfo from "./ArcsInfo.vue";

import useLoadInfo from './http/useLoadInfo'
import useLoadIssues from './http/useLoadIssues'

export default defineComponent({
  name: 'App',
  components: {
    ArcsInfo,
    YearlyIssues,
    Issue,
    HelloWorld
  },

  setup() {
    const {seriesInfo, loading: infoLoading} = useLoadInfo();
    const {issues, loading: issuesLoading} = useLoadIssues();

    const loading = computed(() => {
      return infoLoading.value || issuesLoading.value;
    })

    return {
      seriesInfo, issues, loading
    }

  },


  computed: {
    issuesByYear(): Map<number, IssueInfo[]> {
      let group: Map<number, IssueInfo[]> = new Map();

      for (const issue of this.issues) {
        const issues = group.get(issue.year) || [];
        issues.push(issue)
        group.set(issue.year, issues)
      }

      return group;
    }
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>