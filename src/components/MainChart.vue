<template>
  <div class="chart-row" v-for="([year, issues]) in issuesByYear">
    <div class="year">
      {{ year }}
    </div>
    <div class="issues-list">
      <issue v-for="issue in issues" :issue="issue"/>
    </div>
  </div>
</template>
<script lang="ts">
import Issue from "./IssueBlock.vue"
import {PropType} from "vue";

export default {
  name: 'MainChart',
  components: {Issue},
  props: {
    issuesByYear: {
      type: Object as PropType<Map<number, IssueInfo[]>>
    }
  }
}
</script>


<style lang="scss">

@import "../style";

.year {
  padding: 0;
  display: flex;
  margin-right: 8px;
  font-size: 12px;
  width: 25px;

  @include lgDown {
    font-size: 1.5em;
    width: auto;
    margin-top: 4px;
  }
}

.issues-list {
  display: flex;
  flex-wrap: wrap;
}

.chart-row {
  display: flex;
  @include lgDown {
    margin-top: 16px;
  }
  @include smDown {
    flex-direction: column;
    .year {
      text-align: center;
      margin-left: auto;
      margin-right: auto;
    }
  }

  &:hover {
    .issue {
      filter: brightness(80%);
    }
  }
}
</style>
