<template>
  <div class="section">
    <div class="section-title">Other charts</div>

    <div class="links">
      <router-link v-for="route in routes" :to="{ name: route.name }">
        {{ route.meta.title }}
      </router-link>
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
  flex-wrap: wrap;
  gap: 4px;

  a {
    background-color: #3f51b5;
    color: white;
    margin-right: 8px;
    text-decoration: none;
    border: solid 1px;
    padding: 20px 0 !important;
    border-radius: 4px;
    width: 180px;
    text-align: center;

    &:hover {
      border-color: #303d81;
      background-color: #303d81;
      color: white;
    }
  }
}
</style>
