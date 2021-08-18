<template>
  <div class="section">
    <div class="section-title" @click="showArcs=!showArcs">
      HUNTER×HUNTER Hiatus Chart
    <button class="fab">Arcs</button>
    </div>
    <yearly-issues :issues-by-year="issuesByYear"/>
    <arcs-info :arcs="arcs"/>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, onMounted, provide, ref} from 'vue'
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
    const showArcs = ref(false);
    const {seriesInfo, loading: infoLoading} = useLoadInfo();
    const {issues, loading: issuesLoading} = useLoadIssues();


    const loading = computed(() => {
      return infoLoading.value || issuesLoading.value;
    })


    provide('arcs', computed(() => {
      return seriesInfo.value.arcs
    }));

    provide('showArcs', showArcs);
    const legend = new Map<string, ArcsInfo>(Object.entries({
      'released': {
        'color': 'released',
        'name': 'Appears in Jump'
      },
      'hiatus': {
        'color': 'hiatus',
        'name': 'Hiatus'
      },
    }))


    const arcs = computed(() => {
      if (showArcs.value) {
        return seriesInfo.value.arcs;
      } else {
        return legend
      }
    })

    return {
      seriesInfo, issues, arcs, showArcs, loading
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