<template>
  <div class="section">
    <div class="section-title">Related links</div>

    <div class="links">
      <router-link v-for="route in routes" :to="{ name: route.name }">
        {{ route.meta.title }} Hiatus Chart
      </router-link>
      <a href="https://www.jajanken.net/en/" target="_blank">Janjanken.net</a>
      <a href="https://www.reddit.com/r/HiatusCharts" target="_blank">
        r/HiatusCharts
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
  name: "RelatedLinks",

  setup() {
    const route = useRoute();
    const router = useRouter();

    const routes = computed(() => {
      return router
        .getRoutes()
        .filter((r) => !!r.meta.dir)
        .filter((r) => r.name != route.name);
    });

    return {
      routes,
    };
  },
});
</script>

<style scoped lang="scss">
.links {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-items: flex-start;
  align-content: start;

  gap: 4px;
  width: 100%;

  a {
    margin-top: 8px;
    margin-right: 16px;
  }
}
</style>
