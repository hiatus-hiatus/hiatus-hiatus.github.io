<template>
  <div>
    <div class="chart-row" v-for="year in issues_by_year">
      <div class="year">
        {{ year.year }}
      </div>
      <issue v-for="issue in year.issues" :issue="issue" class="issue" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import axios from "axios";
import Issue from "@/components/Issue";

export default {
  name: "home",
  components: { Issue },

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
        const response = await axios.get("/HunterXHunter/info.json");
        const data = response.data;
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
};
</script>
<style lang="scss" scoped>
.year {
  padding: 0;
  display: flex;
  vertical-align: top;
  margin-right: 4px;
  font-size: 12px;
  width: 25px;
}
.chart-row {
  display: flex;
  margin-bottom: 2px;
  .issue {
    margin-left: 1px;
    margin-right: 1px;
  }
}
</style>
