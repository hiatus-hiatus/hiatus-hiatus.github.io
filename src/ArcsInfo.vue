<template>
  <div class="arcs">
    <div v-for="[key, arc] in arcs" :key="key" class="arc-item">
      <div class="issue" :class="arc.color" />
      <div class="arc-description">{{ arc.name }}</div>
    </div>
  </div>
</template>
<script lang="ts">
import { PropType } from "vue";
import Issue from "./components/IssueBlock.vue";

export default {
  name: "arcs-info",
  components: { Issue },
  props: {
    arcs: Object as PropType<Map<string, ArcInfo>>,
  },
};
</script>

<style scoped lang="scss">
@import "style";

.arcs {
  margin-top: 32px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  max-width: 600px;
}

.arc-description {
  margin-left: 4px;
}

.arc-item {
  margin-top: 4px;
  display: flex;
  flex: auto;
  width: 100%;
  min-width: 200px;
  @include md {
    width: 50%;
  }
  align-items: center;
}
</style>