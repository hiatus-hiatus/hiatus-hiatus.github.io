<template>
  <div
    class="issue"
    :class="{ released: issue.released && !showArcs, [color]: showArcs }"
  />
</template>

<script lang="ts">
import { computed, defineComponent, inject, PropType, Ref } from "vue";

export default defineComponent({
  name: "Issue",
  props: {
    issue: {
      type: Object as PropType<IssueInfo>,
      required: true,
    },
  },
  setup(props) {
    const arcs = inject("arcs", new Map<string, ArcInfo>());
    const showArcs: Ref<Boolean> = inject("showArcs", false);

    const color = computed(() => {
      if (showArcs.value) {
        const arc = arcs.value.get(props.issue.arc) || {};
        return arc.color || "gray-300";
      } else {
        return "gray-300";
      }
    });
    return {
      showArcs,
      arcs,
      color,
    };
  },
});
</script>

<style lang="scss">
@import "../style";

.issue {
  width: $issueWidthMd + 4px;
  height: 16px;
  background: $hiatusColor;
  margin-right: 1px;
  margin-left: 1px;
  margin-bottom: 2px;

  @include md {
    width: $issueWidthMd;
    height: 13px;
  }
  @include lg {
    width: $issueWidthLg;
    height: 17px;
  }

  &.released {
    background: $releaseColor;
  }
}
</style>
