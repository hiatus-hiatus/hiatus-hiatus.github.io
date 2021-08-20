<template>
  <div class="section">
    <a href="#/HunterXHunter">HunterXHunter </a>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";

export default defineComponent({
  name: "RelatedLinks",

  setup() {
    const route = useRoute();
    const allCharts = [
      {
        name: "hxh",
        description: "HunterXHunter",
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

<style scoped></style>
