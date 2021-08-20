<template>
  <div style="text-align: left">
    <section>
      <h1>When was the last chapter released?</h1>
      Last chapter was released on
      {{ formattedDate }}.
    </section>
    <section>
      <h1>How long has it been since the last chapter?</h1>
      {{ diff.totalDays }} days
      <template v-if="diff.totalDays === 1000">🎉</template>
      . Aproximately
      <template v-if="diff.years > 0">
        {{ diff.years }}
        <template v-if="diff.years > 1">years</template>
        <template v-else>year</template>
      </template>

      <template v-if="diff.months > 0">
        <template v-if="diff.years"> and</template>
        {{ diff.months }}
        <template v-if="diff.months > 1"> months.</template>
        <template v-else> month.</template>
      </template>
    </section>
    <section v-for="item in items">
      <h1>
        {{ item.question }}
      </h1>
      <p>{{ item.answer }}</p>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, Prop, PropType } from "vue";

export default defineComponent({
  name: "Faq",
  props: {
    items: {
      type: Object as PropType<FaqItem>,
      required: true,
    },
    latestRelease: {
      type: Object as Prop<IssueInfo>,
    },
  },
  computed: {
    latestIssueDate() {
      const year = parseInt(this.latestRelease.date.slice(0, 4));
      const month = parseInt(this.latestRelease.date.slice(5, 7)) - 1;
      const day = parseInt(this.latestRelease.date.slice(8, 10));

      return new Date(year, month, day);
    },

    formattedDate() {
      return this.latestIssueDate.toLocaleString("en", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
    },
    diff() {
      // todo: rounding errors
      const start = new Date(new Date().toDateString());
      const diff = start.valueOf() - this.latestIssueDate.valueOf();
      let totalDays = diff / 1000 / 60 / 60 / 24;

      let years = Math.floor(totalDays / 365.25);
      let months = Math.floor((totalDays % 365.25) / 30.42);

      return { totalDays, years, months };
    },
  },
});
</script>

<style scoped></style>
