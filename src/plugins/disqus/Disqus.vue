<template>
  <div class="section" id="disqus_thread" v-show="$disqus.ready"></div>
</template>

<script>
export default {
  name: "Disqus",
  inject: ["$disqus"],
  created() {},
  mounted() {
    this.$disqus.reset();
  },
};
</script>

<style scoped></style>
