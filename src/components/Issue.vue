<template>
  <div
    class="issue-square"
    :class="{
      released: issue.released,
      hiatus: !issue.released
    }"
  >
  </div>
</template>

<script>
export default {
  name: "Issue",
  props: {
    issue: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped lang="scss">
.issue-square {
  width: 21px;
  height: 16px;
  background: #ff4444;
}
.released {
  background: #0099cc;
}
</style>
