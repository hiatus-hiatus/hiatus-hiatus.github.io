<template>
  <div
    class="issue-square"
    :class="{
      released: issue.released,
      hiatus: !issue.released
    }"
  />
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
  width: 38px;
  height: 30px;
  background: #ff4444;
  margin-right: 1px;
  margin-left: 1px;
  margin-bottom: 2px;

  @media (min-width: 1280px) {
    width: 22px;
    height: 17px;
  }
  @media (min-width: 1440px) {
    width: 23px;
    height: 17px;
  }
}
.released {
  background: #0099cc;
}
</style>
