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

<style lang="scss">
@import "../style";

$releaseColor: #33B5E5;
$hiatusColor: #ff4444;

.issue-square {
  width: 38px;
  height: 30px;
  background: $hiatusColor;
  margin-right: 1px;
  margin-left: 1px;
  margin-bottom: 2px;

  @include lg{
    width: 31px;
    height: 25px;
  }
  @include xl {
    width: 22px;
    height: 17px;
  }

  &.released {
    background: $releaseColor;
  }
}


.chart-row:hover .issue-square {
  background-color: #CC0000;

  &.released {
    background-color: #0099CC;
  }

}
</style>
