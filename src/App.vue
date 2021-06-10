<template>
  <div class="card">
    <div class="card-title">
      HUNTER×HUNTER Hiatus Chart
    </div>
    <div class="chart-row" v-for="year in issues_by_year">
      <div class="year">
        {{ year.year }}
      </div>
      <div class="issues-list">
        <issue v-for="issue in year.issues" :issue="issue" class="issue" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HelloWorld from './components/HelloWorld.vue'

export default defineComponent({
  name: 'App',
  components: {
    HelloWorld
  },

  data() {
    return {
      loading: false,
      series_name: "",
      ongoing: false,
      major_hiatus_threshold: 0,
      arcs: [],
      issues: []
    };
  },
  created() {
    this.load();
  },
  methods: {
    async load() {
      this.loading = true;
      try {

        const response = await fetch("/HunterXHunter/info.json");
        const data = await response.json();

        this.series_name = data.series_name;
        this.issues = data.issues.reverse();
      } finally {
        this.loading = false;
      }
    }
  },
  computed: {
    issues_by_year() {
      const grouped_by_year = {};

      for (const issue of this.issues) {
        if (!grouped_by_year[issue.year]) {
          grouped_by_year[issue.year] = [];
        }
        grouped_by_year[issue.year].push(issue);
      }

      const data = [];
      for (const year of Object.keys(grouped_by_year).reverse()) {
        data.push({ year, issues: grouped_by_year[year] });
      }
      console.log(data);
      return data;
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