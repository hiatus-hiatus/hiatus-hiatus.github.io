<template>
  <div
    class="issue"
    :class="{ released: issue.released && !showArcs, [color]: showArcs }"
    :title="title"
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

    const title = computed(() => {
      let text = "";
      if (props.issue.chapter) {
        text += `Chapter: ${props.issue.chapter}. `;
      }
      text += `Issue: ${props.issue.number}`;

      return text;
    });
    const color = computed(() => {
      if (showArcs.value) {
        const arc = arcs.value.get(props.issue.arc) || {};
        return arc.color || "gray-300";
      } else {
        return "gray-300";
      }
    });
    return {
      title,
      showArcs,
      arcs,
      color,
    };
  },
});
</script>

<style lang="scss">
@import "../style";
@import "../colors";

.loading .issue {
  background-color: $gray300;
  animation: loadingBg 400ms infinite linear alternate;
}

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
