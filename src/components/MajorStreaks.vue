<template>
  <div class="section">
    <div class="section-title clickable" @click="showFilters = !showFilters">
      Streaks
      <span class="material-icons">
        <template v-if="showFilters">expand_less</template>
        <template v-else>expand_more</template>
      </span>
    </div>
    <div class="filters" v-if="showFilters">
      <div class="filter-threshold">
        <label> Threshold: </label>
        <input type="number" v-model="threshold" min="1" />
        <input type="range" v-model="threshold" min="1" :max="longestStreak" />
      </div>
      <div class="filter-include-releases">
        <label>
          <input type="checkbox" v-model="showBreaks" />
          <div
            class="issue hiatus"
            style="display: inline-block; margin-bottom: 0"
          />
          Hiatus streaks
        </label>
        <label>
          <input type="checkbox" v-model="showReleases" />
          <div
            class="issue released"
            style="display: inline-block; margin-bottom: 0"
          />
          Release streaks
        </label>
      </div>
    </div>
    <table>
      <thead>
        <tr>
          <th>Start</th>
          <th>End</th>
          <th>Chapters</th>
          <th>Streak (total issues)</th>
        </tr>
      </thead>
      <tr v-for="streak in filteredStreaks">
        <td>{{ streak.start.year }}/{{ streak.start.number }}</td>
        <td>{{ streak.end.year }}/{{ streak.end.number }}</td>
        <td>
          <template v-if="streak.released">
            <template v-if="streak.start.chapter !== -1">
              {{ streak.start.chapter }}
              <template v-if="streak.start.chapter !== streak.end.chapter">
                - {{ streak.end.chapter }}
              </template>
            </template>
            <template v-else>Special</template>
          </template>
        </td>
        <td class="streak-col">
          <div
            :style="{ width: `${(streak.count / longestStreak) * 100}%` }"
            class="streak"
            :class="{ hiatus: !streak.released, released: streak.released }"
          >
            {{ streak.count }}
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, PropType, computed } from "vue";
import useStreaks from "./streaks";

export default defineComponent({
  name: "MajorStreaks",
  props: {
    issues: {
      type: Object as PropType<IssueInfo[]>,
      required: true,
    },
    threshold: {
      type: Number as PropType<number>,
      required: true,
    },
  },
  setup: (props) => {
    const showBreaks = ref(true);
    const showReleases = ref(true);

    const { streaks } = useStreaks(props.issues);

    const longestStreak = computed(() => {
      return Math.max(...streaks.value.map((streak) => streak.count));
    });

    const threshold = ref(props.threshold);
    const includeReleases = ref(false);
    const filteredStreaks = computed(() => {
      return streaks.value
        .filter((streak) => streak.count >= threshold.value)
        .filter(
          (streak) =>
            (streak.released && showReleases.value) ||
            (!streak.released && showBreaks.value)
        );
    });

    const showFilters = ref(false);
    return {
      showBreaks,
      showReleases,
      showFilters,
      threshold,
      longestStreak,
      includeReleases,
      filteredStreaks,
    };
  },
});
</script>

<style scoped lang="scss">
table {
  width: 100%;
  border-collapse: collapse;

  thead {
    tr {
      border-bottom: 2px solid #ddd;
    }

    th {
      padding-bottom: 12px;
    }
  }

  td {
    padding: 4px;
    border-bottom: 1px solid #ddd;
  }
}

.streak {
  padding-top: 2px;
  padding-bottom: 2px;
  color: white;
  font-weight: bold;
  text-align: right;
  padding-right: 8px;
  min-width: 20px !important;
  border-radius: 4px;
}

.streak-col {
  width: 50%;
}

.filter-threshold {
  display: flex;

  justify-content: start;
  text-align: left;
  flex-direction: column;
  max-width: 300px;

  label {
    font-weight: bold;
  }

  input {
    border-radius: 4px;
    padding: 8px;
    border: solid 1px #eeeeee;

    &:focus {
      border: solid 1px #aaa;
      outline: none;
    }
  }
}

.filters {
  outline: solid 1px #ddd;
  border-radius: 50px;
  display: flex;
  margin-left: auto;
  margin-right: auto;
  flex-direction: column;
  max-width: 300px;
  justify-content: center;
  align-items: center;
  padding: 16px;
  margin-bottom: 32px;
}

.filter-include-releases {
  display: flex;
  flex-direction: column;
  align-items: start;
}
</style>
