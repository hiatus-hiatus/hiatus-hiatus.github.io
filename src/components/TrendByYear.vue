<template>
  <div class="section">
    <div class="section-title">Trend</div>
    <div>
      <canvas ref="canvas" height="256"></canvas>
    </div>
  </div>
</template>
<script lang="ts">
import Issue from "./IssueBlock.vue";
import { defineComponent, onMounted, PropType, ref } from "vue";
import { Chart } from "chart.js";

export default defineComponent({
  name: "TrendByYear",
  components: { Issue },
  props: {
    issuesByYear: {
      type: Object as PropType<Map<number, IssueInfo[]>>,
      required: true,
    },
  },
  setup(props) {
    const canvas = ref<HTMLCanvasElement | null>(null);
    const chart = ref<Chart | null>(null);
    const labels = Array.from(props.issuesByYear.keys()).reverse();

    const breaks = Array.from(props.issuesByYear.values())
      .map((list) => list.filter((issue) => !issue.released).length * -1) // invert y axis
      .reverse();

    const releases = Array.from(props.issuesByYear.values())
      .map((list) => list.filter((issue) => issue.released).length)
      .reverse();

    onMounted(() => {
      const ctx = canvas.value!.getContext("2d")!;
      chart.value = new Chart(ctx, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Releases",
              data: releases,
              backgroundColor: "rgba(51,181,229, 0.9)",
            },
            {
              label: "Breaks",
              data: breaks,
              backgroundColor: "rgba(255,68,68, 0.9)",
            },
          ],
        },
        options: {
          maintainAspectRatio: false,
          plugins: {
            tooltip: {
              callbacks: {
                label(context) {
                  return Math.abs(context.raw);
                },
              },
            },
          },
          scales: {
            y: {
              stacked: true,
              ticks: {
                callback(value) {
                  return Math.abs(value);
                },
              },
            },
            x: {
              stacked: true,
            },
          },
        },
      });
    });

    return {
      canvas,
      chart,
    };
  },
});
</script>
