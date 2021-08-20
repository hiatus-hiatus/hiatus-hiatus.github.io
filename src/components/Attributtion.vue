<template>
  <footer>
    <p>
      created by
      <a target="_blank" href="https://www.reddit.com/user/rentzhx3/">
        /u/rentzhx3
      </a>
    </p>

    <p>
      inspired by
      <a
        target="_blank"
        href="https://hunterxhunter.fandom.com/wiki/User_blog:MrGenial11/Hunter_x_Hunter_Hiatus_Chart"
      >
        MrGenial11's
      </a>
      hiatus chart
    </p>
    <p v-if="authors">
      {{ seriesInfo.name }} data submited by
      <template v-for="(author, i) in authors">
        <template v-if="authors.length > 1 && i > 0">
          <template v-if="i === authors.length - 1 || authors.length === 2">
            and
          </template>
          <template v-else> ,&nbsp;</template>
        </template>

        <a :href="author.link" target="_blank">
          {{ author.name }}
        </a>
      </template>
    </p>

    <template v-if="sources">
      <p>With partial or complete data from:</p>
      <template v-for="(source, i) in sources">
        <template v-if="sources.length > 1 && i > 0">
          <template v-if="i === source.length - 1 || sources.length === 2">
            and
          </template>
          <template v-else> ,&nbsp;</template>
        </template>

        <a :href="source.link" target="_blank">
          {{ source.name }}
        </a>
      </template>
    </template>
    <p>
      <a
        target="_blank"
        href="https://github.com/hiatus-hiatus/hiatus-hiatus.github.io/"
      >
        source code
      </a>
    </p>
  </footer>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import SeriesInfo from "../SeriesInfo.vue";

export default defineComponent({
  name: "Attribution",
  props: {
    seriesInfo: {
      type: Object as PropType<SeriesInfo>,
    },
  },
  computed: {
    authors() {
      return this.seriesInfo.attribution.authors;
    },
    sources() {
      return this.seriesInfo.attribution.sources;
    },
  },
});
</script>

<style scoped lang="scss">
footer {
  text-align: center;
  text-transform: lowercase;

  a {
    text-transform: initial;
  }
}
</style>
