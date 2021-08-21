<template>
  <div style="text-align: left">
    <section>
      <h1>When was the last chapter released?</h1>
      Chapter {{ latestRelease.chapter }} was released on {{ formattedDate }}.
    </section>
    <section>
      <h1>How long has it been since the last chapter?</h1>
      {{ diff.totalDays }}
      <template v-if="diff.totalDays === 1000">days 🎉.</template>
      <template v-else>days.</template>
      Aproximately
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
import { defineComponent, PropType } from "vue";

import { DateTime } from "luxon";

export default defineComponent({
  name: "Faq",
  props: {
    items: {
      type: Object as PropType<FaqItem>,
      required: true,
    },
    latestRelease: {
      type: Object as PropType<IssueInfo>,
      required: true,
    },
  },
  computed: {
    latestIssueDate(): DateTime {
      return DateTime.fromISO(this.latestRelease.date!, {
        zone: "Asia/Tokyo",
      });
    },

    formattedDate() {
      return this.latestIssueDate.toLocaleString(DateTime.DATE_FULL, {
        locale: "en",
      });
    },
    diff() {
      const now = DateTime.now();
      let diff = now.diff(this.latestIssueDate, ["years", "months", "days"]);
      let total = now.diff(this.latestIssueDate, ["days"]);

      return {
        years: diff.years,
        months: diff.months,
        days: diff.days,
        totalDays: Math.floor(total.days),
      };
    },
  },
});
</script>

<style scoped></style>
