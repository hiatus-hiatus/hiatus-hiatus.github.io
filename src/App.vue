<template>
  <div class="section">
    <div class="section-title">
      HUNTER×HUNTER Hiatus Chart
    </div>
    <yearly-issues :issues-by-year="issuesByYear"/>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import HelloWorld from './components/HelloWorld.vue'
import Issue from "./components/IssueBlock.vue";
import YearlyIssues from "./components/YearlyIssues.vue";


export default defineComponent({
  name: 'App',
  components: {
    YearlyIssues,
    Issue,
    HelloWorld
  },

  data() {


    return {
      loading: false,
      series_name: "",
      ongoing: false,
      major_hiatus_threshold: 0,
      arcs: [],
      issues: new Array<IssueItem>()
    };
  },
  async created() {
    try {
      this.loading = true;
      await Promise.all([this.loadInfo(), this.loadIssues()]);
    } finally {
      this.loading = false;
    }
  },
  methods: {
    async loadInfo() {
      const response = await fetch("/HunterXHunter/info.json");
      const data = await response.json();
      this.series_name = data.series_name;
    },
    async loadIssues() {
      const response = await fetch("/HunterXHunter/issues.json");
      this.issues = await response.json()
    }
  },
  computed: {
    issuesByYear(): Map<number, IssueItem[]> {
      let group: Map<number, IssueItem[]> = new Map();

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