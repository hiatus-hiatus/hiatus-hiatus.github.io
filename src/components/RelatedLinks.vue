<template>
  <div class="section">
    <div class="section-title">Other charts</div>

    <div class="links">
      <router-link v-for="chart in charts" :to="{ name: chart.name }">
        {{ chart.description }}
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "RelatedLinks",

  setup() {
    const route = useRoute();
    const allCharts = [
      {
        name: "hxh",
        description: "HunterXHunter",
      },
      {
        name: "yuyu",
        description: "YuYuHakusho",
      },
    ];
    const charts = computed(() => {
      return allCharts.filter((chart) => chart.name != route.name);
    });

    return {
      charts,
    };
  },
});
</script>

<style scoped lang="scss">
.links {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;

  a {
    background-color: #3f51b5;
    color: white;
    margin-right: 8px;
    text-decoration: none;
    border: solid 1px;
    padding: 20px 0 !important;
    border-radius: 4px;
    width: 180px;
    text-align: center;

    &:hover {
      border-color: #303d81;
      background-color: #303d81;
      color: white;
    }
  }
}
</style>
